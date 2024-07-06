import { z } from "zod";

export const setSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string(),
  setNumber: z.number(),
  weight: z.string(),
  reps: z.string(),
});
