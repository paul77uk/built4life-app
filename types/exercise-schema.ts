import { z } from "zod";

export const exerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
  dayId: z.string(),
  workoutId: z.string(),
  numSet: z.string().optional(),
  weight: z.string().optional(),
  reps: z.string().optional(),
});
