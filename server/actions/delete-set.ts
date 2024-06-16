"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { sets } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const deleteSet = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    try {
      const data = await db.delete(sets).where(eq(sets.id, id)).returning();

      const day = await db.query.days.findFirst({
        where: eq(sets.id, id),
        with: {
          exercises: {
            with: { sets: true },
          },
        },
      });
      revalidatePath(
        `/dashboard/day/${day?.id}/exercise/${data[0].exerciseId}`
      );
      return { success: `Set ${data[0].setNumber} deleted` };
    } catch (error) {
      return { error: "Failed to delete set" };
    }
  }
);
