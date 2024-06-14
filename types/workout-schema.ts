import { z } from "zod";

export const workoutSchema = z.object({
  // id: z.string().optional(),
  title: z.string().min(1).max(50),
  totalWeeks: z.coerce.number().positive(),
  // userId: z.string()
});
