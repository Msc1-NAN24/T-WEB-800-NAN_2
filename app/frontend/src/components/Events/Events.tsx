'use client';

import Image from "next/image";
import useSWR from 'swr'
import {EventsService} from "@/services/EventsService";
import EventCard from "@/components/Events/EventCard/EventCard";
import {LocalEvent} from "@/services/EventsService.type";

type EventsProps = {
  city: string;
  onClickEvent: (event: LocalEvent) => void;
}

export default function Events({city, onClickEvent}: EventsProps) {

  const {error, isLoading, data} = useSWR(`/events`, () => EventsService.getByCity(city));

  if (error) {
    return <p>An error Occurred !</p>
  }

  if (isLoading) {
    return <p>Loading events...</p>
  }

  console.log(data);

  return(
    <div className={"px-24 py-8"}>
      <div className={"flex flex-row gap-2 items-end justify-items-end"}>
        <p className={"text-3xl"}>Événement proche</p>
        <Image src={'./icons/filter.svg'} width={32} height={32} alt={"filter"}/>
      </div>
      <p className={"cursor-pointer"}>{city}</p>
      <div className={"flex flex-col gap-6 grid grid-cols-2"}>
        {data?.ok?.body.map((event, index) => {
          return (
            <EventCard event={event} key={event.organizer_id + index} onClick={() => onClickEvent(event)}/>
          )
        })}
      </div>
    </div>
  )
}