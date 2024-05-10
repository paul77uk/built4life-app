## Email Token

https://authjs.dev/getting-started/adapters/drizzle

In `server/schema.ts` at the bottom add:

```typescript
export const emailTokens = pgTable(
  "email_tokens",
  {
    id: text("id").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);
```

`npm run db:generate`

If asks, choose create table as that's what we are doing and not renaming another table.

`npm run db:push`

When refreshing drizzle studio I had `Drizzle Studio requires a new version of Drizzle Kit Please install the latest version and try again.`

`npm i drizzle-kit@latest -D`

we may need to do `npx drizzle-kit studio` in that terminal, if it doesn't show in drizzle studio.

I had an error after this ` Invalid input  Please specify 'dialect' param in config, either of 'pg', 'mysql' or 'sqlite'`

I went here: https://orm.drizzle.team/kit-docs/config-reference#configuration

And then altered the file to this:

```typescript
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});
```
