import React from "react";
import '../styles/globals.css';

export default function DashboardLayout({children}: {
  children: React.ReactNode,
}) {
  return (
    <html data-theme="light">
      <section>
        <nav></nav>
        {children}
      </section>
    </html>
  );
}