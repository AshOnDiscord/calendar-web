import React from "react";

export default function MonthlyCalendar({
  month,
  setMonth,
}: {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const month = new Date().getMonth();

  // val day of the week the month starts on
  const dayOfWeek = new Date(2024, month, 1).getDay();

  const offset = -dayOfWeek;

  const daysInMonth = new Date(2024, month + 1, 0).getDate();
  // val days in previous month
  const daysInPreviousMonth = new Date(2024, month, 0).getDate();

  const getDay = (i: number, j: number) => {
    // val days in current month

    const number = offset + i * 7 + j;
    return {
      number:
        number >= 0
          ? (number % daysInMonth) + 1
          : number + daysInPreviousMonth + 1,
      current: number >= 0 && number < daysInMonth,
    };
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={7}>
            <div className="flex justify-center">
              <h2 className="text-center">
                {new Date(2024, month, 1).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button onClick={() => setMonth(month - 1)}>{"<"}</button>
              <button onClick={() => setMonth(month + 1)}>{">"}</button>
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
              const { number, current } = getDay(i, j);
              return (
                <td
                  key={`${i}-${j}`}
                  className={current ? "text-slate-900" : "text-slate-300"}
                >
                  {number}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
