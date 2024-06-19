"use server";

import { setSchema } from "./../../types/set-schema";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { exercises, sets } from "../schema";

const action = createSafeActionClient();

type SetSchema = {
  id?: string;
  exerciseId: string;
  setNumber: string;
  weight: string;
  reps: string;
};

export const createSet = action(
  setSchema,
  async ({ id, exerciseId, setNumber, weight, reps }: SetSchema) => {
    const day = await db.query.days.findFirst({
      where: eq(sets.id, id as string),
      with: {
        exercises: {
          with: { sets: true },
        },
      },
    });
    try {
      // if wanted to test the error handling, we can throw an error
      // throw new Error("Not implemented");
      // check if the workout already exists
      if (id) {
        // update the workout
        const existingSet = await db
          .update(sets)
          .set({
            setNumber,
            weight,
            reps,
          })
          // checking if the set id is equal to the id passed in
          .where(eq(sets.id, id))
          .returning();
        // we call existingWorkout[0] to get the first item in the array, as update(workouts) returns an array
        revalidatePath(
          `/dashboard/day/${day?.id}/exercise/${existingSet[0].exerciseId}`
        );
        return { success: `Set ${existingSet[0].setNumber} updated` };
      }
      // create the exercise
      const newSet = await db
        .insert(sets)
        .values({
          setNumber,
          weight,
          reps,
          exerciseId,
        })
        // we need to use returning() to get the new exercie
        .returning();

      revalidatePath(
        `/dashboard/day/${day?.id}/exercise/${newSet[0].exerciseId}`
      );

      return { success: `Set ${newSet[0].setNumber} created` };
    } catch (error) {
      return { error: `Failed to create set ${error}` };
    }
  }
);
