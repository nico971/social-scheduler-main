import { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]);

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white rounded-lg shadow-lg w-1/3">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <h2 className="text-gray-700">Event Details</h2>
          <button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-gray-600">
            &times;
          </button>
        </header>
        <div className="p-4">
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            required
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="Add a description"
            value={description}
            required
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 mt-2"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-wrap mt-3">
            {labelsClasses.map((lblClass, i) => (
              <span
                key={i}
                onClick={() => setSelectedLabel(lblClass)}
                className={`cursor-pointer rounded-full h-8 w-8 flex items-center justify-center m-1 ${selectedLabel === lblClass ? 'bg-blue-600 text-white' : `bg-${lblClass}-500 text-white`}`}
              >
                {selectedLabel === lblClass && (
                  <span className="material-icons-outlined text-white">check</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <footer className="flex justify-end border-t p-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
