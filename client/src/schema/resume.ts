import z from "zod";
import { Basics, basics } from "@schema";

export const resume = z.object({
  basics: basics,
  work: z.array(z.object({} as any)).default([]),
  volunteer: z.array(z.object({} as any)).default([]),
  education: z.array(z.object({} as any)).default([]),
  awards: z.array(z.object({} as any)).default([]),
  certificates: z.array(z.object({} as any)).default([]),
  publications: z.array(z.object({} as any)).default([]),
  skills: z.array(z.object({} as any)).default([]),
  languages: z.array(z.object({} as any)).default([]),
  interests: z.array(z.object({} as any)).default([]),
  references: z.array(z.object({} as any)).default([]),
  projects: z.array(z.object({} as any)).default([]),
});

export type Resume = z.infer<typeof resume>;