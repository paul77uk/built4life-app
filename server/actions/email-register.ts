"use server";

import { users } from "./../schema";
import { RegisterSchema } from "@/types/register-schema";
import { and, eq, isNotNull, isNull } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import bcrypt from "bcrypt";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    // we hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // we check if the email already exists in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Email Confirmation resent" };
      }

      return { error: "Email already exists" };
    }

    await db.delete(users).where(and(eq(users.email, email)));

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);
    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

    return { success: "Confirmation Email Sent!" };
  }
);
