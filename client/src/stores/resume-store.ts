import { create } from "zustand";
import * as stores from "@stores"
import {
  Metadata, metadata,
  Basics, Education, Work, Project, Volunteer
} from "@schemas";

interface Resume {
  basics: Basics;
  educations: Education[];
  works: Work[];
  projects: Project[];
  volunteers: Volunteer[];
}

interface ResumeStore {
  id?: string;
  metadata: Metadata;
  reset: () => void;
  updateTemplate: (t: string) => void;
  updateId: (id: string) => void;
  getInstance: () => Resume;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  id: "",
  metadata: metadata.parse({}),

  reset: () => {
    set({
      id: "",
      metadata: metadata.parse({})
    });
    stores.useBasicsStore.getState().reset();
    stores.useEducationStore.getState().reset();
    stores.useWorkStore.getState().reset();
    stores.useProjectsStore.getState().reset();
    stores.useVolunteerStore.getState().reset();
  },

  updateTemplate: (t: string) => {
    return set({
      metadata: {
        ...metadata,
        template: t
      }
    })
  },

  updateId: (id: string) => set({ id: id }),

  getInstance: () => {
    return {
      basics: stores.useBasicsStore(state => state.store),
      educations: stores.useEducationStore(state => state.store),
      works: stores.useWorkStore(state => state.store),
      projects: stores.useProjectsStore(state => state.store),
      volunteers: stores.useVolunteerStore(state => state.store)
    } as Resume;
  },
}));