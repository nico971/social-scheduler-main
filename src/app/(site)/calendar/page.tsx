"use client"
import React, { useState, useContext, useEffect } from "react";
import ToasterContext from "@/app/api/contex/ToasetContex";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { authOptions } from "@/utils/auth"; // Chemin vers tes options NextAuth
import { getServerSession } from "next-auth/next";
import { getMonth } from "@/utils/dayjs";
import Sidebar from "@/components/Calendar/Sidebar";
import Month from "@/components/Calendar/Month";
import GlobalContext from "@/components/Calendar/GlobalContext";
import ContextWrapper from "@/components/Calendar/ContextWrapper";
import EventModal from "@/components/Calendar/EventModal";

const CalendarPage =  () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
    <React.StrictMode>
      <ContextWrapper>
      <React.Fragment>
        {showEventModal && <EventModal />}

        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </React.Fragment>
        </ContextWrapper>
        </React.StrictMode>
    </>
  );
};

export default CalendarPage;
