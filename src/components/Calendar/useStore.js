import dayjs from "dayjs";
import { create } from "zustand";

// Initialize events from localStorage
function initEvents() {
  if (typeof window !== "undefined") {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
  return [];
}

const useStore = create((set, get) => ({
  monthIndex: dayjs().month(),
  smallCalendarMonth: null,
  daySelected: dayjs(),
  showEventModal: false,
  selectedEvent: null,
  savedEvents: initEvents(), // Initialize with events from localStorage
  filteredEvents: [], // Initialize an empty array for filtered events
  labels: [],
  accounts: ["Facebook", "Instagram", "LinkedIn"], // Liste des comptes
  selectedAccount: null,
  tags: [], // Liste des tags

  setSelectedAccount: (account) => set({ selectedAccount: account }),
  
  addTag: (tag) => set((state) => ({
    tags: [...state.tags, tag]
  })),
  
  removeTag: (tagToRemove) => set((state) => ({
    tags: state.tags.filter(tag => tag !== tagToRemove)
  })),
  
  // Methods to update state
  setMonthIndex: (index) => set((state) => {
    if (state.monthIndex !== index) {
      return { monthIndex: index };
    }
  }),

  setSmallCalendarMonth: (index) => set({ smallCalendarMonth: index }),
  setDaySelected: (day) => set({ daySelected: day }),
  setShowEventModal: (show) => set({ showEventModal: show }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  // Dispatch events to add, update or delete events
  dispatchCalEvent: (event) => {
    set((state) => {
      let newEvents;

      switch (event.type) {
        case 'push':
          newEvents = [...state.savedEvents, event.payload];
          break;
        case 'update':
          newEvents = state.savedEvents.map((evt) =>
            evt.id === event.payload.id ? event.payload : evt
          );
          break;
        case 'delete':
          newEvents = state.savedEvents.filter((evt) => evt.id !== event.payload.id);
          return { savedEvents: newEvents, selectedEvent: null };
        default:
          throw new Error();
      }

      // Update localStorage when events change
      localStorage.setItem("savedEvents", JSON.stringify(newEvents));

      return { savedEvents: newEvents };
    });

    // Update filtered events after dispatching a new event
    get().setFilteredEvents();
  },

  // Set labels for event filtering
  setLabels: (newLabels) => {
    set({ labels: newLabels });
    // Update filtered events when labels change
    get().setFilteredEvents();
  },

  // Update specific label
  updateLabel: (label) => {
    set((state) => ({
      labels: state.labels.map((lbl) => (lbl.label === label.label ? label : lbl)),
    }));
    // Update filtered events when a label is updated
    get().setFilteredEvents();
  },

  // Method to filter events based on selected labels
  setFilteredEvents: () => {
    const { savedEvents, labels } = get();
    const filtered = savedEvents.filter((evt) =>
      labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label).includes(evt.label)
    );
    set({ filteredEvents: filtered });
  },
}));

export default useStore;
