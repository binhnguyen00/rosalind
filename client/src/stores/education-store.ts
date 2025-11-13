import { create } from "zustand";
import { Education } from "@schemas";

interface EducationStore {
  store: Education[];
  add: (e: Education) => void;
  remove: (idx: number) => void;
  update: (idx: number, e: Education) => void;
}

export const useEducationStore = create<EducationStore>((set) => ({
  store: [],

  add: (e: Education) => set(state => {
    return {
      store: [
        ...state.store,
        e
      ]
    }
  }),

  update: (idx: number, e: Education) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? e : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  })
}));