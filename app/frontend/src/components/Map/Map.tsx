'use client';

import React, {useCallback, useMemo, useRef, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader, MarkerClusterer} from '@react-google-maps/api';
import SearchBar from "@/components/Map/SearchBar/SearchBar";
import ActivityCard, {IActivity} from "@/components/Map/ActivityCard/ActivityCard";

import './style.css';
import MapStyle from "@/styles/map.style";
import FilterBar, {MapLocation} from "@/components/Map/FilterBar/FilterBar";
import { motion } from "framer-motion";
import {set, useForm} from "react-hook-form";
import {PlacesService} from "@/services/PlacesService";

const activity = {
  picture: 'https://fffuel.co/images/dddepth-preview/dddepth-307.jpg', title: 'Hôtel le Petit Duquesne', note: 3.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis rutrum tortor, et placerat felis cursus nec. Nam aliquam metus sit amet erat condimentum, a ultricies quam feugiat. Aliquam porta ac nulla sit amet ullamcorper. Duis convallis sed erat nec tincidunt. Sed tellus metus, consectetur vitae accumsan eget, fermentum convallis arcu. Vestibulum ante ipsum primis'
}

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

export default function Map() {

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
        PlacesService.getPhoto({
          photo_reference: res?.ok?.body.photos[0].photo_reference ?? '',
        }).then(async (photo) => {
          if (res.ok) {
            setValue('activity.value', {
              picture: photo,
              title: res.ok.body.name,
              note: res.ok.body.rating,
              description: res.ok.body.business_status
            })
          }
        }).catch(() => {
          console.log('photo error !');
        });
      } else {
        setValue('activity.value', {
          picture: 'photo',
          title: res?.ok?.body.name ?? '',
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
        <FilterBar onPlacesChanged={onPlacesChanged} location={watch('location')} show={!watch('activity.show')} onDatesChanged={onDatesChanged} dates={dates}/>
        <div className={"flex flex-row h-full"}>
          <SearchBar bounds={[0, 0]} onClickUpdateLocation={(pos) => {
            if (map.current?.state.map !== undefined && map.current?.state.map !== null) {
              map.current?.state.map.setCenter({lat: pos[0], lng: pos[1]});
            }
          }}/>
          <ActivityCard loading={watch('activity.value') === undefined && watch('activity.show')} show={watch('activity.show')} onClose={() => setValue('activity.show', false)} activity={watch('activity.value')} onPlan={() => null}/>
        </div>
      </GoogleMap>
    </div>)
}