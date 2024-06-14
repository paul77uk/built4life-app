"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { exercises } from "../schema";

export const getExerciseByDayId = async ({ dayId }: { dayId: string }) => {
  const exerciseData = await db.query.exercises.findMany({
    with: {
      sets: true,
    },
    where: eq(exercises.dayId, dayId),
  });

  if (!exerciseData) throw new Error("No exercises found");

  return exerciseData;
};
