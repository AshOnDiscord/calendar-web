"use client";
import { useState } from "react";

const getWeekday = (date: Date) => {
  const day = date.getDay();
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

export default function WeeklyCalendar({
  week,
}: {
  week: { year: number; month: number; day: number } | null;
}) {
  if (!week)
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-4">
        No week selected
      </div>
    );

  const firstDayOfWeek = new Date(week.year, week.month, week.day).getDate();

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(week.year, week.month, i + firstDayOfWeek);
    return {
      day: day.getDate(),
      weekday: getWeekday(day)?.slice(0, 3),
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-4 grid grid-rows-[auto,auto] gap-2 h-full w-full">
      <div className="grid grid-cols-[4rem,repeat(7,minmax(0,1fr))] divide-x divide-transparent">
        <div></div>
        {days.map(({ day, weekday }) => (
          <div key={day} className="text-center flex flex-col items-center">
            <h2>{weekday}</h2>
            <h1 className="font-medium text-xl">{day}</h1>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[4rem,repeat(7,minmax(0,1fr))] divide-x divide-slate-200 overflow-scroll h-full w-full">
        <div className="grid grid-rows-[repeat(24,2rem)] divide-y divide-slate-200 text-right">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="pr-2 flex flex-col justify-center">
              <p>
                {(i % 12) + 1} {i / 12 > 1 ? "PM" : "AM"}
              </p>
            </div>
          ))}
        </div>
        {days.map(({ day, weekday }) => (
          <div
            key={day}
            className="grid grid-rows-[repeat(24,2rem)] divide-y divide-slate-200"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center justify-center"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
