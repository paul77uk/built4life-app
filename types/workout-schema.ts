import { z } from "zod";

export const workoutSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(50),
});
