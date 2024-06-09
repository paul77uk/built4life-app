"use server";

import { workoutSchema } from "@/types/workout-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { workouts } from "../schema";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const createWorkout = action(
  workoutSchema,
  async ({ id, title, weeks }) => {
    const session = await auth();
    const user = session?.user; // get the user from the session
    try {
      // if wanted to test the error handling, we can throw an error
      // throw new Error("Not implemented");
      // check if the workout already exists
      if (id) {
        // update the workout
        const existingWorkout = await db
          .update(workouts)
          .set({
            title,
            weeks,
          })
          .where(eq(workouts.id, id))
          .returning();
        // we call existingWorkout[0] to get the first item in the array, as update(workouts) returns an array
        return { success: `${existingWorkout[0].title} updated` };
      }
      // create the workout
      const newWorkout = await db
        .insert(workouts)
        .values({
          userId: user?.id as string,
          title,
          weeks,
        })
        // we need to use returning() to get the new workout
        .returning();
      revalidatePath("/dashboard/workouts");
      return { success: `${newWorkout[0].title} created` };
    } catch (error) {
      return { error: "Failed to create workout" };
    }
  }
);
