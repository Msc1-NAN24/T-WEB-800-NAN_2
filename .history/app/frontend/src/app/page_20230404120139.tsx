import Events from "@/components/Events/Events";
import React from "react";
import MapLayout from "@/components/Map/MapLayout";
import Profile from "@/components/Profile/Profile";

export default async function Page() {
  return (
    <>
      {/* <MapLayout />
      <Events city={"Nantes"} /> */}
      <Profile />
    </>
  );
}
