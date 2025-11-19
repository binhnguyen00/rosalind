import { create } from "zustand";
import * as stores from "@stores"
import {
  Metadata, metadata,
  Basics, Education, Work, Project, Volunteer, Award, Certificate, Publication, Skill, Interest, Reference, Language
} from "@schemas";

interface Resume {
  basics: Basics;
  educations: Education[];
  works: Work[];
  projects: Project[];
  volunteers: Volunteer[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  interests: Interest[];
  references: Reference[];
  languages: Language[];
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
    stores.useAwardStore.getState().reset();
    stores.useCertificateStore.getState().reset();
    stores.usePublicationStore.getState().reset();
    stores.useSkillStore.getState().reset();
    stores.useInterestStore.getState().reset();
    stores.useReferenceStore.getState().reset();
    stores.useLanguageStore.getState().reset();
  },

  updateTemplate: (t: string) => {
    return set((state) => ({
      metadata: {
        ...state.metadata,
        template: t
      }
    }))
  },

  updateId: (id: string) => set({ id: id }),

  getInstance: () => {
    return {
      basics: stores.useBasicsStore.getState().store,
      educations: stores.useEducationStore.getState().store,
      works: stores.useWorkStore.getState().store,
      projects: stores.useProjectsStore.getState().store,
      volunteers: stores.useVolunteerStore.getState().store,
      awards: stores.useAwardStore.getState().store,
      certificates: stores.useCertificateStore.getState().store,
      publications: stores.usePublicationStore.getState().store,
      skills: stores.useSkillStore.getState().store,
      interests: stores.useInterestStore.getState().store,
      references: stores.useReferenceStore.getState().store,
      languages: stores.useLanguageStore.getState().store
    } as Resume;
  },
}));