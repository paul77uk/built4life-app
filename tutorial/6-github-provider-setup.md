## Github Provider Setup

we going to setup the github provider first, so we go to github.com
Then we go to settings, by clicking on our user icon in the top right and select `settings` from the dropdown.

Then scroll down to the last selection of the options on the left and choose `developer settings`.
then choose `oauth apps` then towards the top right choose `new oauth app`

then for the `application name` we enter `dev built-4-life`
`homepage url` `http://localhost:3000`
`Authorization callback URL` `http://localhost:3000/api/auth/callback/github`
then register application.

We need 2, one for local which we just did and then one for production, which we'll do later, maybe once we have a production homepage url.

then we copy the `client id`

go to `.env.local` file and paste it next to `GITHUB_ID=`
then `generate a new client secret` and paste that next to `GITHUB_SECRET=`