interface EventsProps {
  title: string,
  date: string,
  lieu: string,
  description: string
}

export default function EventCard(props: EventsProps) {
  return (
    <div className="max-w-sm">
      <h1>EventCard</h1>
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h3>
      <p className="font-normal text-gray-700 dark:text-gray-400">{props.date} - {props.lieu}</p>
      <p className="font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
    </div>
  );
}