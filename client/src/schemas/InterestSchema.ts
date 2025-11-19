import z from "zod";

const interestObj = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
});

export const interests = z.array(interestObj).default([]);

export type Interest = z.infer<typeof interestObj>;
