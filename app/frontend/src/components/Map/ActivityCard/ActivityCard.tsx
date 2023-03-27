'use client';

import {useOnClickOutside} from "@/hooks/useOnClickOutside";
import {useRef, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import Lottie from "lottie-react";
import {OpeningHours} from "@/services/PlacesService.type";
import DateTimePickerModal from "@/components/Modals/DateTimePickerModal/DateTimePickerModal";

export interface IActivity {
  place_id: string;
  title: string;
  description: string;
  note: number;
  picture: string[] | undefined;
  date?: Date;
  opening_hours?: OpeningHours;
}

export type ActivityCardProps = {
  activity?: IActivity;
  onPlan: (activity: IActivity) => void;
  onClose?: () => void;
  show: boolean;
  loading: boolean;
}

export default function ActivityCard({activity, onClose, show, loading, onPlan}: ActivityCardProps) {

  const divRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const getImgs = (): string[] =>  {
    if (activity?.picture !== undefined && activity?.picture?.length > 0) {
      return activity?.picture?.map((pic) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${pic}&key=AIzaSyDHkts9Uug339wizRpG7K3OY4ofZwrr-qA`);
    }
    return [];
  }

  if (loading) {
    return (
      <motion.div ref={divRef} animate={{opacity: show ? 1 : 0, display: show ? '' : 'none'}} className={"flex flex-col z-10 w-4/12 bg-white my-8 mx-8 rounded-2xl shadow-2xl"}>
        <Lottie animationData={require('../../../../public/animations/loading_activity.json')} height={240} width={'75%'}/>
      </motion.div>)
  }

  const showOpeningHours = () => {
    if (activity?.opening_hours) {
      return (
        <>
          <p className={"text-xl"}>
            {activity.opening_hours.open_now ? 'Ouvert' : 'Fermée'}
          </p>
          <div>
            {activity.opening_hours.weekday_text.map((period, index) =>
              <p key={activity?.place_id + '-' + index}>{period}</p>)}
          </div>
        </>
      )
    } else {
      return (
        <p>
          Pas d'informations
        </p>
      )
    }
  };

  const onClickPlan = () => {
    setOpenModal(true);
    //onPlan(activity)
  }

  return (
    <>
      {activity ? <DateTimePickerModal onValid={(activity, date) => {
        activity.date = date;
        onPlan(activity);
        setOpenModal(false);
      }} onDismiss={() => setOpenModal(false)} activity={activity} open={openModal}/> : null}
      <motion.div ref={divRef} animate={{opacity: show ? 1 : 0, display: show ? '' : 'none'}} className={"flex flex-col z-10 w-6/12 bg-white my-8 mx-8 rounded-2xl shadow-2xl"}>
        <div className={"h-72 relative"}>
          {/*{activity?.picture ? <Image className={"map-activity-img rounded-t-2xl"} fill objectFit={'cover'} src={getImg()} alt={activity?.title ?? ''}/> : null}*/}
          {activity?.picture ? <div>
            {getImgs()
              .filter((a, i) => i < 1)
              .map((picture, index) => (
                <div key={'picture_' + index + picture} className="carousel-item">
                  <Image src={picture} fill objectFit={'cover'} alt="Picture" className={"map-activity-img rounded-t-2xl"}/>
                </div>
              ))}
          </div> : null}
          <Image className={"map-activity-close cursor-pointer z-50 absolute m-4"} src={'./icons/close.svg'} alt={'Close'} width={40} height={40} onClick={onClickClose}/>
          <div className={"absolute bottom-0 right-0 my-2 mx-4 px-8 py-1 rounded-3xl bg-primary text-white flex flex-row gap-2 items-center"}>
            <p className={"map-activity-note"}>{activity?.note}</p>
            <p>⭐</p>
          </div>
        </div>
        <div className={"grow overflow-auto"}>
          <p className={"map-activity-title text-2xl font-bold p-4"}>{activity?.title}</p>
          <div className={"map-activity-description p-4"}>
            {showOpeningHours()}
          </div>
        </div>
        <button disabled={!activity} className={"map-activity-plan m-4 px-6 py-2 rounded-3xl bg-primary text-white w-fit"} onClick={onClickPlan}>Planifier</button>
      </motion.div>
    </>
  )
}