"use server";

import { SettingsSchema } from "@/types/settings-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import bcrypt from "bcrypt";
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
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // if there is a password and a new password and there is a user with a password already in the database
  if (values.password && values.newPassword && dbUser.password) {
    // we check if the password matches
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) return { error: "Password Incorrect" };

    // if the password matches
    const samePassword = await bcrypt.compare(
      values.newPassword,
      dbUser.password
    );
    // we make it so the uses new password can't be the same as the old password
    if (samePassword)
      return { error: "New password is the same as the old password" };

    // we hash the new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    // then we set the password to the new hashed password
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // we update the user with the new password
  await db
    .update(users)
    .set({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
      twoFactorEnabled: values.isTwoFactorEnabled,
    })
    .where(eq(users.id, dbUser.id));
  revalidatePath("/dashboard/settings"); // we revalidate the path so the user can see the changes
  return { success: "Settings updated" };
});
