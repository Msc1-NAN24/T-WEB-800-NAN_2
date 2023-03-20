import Map from "@/components/Map/Map";
import Events from "@/components/Events/Events";
import React from "react";

export default async function Page() {
  return (
    <>
      <Map/>
      <Events city={'Nantes'}/>
    </>
  )
}