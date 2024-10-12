"use client";
import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <div className="flex flex-col items-center space-y-4 mt-10">
        <CreateEventButton />
        <SmallCalendar />
      </div>
      <Labels />
    </aside>
  );
}
