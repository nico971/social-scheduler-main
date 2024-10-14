"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import useStore from "./useStore";
import { X, Trash, MoreVertical } from "lucide-react"; // Importing icons from Lucide React

const labelsClasses = ["bg-indigo-500", "bg-gray-500", "bg-green-500", "bg-blue-500", "bg-red-500", "purple-500"];

export default function EventModal() {
  const {
    daySelected,
    showEventModal,
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
  } = useStore();

  // Set initial state for the form fields
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  // Handle form submission for saving or updating an event
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(), // Unique ID for new events
    };

    if (selectedEvent) {
      // Update the event if one is selected
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      // Otherwise, push a new event
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false); // Close the modal after saving/updating
  }

  if (!showEventModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form className="bg-white rounded-lg shadow-lg w-1/3" onSubmit={handleSubmit}>
        <header className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <MoreVertical className="text-gray-400" />
          <div className="flex items-center space-x-3">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="cursor-pointer"
              >
                <Trash className="text-gray-400" />
              </span>
            )}
            <button
              onClick={() => setShowEventModal(false)}
              className="flex items-center justify-center text-gray-400"
            >
              <X />
            </button>
          </div>
        </header>
        <div className="p-4">
          <div className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="w-full text-xl font-semibold text-gray-600 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-gray-500">
              {dayjs(daySelected).format("dddd, MMMM DD")}
            </p>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              className="w-full text-gray-600 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex space-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`w-6 h-6 rounded-full ${lblClass} cursor-pointer flex items-center justify-center`}
                >
                  {selectedLabel === lblClass && (
                    <span className="text-white text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end p-4 border-t bg-gray-100">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
