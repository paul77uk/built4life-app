"use server";

import { createSafeActionClient } from "next-safe-action";
import { LoginSchema } from "@/types/login-schema";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, async ({ email }) => {
  try {
    // sign in with magic link
    await signIn("resend", {
      email,
      redirect: false,
    });

    return { success: email };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or Password Incorrect" };
        case "AccessDenied":
          return { error: error.message };
        case "OAuthSignInError":
          return { error: error.message };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
});
