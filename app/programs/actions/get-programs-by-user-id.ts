"use server";

import { db } from "@/server";
import { auth } from "@/server/auth";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getProgramsByUserId = async () => {
  const session = await auth();
  // if (!session) throw new Error("Not authenticated");
  if (!session) return null;
  const user = session.user;

  const workoutData = await db.query.workouts.findMany({
    // only want the signed in users workout at this point
    where: eq(workouts.userId, user.id),
    orderBy: (workouts, { asc }) => [asc(workouts.created)],
    with: {
      weeks: {
        orderBy: (weeks, { asc }) => [asc(weeks.number)],
        with: {
          days: {
            orderBy: (days, { asc }) => [asc(days.number)],
            with: {
              exercises: {
                orderBy: (exercises, { asc }) => [asc(exercises.created)],
                with: {
                  sets: {
                    orderBy: (sets, { asc }) => [asc(sets.created)],
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!workoutData) throw new Error("No workout found");

  revalidatePath("/programs");

  return workoutData;
};
