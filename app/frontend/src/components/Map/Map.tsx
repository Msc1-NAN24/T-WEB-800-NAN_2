'use client';

import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SearchBar from "@/components/Map/SearchBar/SearchBar";
import ActivityCard from "@/components/Map/ActivityCard/ActivityCard";

export type MapProps = {

}

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function Map(props: MapProps) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
  })

  const [_, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{borderRadius: 50, width: '100%', height: 800}}
      options={{disableDefaultUI: true}}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >

      <div className={"flex flex-row w-full"}>
        <SearchBar/>
        <ActivityCard activity={{picture: '', title: '', note: 4.2, description: ''}}/>
      </div>


      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>

}