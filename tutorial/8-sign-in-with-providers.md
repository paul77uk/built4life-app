## Sign In with Providers

This gets a bit difficult for me to explain, because I don't fully understand it to explain. But if you go to our `auth.ts` file in our `server` folder.
And if you hover over the `handlers, auth, signIn, signOut` they do give some explanation

Then in our `app` folder we create an `api` folder.
In the `api` folder we create an `auth` folder.

then we create a custom folder with square brackets `[...nextauth]` in the `auth` folder.

this spreads all the different paths, like signin and signout, so when you go to api/auth/signin it'll work.

then we create a `route.ts` file in the `[...nextauth]` folder, and add:

```bash
import { handlers } from "@/server/auth";
export const { GET, POST } = handlers;
```

in the terminal we need to run:

```bash
npx auth secret
```

to get our `AUTH_SECRET=` which we will put in our `.env.local` file
more on this here: `https://authjs.dev/getting-started/installation` and here: `https://authjs.dev/getting-started/deployment`

I deleted the = off the end of the code, I am not sure if it is an excepted character, and the random number is still over 32 characters, which is reccomended, you can also use the `openssl rand -base64 33` command instead.

then go to `auth.ts` and under the `adapter: DrizzleAdapter(db),` line add:

```bash
secret: process.env.AUTH_SECRET!, `
```

we also haven't run db:genrate and push after we changed our schema last time:

```bash
npm run db:generate
npm run db:push
```

if you see `Is account table created or renamed from another table?` just press enter, I think it just creates them over wiping the users table in this case, which I don't think matters at the moment.

and now if we go to: http://localhost:3000/api/auth/signin we should see our sign in providers.

and we should be able to sign in, and if successful it should redirect to our current home page, and if we go to https://local.drizzle.studio/ and refresh the page, we should have a new account and user in our database.
If you have any issues, try restarting drizzle studio in your terminal and maybe you localhost.


