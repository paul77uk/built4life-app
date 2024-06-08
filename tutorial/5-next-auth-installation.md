## next-auth installation

I am advised in the tutorial I am following to install the same version, as there has been 702 versions to date and they keep changing things. You may be able to figure things out later on, but for now learning I will follow the same as the tutorial.

```bash
npm i next-auth@5.0.0-beta.19
```

then we install the drizzle adapter from https://authjs.dev/getting-started/adapters/drizzle:

The drizzle adapter is from the link, you could click on PostreSQL and copy and paste it from there into out schema.ts file.

Mine may be slightly different, so I will pasted it below
I commneted out the workouts table, as that issomething we will add later

I think we already have the drizzle-adapter now, we would normally install it as this point. But there were breaking changes with new versions so I had to get the right one. The one I have I know works for now.

```bash
npm i @auth/drizzle-adapter
```

back in out `server` folder in the `schema.ts` file, we will replace the contents of the file with the following:

```bash
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verficationToken) => ({
    compositePk: primaryKey({
      columns: [verficationToken.identifier, verficationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

// export const workouts = pgTable("workout", {
//   id: serial("id").primaryKey(),
//   title: text("title"),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   created: timestamp("created").defaultNow(),
// });

```
These are comments I put in the file when I wrote the code, with the use of copilot, to help me understand:

`defaultFn: () => crypto.randomUUID() is a function that generates a random UUID for the id column
uuid's are used to uniquely identify a user, this is a common practice in databases, the id's are longer and harder to guess than a simple number, they use a combination of numbers and letters.
serial would be a simple number that increments by 1 each time a new user is created, but we want more security so we use a UUID
a primary key is a unique identifier for a row in a table, it is used to uniquely identify, it differs from a normal id in that it is unique and cannot be duplicated`

in the `server` folder create an `auth.ts` file and add the following and set up our providers:

```bash
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
    // Resend({
    //   from: "info@built4.life",
    // }),
  ],
});
```

I commented out the resend for now, as I don't think we'll need it until we add magic link.

then go to our `.env.local` file and under our `DRIZZLE_DATABASE_URL=` add:

```bash
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET
```

in the `server` folder in the `index.ts` file i didn't add the export before `const db = drizzle(sql, { schema, logger: true });` so it should be:

```bash
export const db = drizzle(sql, { schema, logger: true });
```
