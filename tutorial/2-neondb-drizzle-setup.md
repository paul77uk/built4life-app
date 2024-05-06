## Setting Up neondb with drizzle

[https://orm.drizzle.team/docs/get-started-postgresql]

In your terminal type:

```bash
npm i pg drizzle-orm @neondatabase/serverless
```

I had a conflicting peer dependency issue

```bash
npm error While resolving: built-4-life@0.1.0
npm error Found: react@18.3.1
npm error node_modules/react
npm error   peer react@"^18.2.0" from next@14.2.3
npm error   node_modules/next
npm error     next@"14.2.3" from the root project
npm error   peer react@"^18.3.1" from react-dom@18.3.1
npm error   node_modules/react-dom
npm error     peer react-dom@"^18.2.0" from next@14.2.3
npm error     node_modules/next
npm error       next@"14.2.3" from the root project
npm error     react-dom@"^18" from the root project
npm error   2 more (styled-jsx, the root project)
```

I went to `package.json file`, in the dependencies on about lines 16 & 17, i changed the react and react-dom version number from `"^18"` to `"^18.3.1"`
so my lines 15 and 17 are now:

```bash
"react": "^18.3.1",
"react-dom": "^18.3.1"
```

then I did the install again and also installed drizzle-kit:

```bash
npm i pg drizzle-orm @neondatabase/serverless
npm i -D drizzle-kit
```

Then go to [https://neon.tech/]

signup or login

If you haven't before you will need to create a project, you can only have one project on the free tier, but unlimted databases [https://neon.tech/docs/introduction/plans]

I called the project by my name Paul Vickers's Project, you can use your name or anything you want, then my databases I name to the app name, in this case will be built4life.

Click on three dots and choose dashboard.

Then tick the box pooled connection.

I think they automatically create a db for you called neondb at first, you can use that or click on database and create new one.

You need to click the eye icon on the connection string to reveal all the details then copy the text.
Then in the root of your nextjs project create a file named `.env.local`.
type:

```bash
DRIZZLE_DATABASE_URL=
```

then paste in the connection string you copied.
So in you `.env.local` file you will something like:

```bash
DRIZZLE_DATABASE_URL=postgresql://neondb_owner:abcdef123456@ep-fragrant-credit-a5vhg5p5-pooler.us-east-2.aws.neon.tech/built4life?sslmode=require
```

Then create a folder in the root of you nextjs project called `server`. Then in that folder create a file called `index.ts`

It shows the set up in the following link: [https://orm.drizzle.team/docs/get-started-postgresql]
We paste it in the `index.ts` file:

```bash
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);
```
