import z from "zod";

const educationObj = z.object({
  institution: z.string().default(""),
  url: z.url().default(""),
  area: z.string().default(""),
  studyType: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  score: z.float32().default(4.0),
})

export const education = z.array(educationObj).default([]);

export type Education = z.infer<typeof educationObj>