'use client';

import {useJsApiLoader} from "@react-google-maps/api";
import Map from "@/components/Map/Map";

export default function MapLayout() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
    libraries: ['places']
  })

  if (isLoaded) {
    return <Map/>
  } else {
    return <></>
  }

}