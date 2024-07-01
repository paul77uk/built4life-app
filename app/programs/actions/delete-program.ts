'use server'

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/server";
import { workouts } from "@/server/schema";

const action = createSafeActionClient();

export const deleteProgram = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    try {
      const data = await db.delete(workouts).where(eq(workouts.id, id)).returning();
      revalidatePath("/dashboard/workouts");
       revalidatePath("/dashboard/programs");
      return { success: `Workout ${data[0].title} deleted` };
    } catch (error) {
      return { error: "Failed to delete workout" };
    }
  }
);