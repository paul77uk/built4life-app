import { z } from "zod";

export const setSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string(),
  setNumber: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  reps: z.coerce.number().positive(),
});
