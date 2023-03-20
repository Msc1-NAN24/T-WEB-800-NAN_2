interface EventsProps {
  title: string,
  date: string,
  lieu: string,
  description: string
}

export default function EventCard(props: EventsProps) {
  return (
    <>
      <h1>EventCard</h1>
      <h3>{props.title}</h3>
      <p>{props.date} - {props.lieu}</p>
      <p>{props.description}</p>
    </>
  );
}