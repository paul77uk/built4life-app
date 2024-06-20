import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { accounts, users, verificationTokens } from "./schema";
import Resend from "next-auth/providers/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Github({ allowDangerousEmailAccountLinking: true }),
    Resend({
      from: "info@built4.life",
    }),
  ],
});
