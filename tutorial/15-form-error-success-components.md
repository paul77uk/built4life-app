## Form Error & Success Components

In `components/auth` create a new file called `form-errors.tsx`

```typescript
import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive text-secondary-foreground p-3 rounded-md">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
```

In `components/auth` create a new file called `form-success.tsx`

```typescript
import { CheckCircle2 } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400 text-secondary-foreground p-3 rounded-md">
      <CheckCircle2 className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
```

In `components/auth/login-form.tsx`
Under the `const form = useForm...` at the top of the page

```typescript
import { useState } from "react";
...
const [error, setError] = useState("")
...
```

Underneath what we added above change the `const { execute, status }... to:

```typescript
const { execute, status } = useAction(emailSignIn, {
  onSuccess(data) {
    console.log(data);
  },
});
```

In our `servers/actions/email-signin.ts` change the return to:

```typescript
return { success: email };
```

and above that add:

```typescript
const existingUser = await db.query.users.findFirst({
  where: eq(users.email, email),
});

if (existingUser?.email === email) {
  return { error: "User not found" };
}
```

will need to add a few imports:

```typescript
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
```
