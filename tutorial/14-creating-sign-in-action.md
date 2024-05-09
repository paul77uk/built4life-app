## Creating Sign In Action

We are going to use a package called next-safe-action, it makes working with server actions, a lot easier.
https://next-safe-action.dev/

`npm i next-safe-action`

In our `server` folder lets add an `actions` folder.
In there add an `email-signin.ts` file.

Then in there add:

```typescript
"use server";

import { createSafeActionClient } from "next-safe-action";
import { LoginSchema } from "@/types/login-schema";

const action = createSafeActionClient();

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    console.log(email, password, code);
    return { email };
  }
);
```

'use server' needs to be added when it is a server action.
We can pass in a zod schema to our safe action.

Back in out `server/schema.ts` we need to add the following to the end of our `users` table:

```typescript
...
twoFactorEnabled: boolean("twoFactorEnabled").default(false),
role: RoleEnum("roles").default("user"),
...
```

and at the top of the files under the imports:

```typescript
export const RoleEnum = pgEnum("roles", ["user", "admin"]);
```

we will need to import some things from "drizzle-orm/pg-core"

To update schema.
We run:

`npm run db:generate`
`npm run db:push`

Back in our `components/auth/login-form.tsx`
We import:

```typescript
import { emailSignIn } from "@/server/actions/email-signin";
import { useAction } from "next-safe-action/hooks";
```

Then above our `onSubmit` method we add:

```typescript
const { execute, status } = useAction(emailSignIn);
```

on our login/ submit button at the bottom we will use the cn in our className like so:

```typescript
...
<Button type="submit" className={cn('w-full', status == 'executing' ? 'animate-pulse' : '')}>
...
```

In our onSubmit method, we replace the console.log... with:

```typescript
...
execute(values)
...
```

Then we can see if we get the value back in the server.
