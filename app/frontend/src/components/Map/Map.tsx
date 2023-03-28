'use client';

import React, {useCallback, useContext, useRef, useState} from "react";
import {GoogleMap, Marker, MarkerClusterer} from '@react-google-maps/api';
import SearchBar from "@/components/Map/SearchBar/SearchBar";
import ActivityCard, {IActivity} from "@/components/Map/ActivityCard/ActivityCard";

import './style.css';
import MapStyle from "@/styles/map.style";
import FilterBar, {MapLocation} from "@/components/Map/FilterBar/FilterBar";
import { motion } from "framer-motion";
import {useForm} from "react-hook-form";
import {PlacesService} from "@/services/PlacesService";
import {ToastContext} from "@/contexts/ToastContext";

export type Form = {
  location: {
    lat: number;
    lng: number;
    radius: number;
  }
  activity: {
    value: undefined | IActivity,
    show: boolean;
  }
}

const center = [47.2145, -1.5512];

type Props = {
  activities: any[];
  onPlanActivities: (activity: any) => void;
}

export default function Map(props: Props) {

  const {showToast} = useContext(ToastContext);
  const map = useRef<GoogleMap | null>(null);
  const {watch, setValue} = useForm<Form>({defaultValues: {location: {
        lat: center[0],
        lng: center[1],
        radius: 10000 / 18
      }, activity: {value: undefined, show: false}}})
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);
  const [places, setPlaces] = useState<MapLocation[]>([]);



  const onLoadMap = useCallback((map: google.maps.Map) => {
    map.setCenter({lat: center[0], lng: center[1]})
  }, []);

  const onDatesChanged = useCallback((d: Date[]) => {
    setDates(d);
  }, []);

  const onPlacesChanged = useCallback((places: MapLocation[]) => {
    setPlaces(places);
  }, []);

  const markers = useCallback((cluster: any) => {
    return places.map((p) =>
      (<Marker clusterer={cluster} key={p.place_id} onClick={() => onClickPlace(p)} position={{lat: p.location.lat, lng: p.location.lng}} icon={{url: p.icon, scaledSize: new google.maps.Size(24, 24)}}/>)
    )
  }, [places]);

  const onClickPlace = useCallback((place: MapLocation) => {
    setValue('activity.value', undefined);
    setValue('activity.show', true);
    PlacesService.detail({place_id: place.place_id}).then((res) => {
      if (res?.ok?.body?.photos?.length !== undefined && res.ok.body.photos.length > 0) {
        setValue('activity.value', {
          place_id: res.ok.body.place_id,
          picture: res.ok.body.photos.map((a) => a.photo_reference),
          title: res.ok.body.name,
          opening_hours: res.ok.body.opening_hours,
          note: res.ok.body.rating,
          description: res.ok.body.business_status
        })
      } else {
        setValue('activity.value', {
          picture: [],
          place_id: res?.ok?.body.place_id ?? '',
          title: res?.ok?.body.name ?? '',
          opening_hours: res?.ok?.body.opening_hours,
          note: res?.ok?.body.rating ?? -1,
          description: res?.ok?.body.business_status ?? ''
        })
      }

    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return  (
    <div className={"mx-4 xl:mx-20 rounded-3xl shadow-2xl"} style={{height: 750}}>
      <GoogleMap
        ref={map}
        mapContainerStyle={{width: '100%', height: '100%', borderRadius: 26}}
        options={{disableDefaultUI: true, styles: MapStyle, maxZoom: 20, minZoom: 8}}
        onLoad={onLoadMap}
        onCenterChanged={() => {
          const m = map.current?.state.map;
          if (m?.getCenter() !== undefined) {
            const center = m.getCenter();
            const zoom = m.getZoom();
            if (center && zoom) {
              setValue('location', {lat: center.lat(), lng: center.lng(), radius: 10000 / zoom})
            }
          }
        }}
        zoom={18}>
        <MarkerClusterer options={{}}>
          {(markerCluster) => <>{markers(markerCluster)}</>}
        </MarkerClusterer>
        <motion.div transition={{ duration: 3, times: [0, 2, 3] }} animate={{display: watch('activity.show') ? '' : 'none'}} className={"z-0 h-full w-full bg-black absolute opacity-20"}/>
        <FilterBar hint={props.activities.length > 0} onPlacesChanged={onPlacesChanged} location={watch('location')} show={!watch('activity.show')} onDatesChanged={onDatesChanged} dates={dates}/>
        <div className={"flex flex-row h-full"}>
          <SearchBar bounds={[0, 0]} onClickUpdateLocation={(pos) => {
            if (map.current?.state.map !== undefined && map.current?.state.map !== null) {
              map.current?.state.map.setCenter({lat: pos[0], lng: pos[1]});
            }
          }}/>
          <ActivityCard loading={watch('activity.value') === undefined && watch('activity.show')} show={watch('activity.show')} onClose={() => setValue('activity.show', false)} activity={watch('activity.value')} onPlan={(a) => {
            props.onPlanActivities(a);
            setValue('activity.show', false);
/*            showToast({
              title: 'Hello World',
              content: 'abc'
            })*/
          }
          }/>
        </div>
      </GoogleMap>
    </div>)
}