import { create } from "zustand";
import { Project } from "@schemas";

interface ProjectStore {
  store: Project[];
  add: (p: Project) => void;
  remove: (idx: number) => void;
  update: (idx: number, p: Project) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  store: [],

  add: (p: Project) => set(state => {
    return {
      store: [
        ...state.store,
        p
      ]
    }
  }),

  update: (idx: number, p: Project) => set(state => {
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
  })
}))