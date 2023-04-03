'use client';

import MapLayout from "@/components/Map/MapLayout";
import Events from "@/components/Events/Events";
import React, {useState} from "react";
import ActivityResume from "../ActivityResume/ActivityResume";
import {IActivity} from "@/components/Map/ActivityCard/ActivityCard";

export default function AppLayout() {

  const [activities, setActivities] = useState<IActivity[]>([]);

  const onPlanActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
  }

  const onActivityUpdated = (activity: IActivity[]) => {
    setActivities([...activity]);
  }

  return (
    <>
      <MapLayout onPlanActivities={onPlanActivity} activities={activities}/>
      {activities.length <= 0 ? <Events city={'Nantes'}/> : null}
      <ActivityResume activities={activities} onActivitiesUpdated={onActivityUpdated}/>
    </>)
}