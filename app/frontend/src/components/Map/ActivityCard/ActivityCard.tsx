export interface IActivity {
  title: string;
  description: string;
  note: number;
  picture: string;
}

export type ActivityCardProps = {
  activity: IActivity;
  onPlan?: () => void;
  onClose?: () => void;
}

export default function ActivityCard(props: ActivityCardProps) {
  return (<div className={"z-10"}>ActivityCard</div>)
}