import z from "zod";

const projectObj = z.object({
  name: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.string().default(""),
  url: z.url().default(""),
})

export const project = z.array(projectObj).default([])

export type Project = z.infer<typeof projectObj>