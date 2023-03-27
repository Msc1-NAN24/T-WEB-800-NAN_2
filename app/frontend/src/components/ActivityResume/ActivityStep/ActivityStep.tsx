import {IActivity} from "@/components/Map/ActivityCard/ActivityCard";
import {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {PlacesService} from "@/services/PlacesService";
import {Element} from "@/services/PlacesService.type";
import ActivityStepMap from "@/components/ActivityResume/ActivityStep/ActivityStepMap";

type Props = {
  activity: IActivity;
  step: 'first' | 'last' | 'middle';
  onClickDeleted: () => void;
  next_place?: IActivity;
}

type Direction = google.maps.TravelMode

export default function ActivityStep({activity, step, onClickDeleted, next_place}: Props) {

  const [directionType, setDirectionType] = useState<Direction>(google.maps.TravelMode.WALKING);
  const [info, setInfo] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [distance, setDistance] = useState<Element | undefined>(undefined);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (step === 'last' || next_place === undefined) {
      return;
    }
    PlacesService.getDistance({
      origin: activity.place_id,
      destination: next_place?.place_id ?? '',
    }).then((value) => {
      if (value.ok && value?.ok?.body?.length > 0) {
        setDistance(value.ok.body[0].elements[0]);
      }
    }).then((err) => {
      console.log(err);
    })
  }, [activity, next_place]);

  const getImg = (): string[] =>  {
    if (activity?.picture !== undefined && activity?.picture?.length > 0) {
      return activity?.picture?.map((pic) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${pic}&key=AIzaSyDHkts9Uug339wizRpG7K3OY4ofZwrr-qA`);
    }
    return [];
  }

  const onClickShowStep = () => {
    // show Toast
  }

  const onClickGoogleMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${activity.title}&origin_place_id=${activity.place_id}&destination=${next_place?.title}&destination_place_id=${next_place?.place_id}&travelmode=${directionType}`;
    window.open(url, '_blank')

  }

  const showStep = useMemo(() => {
      if (step !== 'last') {
        if (expanded) {
          return (
            <Image className={"items-center justify-center text-center m-auto my-4 opacity-50"} src={'/icons/next.svg'} alt={'arrow'}  width={4} height={4}/>
          )
        }
        return (
          <div className={"text-center my-12"}>
            <div className={"text-2xl font-bold flex flex-row justify-center items-center cursor-pointer"} onClick={() => setExpanded(true)}>
              <p>{distance?.duration.text ?? 'step....'}</p>
              <Image src={'./icons/walk.svg'} width={36} height={36} alt={'walk icon'}/>
            </div>
          </div>
        )
      }
    }, [step, activity, expanded]);

  const showTravel = useMemo(() => {
      if (expanded && step !== 'last') {
        return (
          <div className={"rounded-b-3xl mt-6 flex flex-row shadow-2xl"}>
            <div className={"w-3/12"}>
              <div className={"flex flex-col"}>
                <div className={"flex flex-row justify-around px-8 mt-4"}>
                  <div className={`${directionType === 'DRIVING' ? 'bg-gray-400' : 'bg-gray-200'} rounded-3xl p-2 cursor-pointer`} onClick={() => setDirectionType(google.maps.TravelMode.DRIVING)}>
                    <Image src={'/icons/car.svg'} className={"avatar"} width={26} height={26} alt={''}/>
                  </div>
                  <div className={`${directionType === 'WALKING' ? 'bg-gray-400' : 'bg-gray-200'} rounded-3xl p-2 cursor-pointer`} onClick={() => setDirectionType(google.maps.TravelMode.WALKING)}>
                    <Image src={'/icons/walk.svg'} className={"avatar"} width={26} height={26} alt={''}/>
                  </div>
                  <div className={`${directionType === 'BICYCLING' ? 'bg-gray-400' : 'bg-gray-200'} rounded-3xl p-2 cursor-pointer`} onClick={() => setDirectionType(google.maps.TravelMode.BICYCLING)}>
                    <Image src={'/icons/bike.svg'} className={"avatar"} width={26} height={26} alt={''}/>
                  </div>
                  <div className={`${directionType === 'TRANSIT' ? 'bg-gray-400' : 'bg-gray-200'} rounded-3xl p-2 cursor-pointer`} onClick={() => setDirectionType(google.maps.TravelMode.TRANSIT)}>
                    <Image src={'/icons/tram.svg'} className={"avatar"} width={26} height={26} alt={''}/>
                  </div>
                </div>
                <input disabled className={"mt-10 p-4 bg-white mx-6 rounded-2xl"} value={activity.title}/>
                <input disabled className={"mt-2 p-4 bg-white mx-6 rounded-2xl"} value={next_place?.title}/>
                <div className={"flex flex-row mx-8 mt-6 my-4 gap-2"}>
                  <button className={'btn btn-primary flex-1'} onClick={onClickShowStep}>étapes</button>
                  <button className={'btn btn-primary flex-1'} onClick={onClickGoogleMap}>Google Maps</button>
                </div>
              </div>
            </div>
            <div className={"w-3/12 my-4 mr-4"}>
              <p className={"text-lg mb-4"}>Informations :</p>
              {info && info.routes.length > 0 && info.routes[0].legs.length > 0 ? <p>{info?.routes[0].legs[0].duration?.text}</p> : null}
              {info && info.routes.length > 0 && info.routes[0].legs.length > 0 ? <p>{info?.routes[0].legs[0].distance?.text}</p> : null}
              {info && info.routes.length > 0 && info.routes[0].warnings ? <p className={"mt-4"}>{info?.routes[0].warnings.join(', ')}</p> : null}
            </div>
            <div className={"w-9/12"}>
              <ActivityStepMap originId={activity.place_id} destinationId={next_place?.place_id ?? ''} onChange={(i) => setInfo(i)} type={directionType} origin={activity.title} destination={next_place?.title ?? ''}/>
            </div>
          </div>
        )
      } else {
        return <></>
      }
    }, [expanded, step, activity, directionType, info]);

  const showDate = () => {
    return activity.date?.toLocaleString('fr-FR',  { weekday: 'long', month: 'long', day: 'numeric' }) + ' à ' + activity.date?.toLocaleTimeString('fr-FR');
  }

  return (
    <div>
      <p className={'mb-2'}>{showDate()}</p>
      <div className={`${expanded ? 'rounded-t-3xl' : 'rounded-3xl'} flex flex-row shadow-2xl`}>
        <img src={getImg()[0]} alt={activity.title} className={`${expanded ? 'rounded-tl-3xl' : 'rounded-l-3xl'} h-60 w-4/12 object-cover`}/>
        <div className={"flex flex-row justify-between w-8/12"}>
          <div className={"flex flex-col m-4"}>
            <p className={"text-2xl"}>{activity.title}</p>
            <p>{activity.note}</p>
          </div>
          <div className={"self-start m-4 bg-red-400 rounded-3xl cursor-pointer"} onClick={onClickDeleted}>
            <Image className={"m-2"} alt={"trash icon"} src={"/icons/trash.svg"} width={26} height={26}/>
          </div>
        </div>
      </div>
      {showTravel}
      {showStep}
    </div>
  )
}