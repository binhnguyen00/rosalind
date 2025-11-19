import z from "zod";

const interestObj = z.object({
  name: z.string().default(""),
  keywords: z.array(z.string()).default([]),
});

export const interests = z.array(interestObj).default([]);

export type Interest = z.infer<typeof interestObj>;
