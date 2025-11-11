import { create } from "zustand";
import { resume, Resume, Basics, basics, metadata } from "@schemas";

interface ResumeStore {
  resume: Resume;
  reset: () => void;

  updateBasics: (data: Basics) => void;
  addBasicsCustomField: (field: { key: string, value: string }) => void;
  updateBasicsCustomField: (field: { idx: number, key: string, value: string }) => void;
  removeBasicsCustomField: (idx: number) => void;

  // other sections
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: resume.parse({
    basics: basics.parse({}),
    metadata: metadata.parse({}),
  }),

  updateBasics: (data: Basics) => set(state => {
    return {
      resume: {
        ...state.resume,
        basics: data
      }
    }
  }),

  addBasicsCustomField: (field: { key: string, value: string }) => set(state => {
    return {
      resume: {
        ...state.resume,
        basics: {
          ...state.resume.basics,
          customFields: [...state.resume.basics.customFields, field]
        }
      }
    }
  }),

  updateBasicsCustomField: (field: { idx: number, key: string, value: string }) => set(state => {
    return {
      resume: {
        ...state.resume,
        basics: {
          ...state.resume.basics,
          customFields: state.resume.basics.customFields.map((item, i) => i === field.idx ? field : item)
        }
      }
    }
  }),

  removeBasicsCustomField: (idx: number) => set(state => {
    return {
      resume: {
        ...state.resume,
        basics: {
          ...state.resume.basics,
          customFields: state.resume.basics.customFields.filter((_, i) => i !== idx)
        }
      }
    }
  }),

  reset: () => set({
    resume: resume.parse({})
  })
}));