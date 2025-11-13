import { create } from "zustand";
import { Work } from "@schemas";

interface WorkStore {
  store: Work[];
  add: (w: Work) => void;
  remove: (idx: number) => void;
  update: (idx: number, w: Work) => void;
}

export const useWorkStore = create<WorkStore>((set) => ({
  store: [],

  add: (w: Work) => set(state => {
    return {
      store: [
        ...state.store,
        w
      ]
    }
  }),

  update: (idx: number, w: Work) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? w : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  })
}))