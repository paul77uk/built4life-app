"use server";

import { users } from "./../schema";
import { RegisterSchema } from "@/types/register-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import bcrypt from "bcrypt";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    // we hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // we check if the email already exists in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "Email already exists" };
    }

    return { success: "Confirmation Email Sent!" };
  }
);
