'use client';

import {useJsApiLoader} from "@react-google-maps/api";
import Map from "@/components/Map/Map";
import {LocalEvent} from "@/services/EventsService.type";

export type Props = {
  activities: any[];
  onPlanActivities: (activities: any) => void;
  onLocationChange: (cityName: string) => void;
  event?: LocalEvent;
}

export default function MapLayout({onPlanActivities, activities, onLocationChange, event}: Props) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_TOKEN ?? '',
    libraries: ['places']
  })

  if (isLoaded) {
    return <Map event={event} onLocationChanged={onLocationChange} activities={activities} onPlanActivities={onPlanActivities} />
  } else {
    return <></>
  }

}