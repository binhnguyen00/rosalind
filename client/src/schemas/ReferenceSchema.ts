import z from "zod";

const referenceObj = z.object({
  name: z.string().default(""),
  reference: z.string().default(""),
});

export const references = z.array(referenceObj).default([]);

export type Reference = z.infer<typeof referenceObj>;
