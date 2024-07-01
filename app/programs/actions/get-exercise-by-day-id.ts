"use server";

import { db } from "@/server";
import { exercises } from "@/server/schema";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";

export const getExerciseByDayId = async ({ dayId }: { dayId: string }) => {
  const exerciseData = await db.query.exercises.findMany({
    with: {
      sets: {
        orderBy: (sets, { asc }) => [asc(sets.created)],
      },
      day: {
        with: {
          week: {
            with: {
              workout: true,
            },
          },
        },
      },
    },
    where: eq(exercises.dayId, dayId),
  });

  if (!exerciseData) throw new Error("No exercises found");

  revalidatePath("/dashboard/programs");
  return exerciseData;
};
