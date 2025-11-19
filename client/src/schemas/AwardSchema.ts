import z from "zod";

const awardObj = z.object({
  title: z.string().default(""),
  date: z.string().default(""),
  awarder: z.string().default(""),
  summary: z.string().default(""),
});

export const awards = z.array(awardObj).default([]);

export type Award = z.infer<typeof awardObj>;
