'use client';

import React from "react";
import "../styles/globals.css";
import { Poppins } from "@next/font/google";
import { UserContextProvider } from "@/contexts/UserContext";
import Topbar from "@/components/Topbar/Topbar";
import {ToastContextProvider} from "@/contexts/ToastContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"/>
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
