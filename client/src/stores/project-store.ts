import { create } from "zustand";
import { Project } from "@schemas";

interface ProjectsStore {
  store: Project[];
  reset: () => void;
  replace: (projects: Project[]) => void;
  add: (p: Project) => void;
  remove: (idx: number) => void;
  update: (idx: number, p: Project) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

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
  }),

  replace: (projects: Project[]) => set(state => {
    return {
      store: projects
    }
  })
}))