## Confirm User Email Address

In `app/auth/new-verification/page.tsx`

```typescript
import { EmailVerificationForm } from "@/components/auth/email-verification-form";

const EmailVerification = () => <EmailVerificationForm />;

export default EmailVerification;
```

In `components/auth` create `email-verification-form.tsx` file

```typescript
"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthCard } from "./auth-card";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

export const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("No token found");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      cardTitle="Verify your account."
    >
      <div className="flex flex-col w-full justify-center items-center">
        <p>{!success && !success ? "Verifying email..." : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
};
```

We need to get the token out of the url, if we're in a client component, we can use the useSearchParams as we do here `const token = useSearchParams().get("token");`

The useRouter() will help us navigate to another route or refresh page

We go to `server/actions/tokens.ts` and at the bottom we add:

```typescript
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByEmail(token);
  if (!existingToken) return { error: "Token not found" };
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!existingUser) return { error: "Email does not exist" };
  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  return { success: "Email verified" };
};
```

Then back in out In `app/auth/new-verification/page.tsx`
