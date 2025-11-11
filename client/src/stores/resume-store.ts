import { create } from "zustand";

interface Resume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    customFields: {
      key: string;
      value: string;
    }[];
  };
  experience: any[];
  education: any[];
  skills: any[];
}

interface ResumeStore {
  resume: Resume;
  reset: () => void;

  updatePersonalInfo: (data: Resume["personalInfo"]) => void;
  addPersonalInfoCustomField: (field: { key: string, value: string }) => void;
  updatePersonalInfoCustomField: (field: { idx: number, key: string, value: string }) => void;
  removePersonalInfoCustomField: (idx: number) => void;

  addExperience: (item: any) => void;

  addEducation: (item: any) => void;

  addSkill: (item: any) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      customFields: []
    } as Resume["personalInfo"],
    experience: [] as Resume["experience"],
    education: [] as Resume["education"],
    skills: [] as Resume["skills"]
  },

  updatePersonalInfo: (data: any) => set(state => {
    return {
      resume: {
        ...state.resume,
        personalInfo: data
      }
    }
  }),

  addPersonalInfoCustomField: (field: { key: string, value: string }) => set(state => {
    return {
      resume: {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          customFields: [...state.resume.personalInfo.customFields, field]
        }
      }
    }
  }),

  updatePersonalInfoCustomField: (field: { idx: number, key: string, value: string }) => set(state => {
    return {
      resume: {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          customFields: state.resume.personalInfo.customFields.map((item, i) => i === field.idx ? field : item)
        }
      }
    }
  }),

  removePersonalInfoCustomField: (idx: number) => set(state => {
    return {
      resume: {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          customFields: state.resume.personalInfo.customFields.filter((_, i) => i !== idx)
        }
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

  reset: () => set({
    resume: {
      personalInfo: {} as Resume["personalInfo"],
      experience: [] as Resume["experience"],
      education: [] as Resume["education"],
      skills: [] as Resume["skills"]
    }
  })
}));