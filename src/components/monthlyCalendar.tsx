"use client";
import { useState } from "react";

export default function MonthlyCalendar({
  month: displayedMonth,
  setMonth: setDisplayedMonth,
  selectWeek,
}: {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  selectWeek: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
      day: number;
    } | null>
  >;
}) {
  const [active, setActive] = useState<{
    month: number;
    day: number;
  } | null>(null);

  // val day of the week the month starts on
  const dayOfWeek = new Date(2024, displayedMonth, 1).getDay();

  const offset = -dayOfWeek;

  const daysInMonth = new Date(2024, displayedMonth + 1, 0).getDate();
  // val days in previous month
  const daysInPreviousMonth = new Date(2024, displayedMonth, 0).getDate();

  const getDay = (month: number, i: number, j: number) => {
    // val days in current month

    const number = offset + i * 7 + j;
    return {
      day:
        number >= 0
          ? (number % daysInMonth) + 1
          : number + daysInPreviousMonth + 1,
      current: number >= 0 && number < daysInMonth,
      month: month + (number < 0 ? -1 : number >= daysInMonth ? 1 : 0),
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-4">
      <table>
        <thead>
          <tr>
            <th colSpan={7}>
              <div className="flex justify-between">
                <h2 className="text-center">
                  {new Date(2024, displayedMonth, 1).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setDisplayedMonth(displayedMonth - 1)}>
                    {"<"}
                  </button>
                  <button onClick={() => setDisplayedMonth(displayedMonth + 1)}>
                    {">"}
                  </button>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Array.from({ length: 6 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 7 }, (_, j) => {
                const { day, current, month } = getDay(displayedMonth, i, j);
                const startOfWeek = getDay(displayedMonth, i, 0);
                const isActive =
                  active && active.month === month && active.day === day;
                return (
                  <td key={`${i}-${j}`}>
                    <button
                      className={[
                        current
                          ? isActive
                            ? "text-amber-900"
                            : "text-slate-900"
                          : isActive
                          ? "text-amber-600"
                          : "text-slate-300",
                        isActive ? "bg-amber-300 rounded-full" : "",
                        "px-2 py-1 w-full aspect-square",
                      ].join(" ")}
                      onClick={() => setActive({ month, day })}
                      onDoubleClick={() =>
                        selectWeek({
                          year: 2024 + Math.floor(startOfWeek.month / 12),
                          month: startOfWeek.month % 12,
                          day: startOfWeek.day,
                        })
                      }
                    >
                      {day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
