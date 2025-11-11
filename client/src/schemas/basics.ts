import z from "zod";

export const basics = z.object({
  name: z.string().default(""),
  label: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  url: z.string().default(""),
  summary: z.string().default(""),
  location: z.string().default(""),
  customFields: z.array(z.object({
    key: z.string().default(""),
    value: z.string().default(""),
  })).default([]),
})

export type Basics = z.infer<typeof basics>