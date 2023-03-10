import React from "react";
import '../styles/globals.css';
import {Poppins} from "@next/font/google";
import {UserContextProvider} from "@/contexts/UserContext";

const poppins = Poppins({
  weight: '400',
})

export default function RootLayout({children}: {
  children: React.ReactNode,
}) {
  return (
    <html className={poppins.className} lang="fr" data-theme="light">
      <head>
        <title>Travel</title>
      </head>
      <body>
      <UserContextProvider>
        {children}
      </UserContextProvider>
      </body>
    </html>
  );
}