import { create } from "zustand";

interface Resume {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
}

interface ResumeStore {
  resume: Resume;
  updatePersonalInfo: (data: any) => void;
  addExperience: (item: any) => void;
  addEducation: (item: any) => void;
  addSkill: (item: any) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: {
    personalInfo: {},
    experience: [],
    education: [],
    skills: []
  },

  updatePersonalInfo: (data: any) => set(state => {
    return {
      resume: {
        ...state.resume,
        personalInfo: data
      }
    }
  }),

  addExperience: (item: any) => set(state => ({
    resume: {
      ...state.resume,
      experience: [...state.resume.experience, item]
    }
  })),

  addEducation: (item: any) => set(state => ({
    resume: {
      ...state.resume,
      education: [...state.resume.education, item]
    }
  })),

  addSkill: (item: any) => set(state => ({
    resume: {
      ...state.resume,
      skills: [...state.resume.skills, item]
    }
  })),

  reset: () => set({ resume: {} as Resume })
}));