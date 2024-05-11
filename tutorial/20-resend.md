## Resend

Go to https://resend.com/overview
On the left menu, click on API Keys, then Create API Key button.
I name it built4life, and leave the other defaults, then click Add

Copy the API Key.

Go to `.env.local`
Then add `RESEND_API_KEY=` and paste in the api key

in terminal `npm install resend`

go to `app/auth` and create a new folder `new-verification` and a `page.tsx` in there

In `lib` create a `base-url.ts` file

```typescript
const getBaseURL = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}`;
  ("http://localhost:3000");
};

export default getBaseURL;
```

https://resend.com/docs/send-with-nextjs

Then in `server/actions` create file `email.ts`

```typescript
"use server";

import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Built4Life = Confirmation Email",
    html: `<p>Click to <a href='${confirmLink}'>confirm your email</a></p>`,
    // react: EmailTemplate({ firstName: "John" }),
  });
  if (error) return console.log(error);
  if (data) return data;
};
```

We can only send emails to ourselves in development.
I commented it our, but we could use a react component instead of html, maybe I come back to later.

In `server/actions/tokens.ts`
At the end of `const verificationToken...` we add `.returning()`
Like so:

```typescript
const verificationToken = await db
  .insert(emailTokens)
  .values({
    email,
    token,
    expires,
  })
  .returning();
return verificationToken;
```

Back in `server/actions/email-register.ts`
Under the first const `verificationToken...`

```typescript
await sendVerificationEmail(
  verificationToken[0].email,
  verificationToken[0].token,
);
```

and we remove the `await setVerificationEmail();`

We also to the same under the second `const verificationToken...` replacing the `await sendVerificationEmail();`

```typescript
await sendVerificationEmail(
  verificationToken[0].email,
  verificationToken[0].token,
);
```

Back to `components/auth/register-form.tsx`
Under const `[error, setError]...` add:

```typescript
const [success, setSuccess] = useState("");
```

we also change const `{ execute, status }...`

```typescript
const { execute, status } = useAction(emailRegister, {
  onSuccess(data) {
    if (data.error) setError(data.error);
    if (data.success) setSuccess(data.success);
  },
});
```

We need to go into `form-success.tsx` and change the name from FormError to FormSuccess

Then Back in `components/auth/register-form.tsx`
above `Forgot your password` Button, close to the bottom, add:

```typescript
<FormSuccess message={success} />
<FormError message={error} />
```

add imports.

We going back to `form-success.tsx`
We change the className on the main div:

```typescript
className =
  "bg-teal-400/25 flex text-xs font-medium items-center my-4 gap-2 text-secondary-foreground p-3 rounded-md"
```

and the main div on the `form-error.tsx`

```typescript
className =
  "bg-destructive/25 flex text-xs font-medium items-center my-4 gap-2 text-secondary-foreground p-3 rounded-md";
```

Then we can check if we can save the user, by filling in the form fields, then checking on drizzle studio if email and token were saved and also our email to see if the email was sent.
