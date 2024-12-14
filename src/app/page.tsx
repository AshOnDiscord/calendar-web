"use client";
import MonthlyCalendar from "@/components/monthlyCalendar";
import React from "react";

export default function Home() {
  const [month, setMonth] = React.useState(new Date().getMonth());

  return <MonthlyCalendar month={month} setMonth={setMonth} />;
}
