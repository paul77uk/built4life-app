import { z } from "zod";

export const setSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string(),
  setNumber: z.string(),
  weight: z.string(),
  reps: z.string(),
});
