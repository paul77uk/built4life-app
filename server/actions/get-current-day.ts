"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { days} from "../schema";
import { revalidatePath } from "next/cache";

export const getDayById = async ({ weekId }: { weekId: string }) => {
  const daysData = await db.query.days.findMany({
    where: eq(days.weekId, weekId),
  });

  if (!daysData) throw new Error("No days found");

  revalidatePath('/dashboard/programs/');

  return daysData;
};
