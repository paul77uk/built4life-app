"use server";

import { z } from "zod";

export const workoutSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
});
