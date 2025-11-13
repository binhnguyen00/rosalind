import { create } from "zustand";
import * as stores from "@stores";
import {
  Metadata, resume, metadata,
  Basics, Education, Work, Project
} from "@schemas";

interface Resume {
  basics: Basics;
  educations: Education[];
  works: Work[];
  projects: Project[];
}

interface ResumeStore {
  metadata: Metadata;
  updateTemplate: (t: string) => void;
  getInstance: () => Resume;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  metadata: metadata.parse({}),

  updateTemplate: (t: string) => set({
    metadata: {
      ...resume.parse({}).metadata,
      template: t
    }
  }),

  getInstance: () => {
    const basics = stores.useBasicsStore(state => state.store);
    const educations = stores.useEducationStore(state => state.store);
    const works = stores.useWorkStore(state => state.store);
    const projects = stores.useProjectStore(state => state.store);

    return {
      basics: basics,
      educations: educations,
      works: works,
      projects: projects
    } as Resume;
  }
}));