"use server";

import { SettingsSchema } from "@/types/settings-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const settings = action(SettingsSchema, async (values) => {
  const user = await auth(); // get the user from the session
  if (!user) return { error: "User no found" };

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.user.id), // find the user in the database
  });

  if (!dbUser) return { error: "User not found" };

  // check if user signed in with OAuth/ like Google or Github
  if (user.user.isOAuth) {
    // we can set unused values to undefined as with OAuth we don't use things like password
    values.email = undefined;
  }

  // we update the user with the new password
  await db
    .update(users)
    .set({
      name: values.name,
      email: values.email,
      image: values.image,
    })
    .where(eq(users.id, dbUser.id));
  revalidatePath("/dashboard/settings"); // we revalidate the path so the user can see the changes
  return { success: "Settings updated" };
});
