import z from "zod";

const workObj = z.object({
  name: z.string().default(""),
  position: z.string().default(""),
  url: z.url().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  summary: z.string().default(""),
})

export const work = z.array(workObj).default([]);

export type Work = z.infer<typeof workObj>