'use client';

import {DirectionsRenderer, DirectionsService, GoogleMap} from "@react-google-maps/api";
import MapStyle from "@/styles/map.style";
import React, {useMemo,useState} from "react";

type Props = {
  type: google.maps.TravelMode,
  origin: string;
  originId: string;
  destination: string;
  destinationId: string;
  onChange: (result: google.maps.DirectionsResult) => void
}

export default function ActivityStepMap(props: Props) {

  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  const service = useMemo(() => {
    return (
      <DirectionsService
        options={{
          destination: {
            placeId: props.destinationId,
          },
          origin: {
            placeId: props.originId,
          },
          travelMode: props.type,
          language: 'fr',
        }}
        callback={(result) => {
          if (result) {
            props.onChange(result);
            setResponse(result);
          }
        }}
      />
    )
  }, [props.destination, props.type, props.origin])

  const direction = useMemo(() => {
    if (response === null)
      return null;
    return (
      <DirectionsRenderer
        options={{
          directions: response
        }}
      />
    )
  }, [response]);

  return (
    <GoogleMap
      zoom={18}
      center={{lat: 47.2145,lng: -1.5512}}
      mapContainerStyle={{width: '100%', height: '100%', borderBottomRightRadius: 26}}
      options={{disableDefaultUI: true, styles: MapStyle}}
    >
      {service}
      {direction}
    </GoogleMap>
  )
}