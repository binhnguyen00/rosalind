import { create } from "zustand";
import { Interest } from "@schemas";

interface InterestStore {
  store: Interest[];
  reset: () => void;
  replace: (interests: Interest[]) => void;
  add: (i: Interest) => void;
  remove: (idx: number) => void;
  update: (idx: number, i: Interest) => void;
}

export const useInterestStore = create<InterestStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (i: Interest) => set(state => {
    return {
      store: [
        ...state.store,
        { name: i.name, description: i.description } // Corrected: use description instead of keywords
      ]
    }
  }),

  update: (idx: number, i: Interest) => set(state => {
    return {
      store: state.store.map((item, index) => {
        return index === idx ? i : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (interests: Interest[]) => set(state => {
    return {
      store: interests
    }
  })
}));
