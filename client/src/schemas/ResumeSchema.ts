import z from "zod";
import {
  basics,
  work,
  education,
  volunteer,
  awards,
  certificates,
  publications,
  skills,
  interests,
  references,
  project,
  languages,
} from "@schemas";

export const metadata = z.object({
  template: z.string().default("default"),
})

export const resume = z.object({
  id: z.string().optional().default(""),
  metadata: metadata,

  basics: basics,
  work: work,
  education: education,
  volunteer: volunteer,
  awards: awards,
  certificates: certificates,
  publications: publications,
  skills: skills,
  languages: languages,
  interests: interests,
  references: references,
  projects: project,
});

export type Resume = z.infer<typeof resume>;
export type Metadata = z.infer<typeof metadata>;