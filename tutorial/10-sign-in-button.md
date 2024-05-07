## SignIn Button

First We're gonna tiddy up the navbar a little, so we go to nav.tsx, find the first a tag that out Built4Life text is in, and change it to a Link, make sure it's the one imported from next/link.

We change the href to href="/" so it leads to our home page.

There's a button under our UserButton which I'm going to delete, I think it's for a hamburger when we shrink the page.

The div under the div that contains our UserButton, we delete that and all it's contents.

Our nav.tsx should now look like:

```bash
import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";

const Nav = async () => {
  const session = await auth();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Built<span className="text-red-700">4</span>Life
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserButton user={session?.user} expires={session?.expires || ""} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
```

We go to https://ui.shadcn.com/docs/components/button and we going to install the Button component:

```bash
npx shadcn-ui@latest add button
```

shadcn creates a ui folder in our components folder, and the button component will be added there.

Next we go to our nav.tsx.
We're going to create a ternary to show a login or sign out button, depending if we're logged in our not.

We will also add an icon to out login button.
Our nav.tsx file now looks like this:

```bash
import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const Nav = async () => {
  const session = await auth();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Built<span className="text-red-700">4</span>Life
          </span>
        </Link>
        {!session ? (
          <Button asChild>
            <Link className="flex gap-2" href="/api/auth/signin"><LogIn size={16} />Login</Link>
          </Button>
        ) : (
          <UserButton user={session?.user} expires={session?.expires} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
```
