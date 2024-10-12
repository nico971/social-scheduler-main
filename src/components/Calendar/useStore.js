import { create } from 'zustand';
import dayjs from 'dayjs';

const useStore = create((set) => ({
  monthIndex: dayjs().month(),
  smallCalendarMonth: null,
  daySelected: dayjs(),
  showEventModal: false,
  selectedEvent: null,
  savedEvents: [],
  labels: [],

  setMonthIndex: (index) => set((state) => { if (state.monthIndex !== index) { return { monthIndex: index }; } }),
  setSmallCalendarMonth: (index) => set({ smallCalendarMonth: index }),
  setDaySelected: (day) => set({ daySelected: day }),
  setShowEventModal: (show) => {set({ showEventModal: show })},
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  dispatchCalEvent: (event) => set((state) => {
    switch (event.type) {
      case 'push':
        return { savedEvents: [...state.savedEvents, event.payload] };
      case 'update':
        return {
          savedEvents: state.savedEvents.map((evt) =>
            evt.id === event.payload.id ? event.payload : evt
          ),
        };
      case 'delete':
        return {
          savedEvents: state.savedEvents.filter((evt) => evt.id !== event.payload.id),
        };
      default:
        return state;
    }
  }),
  setLabels: (newLabels) => set({ labels: newLabels }),
}));

export default useStore;
