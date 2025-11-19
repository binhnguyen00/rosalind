import { create } from "zustand";
import { Award } from "@schemas";

interface AwardStore {
  store: Award[];
  reset: () => void;
  replace: (awards: Award[]) => void;
  add: (a: Award) => void;
  remove: (idx: number) => void;
  update: (idx: number, a: Award) => void;
}

export const useAwardStore = create<AwardStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (a: Award) => set(state => {
    return {
      store: [
        ...state.store,
        a
      ]
    }
  }),

  update: (idx: number, a: Award) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? a : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (awards: Award[]) => set(state => {
    return {
      store: awards
    }
  })
}));
