import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import useStore from "./useStore"; // Remplace GlobalContext par useStore
import { getMonth } from "@/utils/dayjs";
import { ChevronLeft,ChevronRight } from "lucide-react";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
    setMonthIndex
  } = useStore();

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex items-center justify-center space-x-2">

        <button onClick={handlePrevMonth} className="border border-red-500 rounded-lg py-2 px-4 hover:bg-red-500 " >
          <ChevronLeft className="h-3 w-3 hover:text-white transition duration-200" />
          </button>
          <div className="flex text-center">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
          </div>
          
          <button onClick={handleNextMonth}className="border border-red-500 rounded-lg py-2 px-4 hover:bg-red-500 " >
          <ChevronRight className="h-3 w-3" />
          </button>

      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                  if (currentMonthIdx !== monthIndex) { setMonthIndex(currentMonthIdx); }
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
