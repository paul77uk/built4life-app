"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { exerciseSchema } from "@/types/exercise-schema";
import { exercises, sets } from "../schema";

const action = createSafeActionClient();

export const createExercise = action(
  exerciseSchema,
  async ({ id, name, dayId, workoutId, numSet, weight, reps }) => {
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
        revalidatePath(`/dashboard/day/${workoutId}/exercise/${dayId}`);
        revalidatePath("/dashboard/programs");
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
      revalidatePath(`/dashboard/day/${workoutId}/exercise/${dayId}`);
      revalidatePath("/dashboard/programs");

      return { success: `${newExercise[0].name} created` };
    } catch (error) {
      return { error: `Failed to create exercise ${error}` };
    }
  }
);
