import React from "react";
import "../styles/globals.css";
import { Poppins } from "@next/font/google";
import { UserContextProvider } from "@/contexts/UserContext";
import Topbar from "@/components/Topbar/Topbar";
import {ToastContextProvider} from "@/contexts/ToastContext";

const poppins = Poppins({
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={poppins.className} lang="fr" data-theme="light">
      <head>
        <link rel="shortcut icon" href="/atrip.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/atrip.png"/>
        <title>ATrip</title>
      </head>
      <body>
      <UserContextProvider>
        <ToastContextProvider>
          <div className={"modal-portal"}/>
          <Topbar/>
          {children}
        </ToastContextProvider>
      </UserContextProvider>
      </body>
    </html>
  );
}
