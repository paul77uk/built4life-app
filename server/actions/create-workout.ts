"use server";

import { workoutSchema } from "@/types/workout-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { workouts, weeks, days } from "../schema";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const createWorkout = action(
  workoutSchema,
  async ({ id, title, totalWeeks }) => {
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
        })
        // we need to use returning() to get the new workout
        .returning();
      revalidatePath("/dashboard/workouts");

      // creates the number of weeks inputed
      for (let i = 0; i < totalWeeks; i++) {
        const newWeek = await db
          .insert(weeks)
          .values({
            number: String(i + 1),
            workoutId: newWorkout[0].id,
          })
          .returning();

        // creates 7 days for each week
        for (let i = 0; i < 7; i++) {
          await db.insert(days).values({
            number: String(i + 1),
            weekId: newWeek[0].id,
          });
        }
      }

      return { success: `${newWorkout[0].title} created` };
    } catch (error) {
      return { error: "Failed to create workout" };
    }
  }
);

