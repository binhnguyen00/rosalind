import z from "zod";

const certificateObj = z.object({
  name: z.string().default(""),
  date: z.string().default(""),
  issuer: z.string().default(""),
  url: z.string().url().optional().or(z.literal("")),
});

export const certificates = z.array(certificateObj).default([]);

export type Certificate = z.infer<typeof certificateObj>;
