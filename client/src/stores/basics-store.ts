import { create } from "zustand";
import { Basics, basics } from "@schemas";

interface BasicsStore {
  store: Basics;
  reset: () => void;
  update: (data: Basics) => void;
  addCustomField: (field: { key: string, value: string }) => void;
  updateCustomField: (field: { idx: number, key: string, value: string }) => void;
  removeCustomField: (idx: number) => void;
}

export const useBasicsStore = create<BasicsStore>((set) => ({
  store: basics.parse({}),
  reset: () => set({ store: basics.parse({}) }),

  update: (data: Basics) => set(state => {
    return {
      store: {
        ...state.store,
        ...data
      }
    }
  }),

  addCustomField: (field: { key: string, value: string }) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: [...state.store.customFields, field]
      }
    }
  }),

  updateCustomField: (field: { idx: number, key: string, value: string }) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: state.store.customFields.map((item, i) => i === field.idx ? field : item)
      }
    }
  }),

  removeCustomField: (idx: number) => set(state => {
    return {
      store: {
        ...state.store,
        customFields: state.store.customFields.filter((_, i) => i !== idx)
      }
    }
  }),
}));