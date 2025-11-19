import z from "zod";

const publicationObj = z.object({
  name: z.string().default(""),
  publisher: z.string().default(""),
  releaseDate: z.string().default(""),
  url: z.string().url().optional().or(z.literal("")),
  summary: z.string().default(""),
});

export const publications = z.array(publicationObj).default([]);

export type Publication = z.infer<typeof publicationObj>;
