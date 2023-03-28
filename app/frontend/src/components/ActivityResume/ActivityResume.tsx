import {IActivity} from "@/components/Map/ActivityCard/ActivityCard";
import ActivityStep from "@/components/ActivityResume/ActivityStep/ActivityStep";

export type Props = {
  activities: IActivity[];
  onActivitiesUpdated: (activities: IActivity[]) => void;
}

export default function ActivityResume({activities, onActivitiesUpdated}: Props) {

  const onDeleted = (index: number) => {
    const ac = activities;
    ac.splice(index, 1);
    onActivitiesUpdated(ac);
  }

  if (activities.length === 0)
    return <></>

  return (
    <div className={"md:mx-32 my-10"}>
      <p className={"text-3xl my-10"}>Mes planification</p>
      {activities.map((activity, index) =>
        <ActivityStep next_place={activities[index+1]} key={`activity-step-${index}-${activity.title}`} onClickDeleted={() => onDeleted(index)} activity={activity} step={index === activities.length-1 ? 'last' : index === 0 ? 'first' : 'middle'}/>
      )}
    </div>
  )
}