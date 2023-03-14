import React, {useCallback, useMemo} from "react";
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";

enum ActionType {
  Hostel = 'Hotel',
  Activity = 'Activités',
  Restaurant = 'Restaurant',
  Bar = 'Bar',
}

export type FilterBarProps = {
  dates: Date[];
  onDatesChanged: (dates: Date[]) => void;
}

export default function FilterBar({dates, onDatesChanged}: FilterBarProps) {

  const onClickHostels = useCallback(() => {

  }, []);

  const onClickActivity = useCallback(() => {

  }, []);

  const onClickRestaurant = useCallback(() => {

  }, []);

  const onClickBar = useCallback(() => {

  }, []);

  const actions = useMemo(() => ({
    [ActionType.Hostel]: {
      icon: '/icons/bed.svg',
      onClick: onClickHostels,
    },
    [ActionType.Activity]: {
      icon: '/icons/local_activity.svg',
      onClick: onClickActivity
    },
    [ActionType.Bar]: {
      icon: '/icons/sports_bar.svg',
      onClick: onClickBar
    },
    [ActionType.Restaurant]: {
      icon: '/icons/flatware.svg',
      onClick: onClickRestaurant
    }
  }), [onClickBar, onClickRestaurant, onClickActivity, onClickHostels]);

  const onDateChanged = (date: DateValueType) => {
    if (date !== null && date.startDate !== null && date.endDate) {
      onDatesChanged([new Date(date.startDate), new Date(date.endDate)])
    }
  }

  return (<div className={"absolute mx-auto justify-center bottom-0 w-full z-10"}>
    <div className={"sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-8/12 bg-white rounded-t-2xl mx-auto"}>
      <div className={"grid grid-cols-12"}>
        <div className={"col-span-7 flex flex-row gap-4"}>
          {Object.values(ActionType).map((v, index) => (
            <div key={'action-type-' + index} className={"h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-auto flex flex-row gap-2 align-middle cursor-pointer hover:bg-gray-200 transition-all"}>
              <Image src={actions[v].icon} alt={""} width={22} height={22}/>
              <p className={"font-medium"}>{v}</p>
            </div>
          ))}
          <div key={'action-type-more'} className={"h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-auto flex flex-row gap-2 align-middle cursor-pointer hover:bg-gray-200 transition-all"}>
            <Image src={'./icons/more.svg'} alt={'more'} width={22} height={22}/>
          </div>
        </div>
        <div className={"col-span-5"}>
          <div className={"flex flex-row items-center gap-4 justify-end"}>
            <Datepicker
              containerClassName={'w-72'}
              inputClassName={"rounded-3xl outline-0 active:outline-0 focus:outline-0 focus:border-transparent focus:ring-0"}
              placeholder={"Du X au Y"}
              primaryColor={'blue'}
              value={{startDate: dates[0], endDate: dates[1]}}
              onChange={onDateChanged}
            />
            <div key={'action-type-more-filter'} className={"h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-2 flex flex-row gap-2 align-middle cursor-pointer hover:bg-gray-200 transition-all"}>
              <Image src={'./icons/more.svg'} alt={'more'} width={22} height={22}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}