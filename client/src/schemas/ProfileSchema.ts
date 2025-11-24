import z from "zod";

const profileObj = z.object({
  network: z.string().default(""),
  username: z.string().default(""),
  url: z.string().url().optional().or(z.literal("")),
});

export const profiles = z.array(profileObj).default([]);
export type Profile = z.infer<typeof profileObj>;