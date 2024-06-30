"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { weeks } from "../schema";
import { revalidatePath } from "next/cache";

export const getWeeksByWorkoutId = async ({
  workoutId,
}: {
  workoutId: string;
}) => {
  const weeksData = await db.query.weeks.findMany({
    with: {
      days: true,
    },
    where: eq(weeks.workoutId, workoutId),
  });

  if (!weeksData) throw new Error("No exercises found");

  revalidatePath('/dashboard/programs/');

  return weeksData;
};
