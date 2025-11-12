import z from "zod";

export const education = z.array(z.object({
  institution: z.string().default(""),
  url: z.url().default(""),
  area: z.string().default(""),
  studyType: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  score: z.float32().default(4.0),
}));

export type Education = z.infer<typeof education>