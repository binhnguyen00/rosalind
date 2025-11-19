import { create } from "zustand";
import { Reference } from "@schemas";

interface ReferenceStore {
  store: Reference[];
  reset: () => void;
  replace: (references: Reference[]) => void;
  add: (r: Reference) => void;
  remove: (idx: number) => void;
  update: (idx: number, r: Reference) => void;
}

export const useReferenceStore = create<ReferenceStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (r: Reference) => set(state => {
    return {
      store: [
        ...state.store,
        r
      ]
    }
  }),

  update: (idx: number, r: Reference) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? r : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (references: Reference[]) => set(state => {
    return {
      store: references
    }
  })
}));
