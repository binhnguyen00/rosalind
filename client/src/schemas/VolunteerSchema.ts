import z from "zod";

const volunteerObj = z.object({
  organization: z.string(),
  position: z.string(),
  url: z.url(),
  startDate: z.string(),
  endDate: z.string(),
  summary: z.string(),
});

export const volunteer = z.array(volunteerObj).default([]);

export type Volunteer = z.infer<typeof volunteerObj>;