"use client";
import MonthlyCalendar from "@/components/monthlyCalendar";
import React from "react";

export default function Home() {
  const [month, setMonth] = React.useState(new Date().getMonth());

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-4 min-h-screen bg-slate-100">
      <MonthlyCalendar month={month} setMonth={setMonth} />
    </main>
  );
}
