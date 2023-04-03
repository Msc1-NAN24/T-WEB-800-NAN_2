'use client';

import {IActivity} from "@/components/Map/ActivityCard/ActivityCard";
import React, {useRef, useState} from "react";
import Modal from "@/components/Modals/Modal";
import "flatpickr/dist/themes/airbnb.css";
// @ts-ignore
import Flatpickr from "react-flatpickr";


type Props = {
  activity: IActivity;
  open: boolean;
  onDismiss: () => void;
  onValid: (activity: IActivity, date: Date) => void;
};

export default function DateTimePickerModal(props: Props) {

  const [date, setDate] = useState<Date[]>([new Date()]);

  const onClickDateTime = () => {
    props.onValid(props.activity, date[0]);
  }

  return (
    <Modal {...props} disableOutside={true}>
      <div className={"flex flex-col w-full"}>
        <input disabled className={"hidden"}/>
        <h1 className={"modal-title text-xl font-bold"}>{props.activity?.title}</h1>
        <p>Choisissez une date et une heure :</p>
        <Flatpickr
          className={'btn bg-emerald-500 my-4 text-white p-4 rounded-2xl'}
          data-enable-time
          options={{time_24hr: true}}
          value={date}
          onChange={(d: Date[]) => {
            setDate(d);
          }}
        />
        <button className={"mt-8 btn btn-primary"} onClick={onClickDateTime}>Valider</button>
      </div>
    </Modal>
  )
}