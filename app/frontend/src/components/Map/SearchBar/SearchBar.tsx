import React, {useState} from "react";
import Image from "next/image";
import useLocation from "@/hooks/useLocation";
import {useForm} from "react-hook-form";
import {Autocomplete} from "@react-google-maps/api";

export type SearchBarProps = {
  onSearch?: (text: string) => void;
  onClickUpdateLocation?: (location: number[]) => void;
  bounds: number[];
}

type Form = {
  search: string;
}

export default function SearchBar(props: SearchBarProps) {

  const {watch, getValues, setValue} = useForm<Form>({defaultValues: {search: ''}});
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onPositionUpdated = (position: GeolocationPosition) => {
    if (props.onClickUpdateLocation) {
      console.log(position);
      props.onClickUpdateLocation([position.coords.latitude, position.coords.longitude]);
    }
  }

  const onPositionError = (err: GeolocationPositionError) => {
    console.log(err);
  }

  const {ask} = useLocation({successCallback: onPositionUpdated, errorCallback: onPositionError});

  const onClickSearch = () => {
    if (props.onSearch) {
      props.onSearch(getValues('search'));
    }
  }

  const onLoaded = (auto: google.maps.places.Autocomplete) => {
    auto.setFields(['geometry.location', /*'photos'*/]);
    setAutoComplete(auto);
    console.log('place loaded !');
  }

  const onPlaceChanged = () => {
    if (autoComplete && props.onClickUpdateLocation) {
      const place = autoComplete.getPlace();
      console.log(place);
      if (place.geometry?.location) {
        props.onClickUpdateLocation([place.geometry.location.lat(), place.geometry.location.lng()]);
      }
    }
  }

  return (
      <div className={"z-10 w-full h-16 rounded-2xl bg-white shadow-2xl mt-8 mx-6 flex flex-row"}>
        <Autocomplete className={"rounded-2xl w-11/12"} onLoad={onLoaded} onPlaceChanged={onPlaceChanged}>
          <input value={watch('search')} onChange={(e) => setValue('search', e.currentTarget.value)} className={"map-input px-6 ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-outline border-none rounded-2xl w-11/12 h-full"} type="text"/>
        </Autocomplete>
        <div className={"w-1/12 flex flex-row gap-4 mr-4 justify-end h-fit m-auto"}>
          <Image className={"map-location cursor-pointer"} src={'/icons/location.svg'} alt={'get location'} width={32} height={32} onClick={() => ask()}/>
        </div>
      </div>
  )
}