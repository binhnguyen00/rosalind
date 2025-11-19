import z from "zod";

const skillObj = z.object({
  name: z.string().default(""),
  level: z.string().default(""),
  description: z.string().default(""),
});

export const skills = z.array(skillObj).default([]);

export type Skill = z.infer<typeof skillObj>;
