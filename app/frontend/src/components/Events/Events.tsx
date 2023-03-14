'use client';

import Image from "next/image";
import useSWR from 'swr'
import {EventsService} from "@/services/EventsService";

type EventsProps = {
  city: string;
}

export default function Events({city}: EventsProps) {

  const {data, error, isLoading} = useSWR(`/events/${city}/`, () => EventsService.getByCity(city));

  if (error) {
    return <p>An error Occurred !</p>
  }

  if (isLoading) {
    return <p>'Loading ...'</p>
  }

  console.log(data?.error?.status);

  return(
    <div className={"px-24 py-8"}>
      <div className={"flex flex-row gap-2 items-end justify-items-end"}>
        <p className={"text-3xl"}>Événement proche</p>
        <Image src={'./icons/filter.svg'} width={32} height={32} alt={"filter"}/>
      </div>
      <p className={"cursor-pointer"}>{city}</p>
    </div>
  )
}