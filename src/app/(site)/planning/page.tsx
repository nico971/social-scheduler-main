"use client";
import React, { useState, useEffect } from "react";
import ToasterContext from "@/app/api/contex/ToasetContex";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { authOptions } from "@/utils/auth"; // Chemin vers tes options NextAuth
import { getServerSession } from "next-auth/next";
import { getMonth } from "@/utils/dayjs";
import Sidebar from "@/components/Calendar/Sidebar";
import Month from "@/components/Calendar/Month";
import EventModal from "@/components/Calendar/EventModal";
import useStore from "@/components/Calendar/useStore"; // Import du store Zustand

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
