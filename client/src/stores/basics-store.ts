import { create } from "zustand";
import { Basics, basics } from "@schemas";

interface BasicsStore {
  store: Basics;
  reset: () => void;
  updateBasics: (data: Basics) => void;
  addBasicsCustomField: (field: { key: string, value: string }) => void;
  updateBasicsCustomField: (field: { idx: number, key: string, value: string }) => void;
  removeBasicsCustomField: (idx: number) => void;
}

export const useBasicsStore = create<BasicsStore>((set) => ({
  store: basics.parse({}),
  reset: () => set({ store: basics.parse({}) }),

  // basics
  updateBasics: (data: Basics) => set(state => {
    return {
      store: {
        ...state.store,
        ...data
      }
    }
  }),

  addBasicsCustomField: (field: { key: string, value: string }) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: [...state.store.customFields, field]
      }
    }
  }),

  updateBasicsCustomField: (field: { idx: number, key: string, value: string }) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: state.store.customFields.map((item, i) => i === field.idx ? field : item)
      }
    }
  }),

  removeBasicsCustomField: (idx: number) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: state.store.customFields.filter((_, i) => i !== idx)
      }
    }
  }),
}));