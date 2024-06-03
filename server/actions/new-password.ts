"use server";

import { NewPasswordSchema } from "@/types/new-password-schema";
import { createSafeActionClient } from "next-safe-action";
import { getPasswordResetTokenByToken } from "./tokens";
import { db } from "..";
import { eq } from "drizzle-orm";
import { passwordResetTokens, users } from "../schema";
import bcrypt from "bcrypt";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const action = createSafeActionClient();

export const newPassword = action(
  NewPasswordSchema,
  async ({ password, token }) => {
    const pool = new Pool({
      connectionString: process.env.DRIZZLE_DATABASE_URL,
    });
    const dbPool = drizzle(pool);
    // check the token
    if (!token) {
      return { error: "Token is required" };
    }

    // We need to check if the token is valid
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { error: "Token not found" };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Token has expired" };
    }
    // If the token is valid, we update the user's password
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // set new password and remove the token
    // we need to use a transaction here to ensure that all operations are successful

    // the tx is the context, in this case the database
    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    });

    return { success: "Password updated" };
  }
);
