import { create } from "zustand";
import { Language } from "@schemas";

interface LanguageStore {
  store: Language[];
  reset: () => void;
  replace: (languages: Language[]) => void;
  add: (l: Language) => void;
  remove: (idx: number) => void;
  update: (idx: number, l: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (l: Language) => set(state => {
    return {
      store: [
        ...state.store,
        l
      ]
    }
  }),

  update: (idx: number, l: Language) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? l : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (languages: Language[]) => set(state => {
    return {
      store: languages
    }
  })
}));
