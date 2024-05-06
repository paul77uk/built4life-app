## Schema And Migrations

import `dotenv` if not already installed:

```bash
npm i dotenv
```

We are going to test our db is set up right by setting up a schema, which we will need eventually.
in the `server` folder create a file called `schema.ts`

This is the code we can use to create a basic `users` table, paste this into the `schema.ts` file:

```bash
import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  name: text('name')
})
```

To use the table we need to go back to our `index.ts` file in the `server` folder.
we need to add:

```bash
import \* as schema from './schema';
```

and then alter the last line to:

```bash
const db = drizzle(sql, { schema, logger: true });
```

Then in the root of our project we create a file name `drizzle.config.ts` and add this code:

```bash
import type { Config } from "drizzle-kit";
import \* as dotenv from "dotenv";

dotenv.config({
path: ".env.local",
});

export default {
schema: "./server/schema.ts",
out: "./server/migrations",
driver: "pg",
dbCredentials: {
connectionString: process.env.DRIZZLE_DATABASE_URL!,
},
} satisfies Config;
```

we go to out `package.json` file to add some scripts to work with drizzle-kit.
we add these to lines in the scripts section under the `"lint": "next lint",`:

```bash
"db:generate": "drizzle-kit generate:pg --config drizzle.config.ts",
"db:push": "drizzle-kit push:pg --config drizzle.config.ts"
```

then in our terminal we run:

```bash
npm run db:generate
```

which should create a `migrations` folder in our `server` folder, which has a a sql file which creates the table
then run:

```bash
npm run db:push
```

it's reccomended to open a second terminal, preferably in vscode. So you can always have you server running on npm run dev on the one terminal on localhost:3000.
then in the second terminal run:

```bash
npx drizzle-kit studio
```

Then you can go to [https://local.drizzle.studio/]

There you should see the users table
