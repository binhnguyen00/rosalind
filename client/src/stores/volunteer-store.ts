import { create } from "zustand";
import { Volunteer } from "@schemas";

interface VolunteerStore {
  store: Volunteer[];
  reset: () => void;
  replace: (volunteers: Volunteer[]) => void;
  add: (v: Volunteer) => void;
  remove: (idx: number) => void;
  update: (idx: number, v: Volunteer) => void;
}

export const useVolunteerStore = create<VolunteerStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (v: Volunteer) => set(state => {
    return {
      store: [
        ...state.store,
        v
      ]
    }
  }),

  update: (idx: number, v: Volunteer) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? v : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (volunteers: Volunteer[]) => set(state => {
    return {
      store: volunteers
    }
  })
}))