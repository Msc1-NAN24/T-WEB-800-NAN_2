/* eslint-disable @next/next/no-img-element */
import { Card } from "react-bootstrap";
import imgCard from "../../../../public/dddepth-127.jpg";
import Image from "next/image";
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
      <Card>
        {/** en attendant les données de l'API */}
        {/*<h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h3>
        <p className="font-normal text-gray-700 dark:text-gray-400">{props.date} - {props.lieu}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{props.description}</p>*/}
        <Image src={imgCard} alt="" />
        <h3>Atelier maison: créer ses patisseries</h3>
        <p>21 janvier à 16h - Nantes, Commerce</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur convallis eu magna ac lacinia. 
          Quisque scelerisque neque sit amet dignissim sodales.</p>
      </Card>
    </div>
  );
}