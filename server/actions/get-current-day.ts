"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { days} from "../schema";

export const getDayById = async ({ id }: { id: string }) => {
  const daysData = await db.query.days.findFirst({
    where: eq(days.id, id),
  });

  if (!daysData) throw new Error("No days found");

  return daysData;
};
