import { create } from "zustand";
import { Education } from "@schemas";

interface EducationStore {
  store: Education[];
  add: (e: Education) => void;
  remove: (idx: number) => void;
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

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  })
}));