/* eslint-disable @next/next/no-img-element */
import { Card } from "flowbite-react";
import imgCard from "@/dddepth-127.jpg";
import Image from "next/image";
interface EventsProps {
  title: string,
  date: string,
  lieu: string,
  description: string
}

export default function EventCard(props: EventsProps) {
  return (
    
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
          alt="" 
        />
        <div className="flex flex-col justify-start p-6">
          <h3 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">Atelier maison: créer ses patisseries</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">21 janvier à 16h - Nantes, Commerce</p>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Curabitur convallis eu magna ac lacinia. 
            Quisque scelerisque neque sit amet dignissim sodales.
          </p>
        </div>
      {/** en attendant les données de l'API */}
      {/*
        <h1>EventCard</h1>
        <Card 
          horizontal={true} 
          imgSrc="./../imgCard.jpg"
        >
          
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h3>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.date} - {props.lieu}</p>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.description}</p>*/}
          {/*<Image src={imgCard} alt="" />
          
        </Card>*/}
      </div>
    </div>
  );
}