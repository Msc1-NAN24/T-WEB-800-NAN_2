'use client';

import React, {useCallback, useMemo} from "react";
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";
import { motion } from "framer-motion";
import {useForm} from "react-hook-form";
import FilterModal from "@/components/Map/FilterModal/FilterModal";
import {PlacesService} from "@/services/PlacesService";
import {Result} from "@/utils/type";
import {Place} from "@/services/PlacesService.type";

enum ActionType {
  Hostel = 'Hotel',
  Activity = 'Activités',
  Restaurant = 'Restaurant',
  Bar = 'Bar',
}

export type FilterBarProps = {
  location: {
    lat: number;
    lng: number;
    radius: number;
  };
  dates: Date[];
  onDatesChanged: (dates: Date[]) => void;
  show: boolean;
  onPlacesChanged: (places: MapLocation[]) => void;
}

export type MapLocation = {
  location: {
    lat: number;
    lng: number;
  }
  name: string;
  place_id: string;
  rating: number;
  type: ActionType;
  icon: string;
}

export type FilterForm = {
  Hotel: boolean;
  Activités: boolean;
  Restaurant: boolean;
  Bar: boolean;
  filterModal: boolean;
  places: MapLocation[];
}

export default function FilterBar({dates, onDatesChanged, show, location, onPlacesChanged}: FilterBarProps) {

  const {watch, setValue, getValues} = useForm<FilterForm>({defaultValues: {Bar: false, Activités: false, Restaurant: false, Hotel: false, filterModal: false, places: []}});

  const onClickItem = useCallback((action: any) => {
    setValue(action.onClick.type, !getValues(action.onClick.type));
    if (getValues(action.onClick.type)) {
      action.onClick.fnc({
        radius: location.radius,
        location: location
      }).then((value: Result) => {
        if (value.ok) {
          const current = getValues('places');
          value.ok.body.places.forEach((a: Place) => {
            const p = {
              type: action.onClick.type,
              location: a.geometry.location,
              name: a.name,
              place_id: a.place_id,
              rating: a.rating,
              icon: a.icon
            } as MapLocation;
            if (!current.some((a) => a.place_id === p.place_id)) {
              current.push(p);
            }
          })
          setValue('places', current);
          onPlacesChanged(getValues('places'));
        } else {
          console.log('NOT OK !');
        }
        console.log(value.ok);
      }).catch((err: unknown) => {
        console.log(err);
      });
    } else {
      const current = getValues('places');
      setValue('places', current.filter((p: MapLocation) => p.type !== action.onClick.type));
      onPlacesChanged(getValues('places'));
    }
  }, [location]);

  const actions = useMemo(() => ({
    [ActionType.Hostel]: {
      icon: '/icons/bed.svg',
      onClick: {
        fnc: PlacesService.searchHostel,
        type: ActionType.Hostel
      }
    },
    [ActionType.Activity]: {
      icon: '/icons/local_activity.svg',
      onClick: {
        fnc: PlacesService.searchActivity,
        type: ActionType.Activity
      }
    },
    [ActionType.Bar]: {
      icon: '/icons/sports_bar.svg',
      onClick: {
        fnc: PlacesService.searchBar,
        type: ActionType.Bar
      }
    },
    [ActionType.Restaurant]: {
      icon: '/icons/flatware.svg',
      onClick: {
        fnc: PlacesService.searchRestaurant,
        type: ActionType.Restaurant
      }
    }
  }), [onClickItem]);

  const onDateChanged = (date: DateValueType) => {
    if (date !== null && date.startDate !== null && date.endDate) {
      onDatesChanged([new Date(date.startDate), new Date(date.endDate)])
    }
  }

  return (
    <div>
      <FilterModal onValid={() => null} open={watch('filterModal')} onDismiss={() => setValue('filterModal', false)}/>
      <motion.div animate={{ y: show ? 765 : 840 }}>
        <div className={`absolute mx-auto justify-center bottom-0 w-full z-10 transition-all`}>
          <div className={"sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-8/12 bg-white rounded-t-2xl mx-auto"}>
            <div className={"grid grid-cols-12"}>
              <div className={"col-span-7 flex flex-row gap-4 px-4 py-2 pb-6"}>
                {Object.values(ActionType).map((v, index) => (
                  <div key={'action-type-' + index} onClick={() => onClickItem(actions[v])} className={`h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-auto flex flex-row gap-2 align-middle cursor-pointer ${watch(v) ? 'bg-gray-200 border-gray-300' : 'bg-white'} hover:bg-gray-200 transition-all`}>
                    <Image src={actions[v].icon} alt={'Icon'} width={22} height={22}/>
                    <p className={"font-medium"}>{v}</p>
                  </div>
                ))}
                <div key={'action-type-more'} className={"h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-auto flex flex-row gap-2 align-middle cursor-pointer hover:bg-gray-200 transition-all"}>
                  <Image src={'./icons/more.svg'} alt={'more'} width={22} height={22}/>
                </div>
              </div>
              <div className={"col-span-5 flex justify-end items-center px-4 py-2 pb-6"}>
                <div className={"flex flex-row items-center gap-4 justify-end"}>
                  <Datepicker
                    containerClassName={'w-72'}
                    inputClassName={"rounded-3xl outline-0 active:outline-0 focus:outline-0 focus:border-transparent focus:ring-0"}
                    placeholder={"Du X au Y"}
                    primaryColor={'blue'}
                    value={{startDate: dates[0], endDate: dates[1]}}
                    onChange={onDateChanged}
                  />
                  <div onClick={() => setValue('filterModal', true)} key={'action-type-more-filter'} className={"h-min border-2 border-gray-200 rounded-3xl py-2 px-4 my-2 flex flex-row gap-2 align-middle cursor-pointer hover:bg-gray-200 transition-all"}>
                    <Image src={'./icons/filter.svg'} alt={'more'} width={22} height={22}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}