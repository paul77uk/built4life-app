## Google Provider Setup

go to https://console.cloud.google.com/
sign up or log in
create a new project
I called it built-4-life
and then click create

go to cloud overview and select dashboard.
click on `go to apis overview`
then choose `credentials` from the left menu.
then click `create credentials` from the top.
and choose `oauth client id`
click `configure consent screen`
select `external`
click `create`

for `app name` enter built4life
for `user support email` i put my email and also down the bottom for `Developer contact information` `email address`
and then click `save and continue`
then on the next screen click `save and continue`
and the next `save and continue` again.
then `back to dashboard`

then we go back to `credentails`
then `create credentials`
then `oauth client id`

for `application type` choose `web application`
for the `Authorized JavaScript origins` click `add uri` and paste in `http://localhost:3000`

for the `Authorized redirect URIs` click add uri then paste `http://localhost:3000/api/auth/callback/google`

then click `create`

then copy the `client id` and paste it into the `.env.local` file, then do the same with the `client secret`
