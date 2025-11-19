import z from "zod";

const languageObj = z.object({
  language: z.string().default(""),
  fluency: z.string().default(""),
});

export const languages = z.array(languageObj).default([]);

export type Language = z.infer<typeof languageObj>;
