import dayjs from "dayjs";
import { MoreVertical, Trash, X } from "lucide-react"; // Importing icons from Lucide React
import { useState } from "react";
import useStore from "./useStore";

const labelsClasses = [
  "bg-indigo-500", 
  "bg-gray-500", 
  "bg-green-500", 
  "bg-blue-500", 
  "bg-red-500", 
  "bg-purple-500"
];

export default function EventModal() {
  const {
    daySelected,
    showEventModal,
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
    accounts, // Comptes disponibles
    selectedAccount, // Compte sélectionné
    setSelectedAccount, // Setter pour le compte
    tags, // Liste des tags
    addTag, // Fonction pour ajouter un tag
    removeTag, // Fonction pour supprimer un tag
  } = useStore();

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [tagInput, setTagInput] = useState(""); // Pour l'ajout de tags

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      account: selectedAccount, // Ajoute le compte à l'événement
      tags: tags, // Ajoute les tags à l'événement
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    dispatchCalEvent({ type: selectedEvent ? "update" : "push", payload: calendarEvent });
    setShowEventModal(false); // Fermer la modal après l'ajout ou la mise à jour
  }

  function handleAddTag(e) {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput)) {
      addTag(tagInput);
      setTagInput(""); // Vide le champ après l'ajout du tag
    }
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

            {/* Liste déroulante pour les comptes */}
            <label className="block text-gray-600">Select Account</label>
            <select
              value={selectedAccount || ""}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select account</option>
              {accounts.map((account, i) => (
                <option key={i} value={account}>
                  {account}
                </option>
              ))}
            </select>

            {/* Champ pour les tags */}
            <div>
              <label className="block text-gray-600">Tags</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddTag}
                >
                  Add Tag
                </button>
              </div>
              {/* Afficher les tags ajoutés */}
              <div className="mt-2 flex flex-wrap">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-gray-200 text-sm rounded-full px-3 py-1 m-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-500"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
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
