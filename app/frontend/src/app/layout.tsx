import React from "react";
import '../styles/globals.css';

export default function RootLayout({children}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="fr" data-theme="light">
      <head>
        <title>Travel</title>
      </head>
      <body>
      {children}
      </body>
    </html>
  );
}