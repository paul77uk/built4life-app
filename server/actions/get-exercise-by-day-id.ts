"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { exercises } from "../schema";
import { revalidatePath } from "next/cache";

export const getExerciseByDayId = async ({ dayId }: { dayId: string }) => {
  const exerciseData = await db.query.exercises.findMany({
    with: {
      sets: true,
    },
    where: eq(exercises.dayId, dayId),
  });

  if (!exerciseData) throw new Error("No exercises found");

   revalidatePath("/dashboard/programs");
  return exerciseData;
};
