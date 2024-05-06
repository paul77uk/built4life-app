## next-auth installation

I am advised in the tutorial I am following to install the same version, as there has been 702 versions to date and they keep changing things. You may be able to figure things out later on, but for now learning I will follow the same as the tutorial.

```bash
npm i next-auth@5.0.0-beta.16
```

then we install the drizzle adapter from https://authjs.dev/getting-started/adapters/drizzle:

```bash
npm i @auth/drizzle-adapter
```

back in out `server` folder in the `schema.ts` file, we will replace the contents of the file with the following:

```bash
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
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
)
```

in the `server` folder create an `auth.ts` file and add the following and set up our providers:

```bash
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
})
```

then go to our `.env.local` file and under our `DRIZZLE_DATABASE_URL=` add:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

in the `server` folder in the `index.ts` file i didn't add the export before `const db = drizzle(sql, { schema, logger: true });` so it should be:

```bash
export const db = drizzle(sql, { schema, logger: true });
```
