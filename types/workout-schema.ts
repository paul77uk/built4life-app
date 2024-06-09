import { use } from "react";
import { z } from "zod";

export const workoutSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(50),
  weeks: z.coerce.number().positive(),
  userId: z.string().optional(),
});
