import { create } from "zustand";
import { Skill } from "@schemas";

interface SkillStore {
  store: Skill[];
  reset: () => void;
  replace: (skills: Skill[]) => void;
  add: (s: Skill) => void;
  remove: (idx: number) => void;
  update: (idx: number, s: Skill) => void;
}

export const useSkillStore = create<SkillStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (s: Skill) => set(state => {
    return {
      store: [
        ...state.store,
        s
      ]
    }
  }),

  update: (idx: number, s: Skill) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? s : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (skills: Skill[]) => set(state => {
    return {
      store: skills
    }
  })
}));
