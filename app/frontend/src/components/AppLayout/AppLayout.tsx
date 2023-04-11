'use client';

import MapLayout from "@/components/Map/MapLayout";
import Events from "@/components/Events/Events";
import React, {useState} from "react";
import ActivityResume from "../ActivityResume/ActivityResume";
import {IActivity} from "@/components/Map/ActivityCard/ActivityCard";
import {LocalEvent} from "@/services/EventsService.type";

export default function AppLayout() {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [event, setEvent] = useState<undefined | LocalEvent>(undefined);
  const [city, setCity] = useState<string>('Nantes');

  const onPlanActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
  }

  const onActivityUpdated = (activity: IActivity[]) => {
    setActivities([...activity]);
  }

  return (
    <>
      <MapLayout event={event} onPlanActivities={onPlanActivity} activities={activities} onLocationChange={(cityName) => setCity(cityName)}/>
      {activities.length <= 0 ? <Events city={city} onClickEvent={(event) => setEvent(event)}/> : null}
      <ActivityResume activities={activities} onActivitiesUpdated={onActivityUpdated}/>
    </>)
}