import { create } from "zustand";
import { Publication } from "@schemas";

interface PublicationStore {
  store: Publication[];
  reset: () => void;
  replace: (publications: Publication[]) => void;
  add: (p: Publication) => void;
  remove: (idx: number) => void;
  update: (idx: number, p: Publication) => void;
}

export const usePublicationStore = create<PublicationStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (p: Publication) => set(state => {
    return {
      store: [
        ...state.store,
        p
      ]
    }
  }),

  update: (idx: number, p: Publication) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? p : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (publications: Publication[]) => set(state => {
    return {
      store: publications
    }
  })
}));
