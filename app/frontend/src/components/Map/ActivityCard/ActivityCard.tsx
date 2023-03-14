'use client';

import {useOnClickOutside} from "@/hooks/useOnClickOutside";
import {useRef} from "react";
import Image from "next/image";

export interface IActivity {
  title: string;
  description: string;
  note: number;
  picture: string;
}

export type ActivityCardProps = {
  activity: IActivity;
  onPlan: () => void;
  onClose?: () => void;
}

export default function ActivityCard({activity, onClose, onPlan}: ActivityCardProps) {

  const divRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(divRef, () => {
    onClickClose();
  })

  const onClickClose = () => {
    if (onClose) {
      onClose();
    }
  }

  return (
    <div ref={divRef} className={"flex flex-col z-10 w-6/12 bg-white my-8 mx-8 rounded-2xl shadow-2xl"}>
      <div className={"h-72 relative"}>
        <Image className={"map-activity-img rounded-t-2xl"} fill objectFit={'cover'} src={activity.picture} alt={activity.title}/>
        <Image className={"map-activity-close cursor-pointer z-50 absolute m-4"} src={'./icons/close.svg'} alt={'Close'} width={40} height={40} onClick={onClickClose}/>
        <div className={"absolute bottom-0 right-0 my-2 mx-4 px-8 py-1 rounded-3xl bg-primary text-white flex flex-row gap-2 items-center"}>
          <p className={"map-activity-note"}>{activity.note}</p>
          <p>⭐</p>
        </div>
      </div>
      <div className={"grow"}>
        <p className={"map-activity-title text-2xl font-bold p-4"}>{activity.title}</p>
        <p className={"map-activity-description p-4"}>{activity.description}</p>
      </div>
      <button className={"map-activity-plan m-4 px-6 py-2 rounded-3xl bg-primary text-white w-fit"} onClick={onPlan}>Planifier</button>
    </div>)
}