## React Hook Form & Zod

https://authjs.dev/getting-started/authentication/credentials

https://react-hook-form.com/

Install:

`npm install react-hook-form`

Go to `components//auth/login-form.tsx`
Inside the now empty div, we will use the shadcn form.

```bash
<Form>
</Form>
```

Under the starting line `export const LoginForm ...`
we add:

```bash
const form = useForm({
  resolver: zodResolver(LoginSchema),
  defaultValues: {
    email: "",
    password: "",
  }
})
```

We need to install zod to make validations easier https://zod.dev/

`npm i zod`

we also need to install: `npm i @hookform/resolvers`
https://github.com/react-hook-form/resolvers

We can add the import at the top of our file: `import { zodResolver } from '@hookform/resolvers/zod';`

I think the default values are what will show up to start with.

We will create zod schemas.
In the root of our app, we will create a `types` folder.
And in there create a file, `login-schema.ts`

```bash
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address", }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
})
```

So if don't enter a string and email format will return the error message for the email field of the form.
and if the password isn't at least 1, so if it's empty, will return the error message.
The code I may use for the 2 factor code later, but not sure how we will go about this entirely yet.

Back to the `components/auth/login-form.tsx`
We can import the LoginSchema: `import { LoginSchema } from "@/types/login-schema`

on the <Form> tag we add {...form} like so `<Form {...form}>
https://ui.shadcn.com/docs/components/form
inside there we add a native form, like in the shadcn docs above:
Including the Form tag above:

we will also need to install the Input from shadcn
https://ui.shadcn.com/docs/components/input

`npx shadcn-ui@latest add input`

```bash
...
<Form {...form}>
 <form onSubmit={form.handleSubmit(onSubmit)}>
  <div>
   <FormField
     control={form.control}
     name="email"
     render={({ field }) => (
       <FormItem>
         <FormLabel>Email</FormLabel>
           <FormControl>
             <Input
              placeholder="username@gmail.com"
              type="email"
              autoComplete="email"
              {...field} />
           </FormControl>
           <FormDescription>
               This is your public display name.
           </FormDescription>
           <FormMessage />
       </FormItem>
      )}
     />

    <FormField
     control={form.control}
     name="password"
     render={({ field }) => (
       <FormItem>
         <FormLabel>Password</FormLabel>
           <FormControl>
             <Input
              placeholder="********"
              type="password"
              autoComplete="current-password"
              {...field} />
           </FormControl>
           <FormDescription>
               This is your public display name.
           </FormDescription>
           <FormMessage />
       </FormItem>
      )}
     />
     <Button size={'sm'} variant={"link"} asChild>
      <Link href="/auth/reset">Forgot your password</Link>
     </Button>
     <Button type="submit" className="w-full my-2">
      {'Login}
     </Button>
  </div>
 </form>
</Form>
...
```

In the Input {..field} we are spreading field, so we have access to things like the onChange and value, we just use field. to get them

Under our `const form = useForm...` at the top of the file we add our onSubmit method:

```bash
const onSubmit = (values: z.infer<typeof LoginSchema>) => {
 console.log(values)
}
```

Here's some imports we can add to the top:

```bash
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { z } from "zod";
```

We will go back to our `components/auth/back-button.tsx` and on the `Button` add an `asChild` and a `variant={"link"}`

Back in our login form, we can remove the <FormDescription> from both forms

Back in `socials.tsx` we add `w-full` in the className of both buttons

Back in the `auth-card.tsx` we add a className to the <Card> tag of `className="w-3/4 sm:w-[500px]"`
So when the width hits a small size and above the Card it will be 500px, below that 3/4 of the screen, I think this looks ok for now, otherwise it was too small.
The only thing is the error messages clash with the color of our link variant buttons, but we'll try and change the error message style later.

We can now test the login-form in our browser console.
