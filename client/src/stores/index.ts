import { create } from "zustand";
import { Metadata, resume, metadata } from "@schemas";

interface ResumeStore {
  metadata: Metadata;
  updateTemplate: (t: string) => void;
}

const useResumeStore = create<ResumeStore>((set) => ({
  metadata: metadata.parse({}),
  updateTemplate: (t: string) => set({
    metadata: {
      ...resume.parse({}).metadata,
      template: t
    }
  })
}));

export { useResumeStore };
export { useBasicsStore } from "./basics-store";
export { useEducationStore } from "./education-store";