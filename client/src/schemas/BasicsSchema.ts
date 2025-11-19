import z from "zod";

const profile = z.object({
  network: z.string().default(""),
  username: z.string().default(""),
  url: z.url().default(""),
});

export const basics = z.object({
  name: z.string().default(""),
  label: z.string().default(""),
  image: z.string().default(""),
  email: z.email().default(""),
  phone: z.string().default(""),
  url: z.url().default(""),
  summary: z.string().default(""),
  location: z.string().default(""),
  profiles: z.array(profile).default([]),
  customFields: z.array(z.object({
    key: z.string().default(""),
    value: z.string().default(""),
  })).default([]),
})

export type Basics = z.infer<typeof basics>
export type Profile = z.infer<typeof profile>