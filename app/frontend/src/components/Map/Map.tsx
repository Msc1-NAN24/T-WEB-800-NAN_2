'use client';

import React, {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import SearchBar from "@/components/Map/SearchBar/SearchBar";
import ActivityCard from "@/components/Map/ActivityCard/ActivityCard";

import './style.css';
import useLocation from "@/hooks/useLocation";
import MapStyle from "@/styles/map.style";
import FilterBar from "@/components/Map/FilterBar/FilterBar";

export type MapProps = {

}

const center = [47.2145, -1.5512];

export default function Map(props: MapProps) {

  const map = useRef<GoogleMap | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<undefined | any>(true);
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);

  useEffect(() => {
    ask();
    console.log('abc');
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
    libraries: ['places']
  })

  const onPositionUpdated = useCallback((position: GeolocationPosition) => {
    if (map.current?.state.map !== undefined && map.current?.state.map !== null) {
      map.current?.state.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    }
    }, []);

  const onPositionError = useCallback((positionError: GeolocationPositionError) => {
      console.log(positionError);
    }, []);

  const {ask} = useLocation({errorCallback: onPositionError, successCallback: onPositionUpdated, position: {enableHighAccuracy: true}});

  const onLoadMap = useCallback((map: google.maps.Map) => {
    map.setCenter({lat: center[0], lng: center[1]})
  }, []);

  const onDatesChanged = useCallback((d: Date[]) => {
    setDates(d);
  }, []);

  return isLoaded ? (
    <div className={"mx-4 xl:mx-20 rounded-3xl shadow-2xl"} style={{height: 750}}>
      <GoogleMap
        ref={map}
        mapContainerStyle={{width: '100%', height: '100%', borderRadius: 26}}
        options={{disableDefaultUI: true, styles: MapStyle, maxZoom: 18, minZoom: 8}}
        onLoad={onLoadMap}
        zoom={18}>
        <Marker onClick={() => setSelectedActivity(true)} position={{lat: 47.214500, lng: -1.551200}} icon={{url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', scale: 0.01}}/>
        {selectedActivity ? <div className={`z-0 h-full w-full bg-black absolute opacity-30`}/> : null}
        {selectedActivity ? null : <FilterBar onDatesChanged={onDatesChanged} dates={dates}/>}
        <div className={"flex flex-row h-full"}>
          <SearchBar bounds={[0, 0]} onClickUpdateLocation={(pos) => {
            if (map.current?.state.map !== undefined && map.current?.state.map !== null) {
              map.current?.state.map.setCenter({lat: pos[0], lng: pos[1]});
            }
          }
          }/>
          {selectedActivity ? <ActivityCard onClose={() => setSelectedActivity(undefined)} activity={{picture: 'https://fffuel.co/images/dddepth-preview/dddepth-307.jpg', title: 'Hôtel le Petit Duquesne', note: 3.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis rutrum tortor, et placerat felis cursus nec. Nam aliquam metus sit amet erat condimentum, a ultricies quam feugiat. Aliquam porta ac nulla sit amet ullamcorper. Duis convallis sed erat nec tincidunt. Sed tellus metus, consectetur vitae accumsan eget, fermentum convallis arcu. Vestibulum ante ipsum primis'}} onPlan={() => null}/> : null}
        </div>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
  ) : <></>

}