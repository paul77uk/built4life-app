## Styling Login Page

In the `components/auth/socials.tsx`

On the main div, we are going to add a `className="flex flex-col items-center w-full gap-4"`
The flex-col will place them on top of each other, in a column instead of the default row for flex, then we center them make sure we take up the full space so they will be centered and give a little gap inbetween.

We will then add icons to the buttons.
So for each one we give a `className="flex gap-4"` so we have them on the same line/ row here and give a slight gap between the icon and the text.

We set the variant on the buttons to `variant={"outline"}`

For the Google button, we wrap the text in a div.
Then above the text we add an icon.
We will do the same for the github button.

There are no social icons with lucide, so we install react icons.
`npm i react-icons`

So for the google button, above the text, we add `<FcGoogle />` and import it from `'react-icons/fs'`
`import { FcGoogle } from "react-icons/fc";`

Then for the github, `<FaGithub />`
`import { FaGithub } from "react-icons/fa";`

And on the icons we give then a size of 24 `size={24}` you could give them a className instead if you wanted and add a height and width

I may alter the design more once I have the complete form there. But for now I want to center AuthCard.
We wrap the Card in main tag and add `className="flex justify-center h-[calc(100vh-80px)] items-center"`

The 100vh is the screen height, and because of our navbar we - the 80px
I wrap the card in the main div, so I can center it within it

we are then going to add a theme from shadcn ui.
https://ui.shadcn.com/themes

We go to customize button and pick style `New York` Color `Red` I'll leave the radius at 0.5 and Mode `Dark`
Then select `Copy code`

Then in `app/globals.css` replace the similar @layer base {...} with the copied code

Then we can remove the LoginForm text from `login-form.tsx`

The `Create a new account` is not showing up on the button, so we go to `components/auth/back-button.tsx` and add the {label} to the Link like so:

```bash
...
<Link aria-label={label} href={href}>{label}</Link>
...
```
