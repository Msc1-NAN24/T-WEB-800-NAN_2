'use client';

import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import SearchBar from "@/components/Map/SearchBar/SearchBar";
import ActivityCard, {IActivity} from "@/components/Map/ActivityCard/ActivityCard";

import './style.css';
import MapStyle from "@/styles/map.style";
import FilterBar from "@/components/Map/FilterBar/FilterBar";
import { motion } from "framer-motion";
import {useForm} from "react-hook-form";

const activity = {
  picture: 'https://fffuel.co/images/dddepth-preview/dddepth-307.jpg', title: 'Hôtel le Petit Duquesne', note: 3.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis rutrum tortor, et placerat felis cursus nec. Nam aliquam metus sit amet erat condimentum, a ultricies quam feugiat. Aliquam porta ac nulla sit amet ullamcorper. Duis convallis sed erat nec tincidunt. Sed tellus metus, consectetur vitae accumsan eget, fermentum convallis arcu. Vestibulum ante ipsum primis'
}

export type Form = {
  activity: {
    value: undefined | IActivity,
    show: boolean;
  }
}

const center = [47.2145, -1.5512];

export default function Map() {

  const map = useRef<GoogleMap | null>(null);
  const {watch, setValue} = useForm<Form>({defaultValues: {activity: {value: undefined, show: false}}})
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
    libraries: ['places']
  })

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
        <Marker onClick={() => {
          setValue('activity.show', true);
          setValue('activity.value', activity);
        }} position={{lat: 47.214500, lng: -1.551200}} icon={{url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', scale: 0.01}}/>
        <motion.div transition={{ duration: 3, times: [0, 2, 3] }} animate={{display: watch('activity.show') ? '' : 'none'}} className={"z-0 h-full w-full bg-black absolute opacity-20"}/>
        <FilterBar show={!watch('activity.show')} onDatesChanged={onDatesChanged} dates={dates}/>
        <div className={"flex flex-row h-full"}>
          <SearchBar bounds={[0, 0]} onClickUpdateLocation={(pos) => {
            if (map.current?.state.map !== undefined && map.current?.state.map !== null) {
              map.current?.state.map.setCenter({lat: pos[0], lng: pos[1]});
            }
          }}/>
          <ActivityCard show={watch('activity.show')} onClose={() => setValue('activity.show', false)} activity={watch('activity.value')} onPlan={() => null}/>
        </div>
      </GoogleMap>
    </div>
  ) : <></>

}