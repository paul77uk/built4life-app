import { z } from "zod";

export const setSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string(),
  setNumber: z.coerce.number(),
  weight: z.string(),
  reps: z.string(),
});

export type zSetSchema = z.infer<typeof setSchema>;