"use client";
import MonthlyCalendar from "@/components/monthlyCalendar";
import WeeklyCalendar from "@/components/weeklyCalendar";
import React from "react";

export default function Home() {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [week, setWeek] = React.useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-4 min-h-screen bg-slate-100">
      <MonthlyCalendar month={month} setMonth={setMonth} selectWeek={setWeek} />
      <div className="h-96 w-[48rem]">
        <WeeklyCalendar week={week} />
      </div>
    </main>
  );
}
