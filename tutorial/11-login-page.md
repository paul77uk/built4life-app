## Login Page

Make an auth folder in the app directory.
In there make a login folder.
Then a page.tsx file in there.

We're going to make a seperate client component, for our login form, as it's going to have interactivity. Then we can use that in our login page which is a server component.

So we make an auth folder in our components, to put all components related to auth.
Then in there a login-form.tsx file.

We're going to make a wrapper for our login form, and reset password form, as they share some similarity.
For this we will create an auth-card.tsx in our auth folder.
You will need to add the shadcn components after and the imports.
The Socials and BackButton components will also be created after.

`components/auth/auth-card.tsx`:

```bash
import { Card } from "../ui/card"

type CardWrapperProps = {
  children: React.ReactNode
  cardTitle: string
  backButtonHref: string
  backButtonLabel: string
  showSocials?: boolean
}

export const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>{cardTitle}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
    {showSocials && (
      <CardFooter>
        <Socials />
      </CardFooter>
    )}
    <CardFooter>
      <BackButton href={backButtonHref} label={backButtonLabel} />
    </CardFooter>
    </Card>
  )
}
```

children is the child component of a component, like the text of a button, whether h1 or whatever, or a button component inside a link component, or vice versa.
We will make showsocials an optional prop, so we don't need to include it, by marking it with the ?

We get a card component fromm shadcn https://ui.shadcn.com/docs/components/card `npx shadcn-ui@latest add card`
we will also get the badge and avatar and form.
`npx shadcn-ui@latest add badge`
`npx shadcn-ui@latest add avatar`
`npx shadcn-ui@latest add form`

In our auth folder in components, we will create our Socials component named `socials.tsx`

```bash
"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const Socials = () => {
  return (
    <div>
      <Button
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Sign in with Google
      </Button>
      <Button
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Sign in with Github
      </Button>
    </div>
  );
};

export default Socials;
```

Then for the BackButton `back-button.tsx` in `auth` folder in `components` folder

```bash
"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="font-medium w-full">
      <Link aria-label={label} href={href}></Link>
    </Button>
  );
};
```

In `componenets/auth/login-form.tsx`:

```bash
"use client";

import { AuthCard } from "./auth-card";

export const LoginForm = () => {
  return (
    <AuthCard
      cardTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <div>LoginForm</div>
    </AuthCard>
  );
};
```

in the `app/auth/login/page.tsx`

```bash
import { LoginForm } from "@/components/auth/login-form";

const Login = () => {
  return <LoginForm />;
};

export default Login;

```

If you have a google account and gihub account registered to same email, you are going to get an error if sign in with both at any time.
So you need to go to `server/auth.ts`
under `clientSecret: process.env.GOOGLE_CLIENT_SECRET!,` add `allowDangerousEmailAccountLinking: true,` and also under the `clientSecret: process.env.GITHUB_SECRET!,`
