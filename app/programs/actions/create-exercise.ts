"use server";

import { createSafeActionClient } from "next-safe-action";

import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { exerciseSchema } from "@/types/exercise-schema";
import { db } from "@/server";
import { exercises, sets } from "@/server/schema";

const action = createSafeActionClient();

export const createExercise = action(
  exerciseSchema,
  async ({ id, name, dayId, numSet, weight, reps }) => {
    try {
      // if wanted to test the error handling, we can throw an error
      // throw new Error("Not implemented");
      // check if the workout already exists
      if (id) {
        // update the workout
        const existingExercise = await db
          .update(exercises)
          .set({
            name,
            dayId,
          })
          .where(eq(exercises.id, id))
          .returning();
        // we call existingWorkout[0] to get the first item in the array, as update(workouts) returns an array
        revalidatePath(`/programs/exercise/${dayId}`);
        return { success: `${existingExercise[0].name} updated` };
      }
      // create the exercise
      const newExercise = await db
        .insert(exercises)
        .values({
          name,
          dayId,
        })
        // we need to use returning() to get the new exercie
        .returning();

      for (let i = 0; i < +numSet!; i++) {
        await db
          .insert(sets)
          .values({
            setNumber: String(i + 1),
            weight,
            reps,
            exerciseId: newExercise[0].id,
          })
          .returning();
      }

      // revlidatePath doesn't work when called from a client component, s we will use invalidateQueries from Tanstack query instead, in the client component
      // revalidatePath("/programs");
      revalidatePath(`/programs/exercise/${dayId}`);
      return { success: `${newExercise[0].name} created` };
    } catch (error) {
      return { error: `Failed to create exercise ${error}` };
    }
  }
);
