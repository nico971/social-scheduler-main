"use client";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import EventModal from "@/components/Calendar/EventModal";
import Month from "@/components/Calendar/Month";
import Sidebar from "@/components/Calendar/Sidebar";
import useStore from "@/components/Calendar/useStore"; // Import du store Zustand
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getMonth } from "@/utils/dayjs";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  // Récupérer les valeurs du store Zustand
  const { monthIndex, showEventModal } = useStore();

  // Met à jour le mois en fonction de monthIndex
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
        <Breadcrumb pageName="Planning"/>
        {/* Affiche le modal d'événement si nécessaire */}
        {showEventModal && <EventModal />}

        <div className="h-screen flex flex-col">
          {/* Header du calendrier */}
          <CalendarHeader />
          
          <div className="flex flex-1">
            {/* Sidebar et affichage du mois */}
            <Sidebar />
            <Month month={currentMonth} />
          </div>
          <footer className="flex items-center justify-between p-4 shadow-md"></footer>
        </div>
    </>
  );
};

export default CalendarPage;
