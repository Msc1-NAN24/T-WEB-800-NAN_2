'use client';


import {useOnClickOutside} from "@/hooks/useOnClickOutside";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import Lottie from "lottie-react";

export interface IActivity {
  title: string;
  description: string;
  note: number;
  picture: string | Blob | undefined;
}

export type ActivityCardProps = {
  activity?: IActivity;
  onPlan: () => void;
  onClose?: () => void;
  show: boolean;
  loading: boolean;
}

export default function ActivityCard({activity, onClose, onPlan, show, loading}: ActivityCardProps) {

  const divRef = useRef<HTMLDivElement | null>(null);
  const [img, setImg] = useState<undefined | string>();

  useEffect(() => {
    getImg().then((value) => {
      console.log(value);
      setImg(value);
    })
  }, [])

  useOnClickOutside(divRef, () => {
    if (show) {
      onClickClose();
    }
  })

  const onClickClose = () => {
    if (onClose) {
      onClose();
    }
  }

  const getImg = async (): Promise<string> => {
    if (activity?.picture instanceof Blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(activity.picture as Blob);
      });
    } else {
      return activity?.picture ?? '';
    }
  }

  if (loading) {
    return (
      <motion.div ref={divRef} animate={{opacity: show ? 1 : 0, display: show ? '' : 'none'}} className={"flex flex-col z-10 w-4/12 bg-white my-8 mx-8 rounded-2xl shadow-2xl"}>
        <Lottie animationData={require('../../../../public/animations/loading_activity.json')} height={240} width={'75%'}/>
      </motion.div>)
  }

  return (
    <motion.div ref={divRef} animate={{opacity: show ? 1 : 0, display: show ? '' : 'none'}} className={"flex flex-col z-10 w-6/12 bg-white my-8 mx-8 rounded-2xl shadow-2xl"}>
        <div className={"h-72 relative"}>
          {activity?.picture && img ? <img className={"map-activity-img rounded-t-2xl object-fill object-cover"} src={img} alt={activity?.title ?? ''}/> : null}
          <Image className={"map-activity-close cursor-pointer z-50 absolute m-4"} src={'./icons/close.svg'} alt={'Close'} width={40} height={40} onClick={onClickClose}/>
          <div className={"absolute bottom-0 right-0 my-2 mx-4 px-8 py-1 rounded-3xl bg-primary text-white flex flex-row gap-2 items-center"}>
            <p className={"map-activity-note"}>{activity?.note}</p>
            <p>⭐</p>
          </div>
        </div>
        <div className={"grow"}>
          <p className={"map-activity-title text-2xl font-bold p-4"}>{activity?.title}</p>
          <p className={"map-activity-description p-4"}>{activity?.description}</p>
        </div>
        <button className={"map-activity-plan m-4 px-6 py-2 rounded-3xl bg-primary text-white w-fit"} onClick={onPlan}>Planifier</button>
    </motion.div>)
}