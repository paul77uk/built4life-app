## Generate Verification Token

We need to add the email to out emailTokens table.
So back in our `server/schema.ts`
under `expires:...` we add:

```typescript
email: text("email").notNull(),
```

if we leave it notNull we would have to input our own ids, so we will use a library to do this for us.

`npm  i @paralleldrive/cuid2`

So then on the id we change it to the following:

```typescript
...
import { createId } from '@paralleldrive/cuid2'
...
id: text("id").notNull().$defaultFn(() => createId()),
...
```

That's now generate us a random id

then:

`npm run db:generate`
`npm run db:push`

I had error so in the package.json file, in the scripts, I changed

```typescript
"db:generate": "drizzle-kit generate drizzle.config.ts",
"db:push": "drizzle-kit push drizzle.config.ts"
```

In `server/actions` add `tokens.ts` file
In there:

```typescript
"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailTokens } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db.insert(emailTokens).values({
    email,
    token,
    expires,
  });
  return verificationToken;
};
```

go to `server/actions/email-register.ts/`
inside the `if (existngUser) { ... }`
above the `return ...`
add:

```typescript
if (!existingUser.emailVerified) {
  const verificationToken = await generateEmailVerificationToken(email);
  await setVerificationEmail();

  return { success: "Email Confirmation resent" };
}

// Logic for when the user is not registered
await db.insert(users).values({
  email,
  name,
});

const verificationToken = await generateEmailVerificationToken(email);

await sendVerificationEmail();
```

we need to go back to our schema again `server/schema.ts`
In the users table, we change the id to this:

```typescript
id: text("id")
  .notNull()
  .primaryKey()
  .$defaultFn(() => createId()),
```

and add a password under the `image:...`:

```typescript
password: text("password"),
```

then, because we changed our schema:

`npm run db:generate`
`npm run db:push`
