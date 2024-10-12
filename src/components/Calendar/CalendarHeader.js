"use client";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import useStore from "./useStore"; // Remplace GlobalContext par useStore
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useStore();

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random() // Pour forcer un changement si c'est le mois actuel
        : dayjs().month()
    );
  }

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      <h1 className="text-xl font-bold text-gray-700">Calendar</h1>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleReset}
          className="border border-blue-500 text-blue-500 rounded-lg py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-200"
        >
          Today
        </button>
        <button onClick={handlePrevMonth} className="border border-red-500 rounded-lg py-2 px-4 hover:bg-red-500 " >
          
        <ChevronLeft className="h-4 w-4 hover:text-white transition duration-200" />
        </button>
        <h2 className="text-xl font-bold text-red-700">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth}className="border border-red-500 rounded-lg py-2 px-4 hover:bg-red-500 " >
        <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
