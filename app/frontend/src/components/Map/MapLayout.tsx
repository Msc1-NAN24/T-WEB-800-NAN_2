'use client';

import {useJsApiLoader} from "@react-google-maps/api";
import Map from "@/components/Map/Map";

export type Props = {
  activities: any[];
  onPlanActivities: (activities: any) => void;
}

export default function MapLayout({onPlanActivities, activities}: Props) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
    libraries: ['places']
  })

  if (isLoaded) {
    return <Map activities={activities} onPlanActivities={onPlanActivities}/>
  } else {
    return <></>
  }

}