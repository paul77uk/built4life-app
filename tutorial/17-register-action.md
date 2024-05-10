## Register Action

We will install bcrypt to hash our password and the types:
`npm i bcrypt`
`npm i @types/bcrypt`

Go to `server/actions/email-register.ts`

```typescript
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
```

In `components/auth/register-form.tsx` under `const [error, setError] ...`

```typescript
const { execute, status } = useAction(emailRegister, {
  onSuccess(data) {
    if (data.success) {
      console.log(data.success);
    }
  },
});
```

And we add `execute(values)` in the onSubmit method

If we now create an account we should see our hashedpassword
