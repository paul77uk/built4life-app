"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server";
import { exercises } from "@/server/schema";
import { Exercises } from "@/lib/infer-types";
import { zExerciseSchema } from "@/types/exercise-schema";

const action = createSafeActionClient();

export const deleteExercise = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    try {
      const data = await db
        .delete(exercises)
        .where(eq(exercises.id, id))
        .returning();

      const day = await db.query.days.findFirst({
        // the day has an exercise join, so this will find the day with the exercise id equal to the id passed in
        where: eq(exercises.id, id),
        with: {
          exercises: {
            with: { sets: true },
          },
        },
      });

      revalidatePath("/programs");
      return { success: `${data[0].name} deleted` };
    } catch (error) {
      return { error: "Failed to delete Exercise" };
    }
  }
);
