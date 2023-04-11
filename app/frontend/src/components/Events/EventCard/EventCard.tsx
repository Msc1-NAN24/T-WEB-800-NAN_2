import {LocalEvent} from "@/services/EventsService.type";
import Image from "next/image";

export type Props = {
  event: LocalEvent;
  onClick: () => void;
}

export default function EventCard({event, onClick}: Props) {
  return (
    <div className={"flex flex-row rounded-2xl cursor-pointer"} onClick={onClick} style={{backgroundColor: '#EDEDED'}}>
      <div className={"w-2/6 relative"}>
        <Image className={"rounded-l-2xl"} src={event.thumb_url} alt={event.name} fill objectFit={'cover'}/>
      </div>
      <div className={"w-4/6 mx-8 my-8 flex flex-col gap-2"}>
        <p className={"text-2xl font-bold"}>{event.name}</p>
        <p className={"text-lg"}>{event.organizer_url}</p>
        <p className={"text-lg"}>{event.about}</p>
      </div>
    </div>
  )
}