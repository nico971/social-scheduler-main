"use client"
import React from "react";
import useStore from "./useStore";
import { Plus } from 'lucide-react';

export default function CreateEventButton() {
  const setShowEventModal = useStore((state) => state.setShowEventModal);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border border-green-500 text-green-500 rounded-lg py-2 px-4 hover:bg-green-500 hover:text-white transition duration-200 shadow-md hover:shadow-2xl"
    >
      <div className="flex items-center">
      <span className=" pl-4 pr-4"> Create</span>
      <Plus />

      </div>
    </button>
  );
}
