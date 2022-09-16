<div align="center">
    <h1>Anavrin</h1>
    <p>Simple tracking & simulation for your portfolio</p>
</div>

## Stack

* Frontend Framework - Next JS
* CSS Framework - Tailwind CSS
* Frontend Components -Mantine components
* Frontend API connection - React Query
* Backend API - Next.js API Routes 
* Auth - NextAuth.js
* Hosting - Vercel
* Testing - Jest

# Note

Project uses [qoomon/git-conventional-commits](https://github.com/qoomon/git-conventional-commits) (refer [doc](https://gist.github.com/MidasXIV/080e017ccfec9d0c37aff3fb78f1e43b)) to use this you must set git hook directory to `.githooks` using `git config core.hooksPath '.git-hooks'`.

## Getting Started

[google-auth-mongodb-setup-guide]: https://betterprogramming.pub/build-a-note-taking-app-with-google-authentication-in-next-js-f0835d14034e

### Setting up local env

This is how your local `env.local` file should look like in root of the project.

```
ALPHAVANTAGE_API_KEY=<ALPHAVANTAGE_API_KEY>

GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>

MONGODB_URI=mongodb+srv://<MONGO_APP_NAME>:<MONGO_PASS>@cluster0.ieyta.mongodb.net/<MONGODB_DB>?retryWrites=true&w=majority
MONGODB_DB=<MONGODB_DB>

NEXTAUTH_URL=http://localhost:3000/api/auth
NEXTAUTH_SECRET=<NEXTAUTH_SECRET>

VAPID_PUBLIC_KEY=<VAPID_PUBLIC_KEY>
VAPID_PRIVATE_KEY=<VAPID_PRIVATE_KEY>
VAPID_SUBJECT=test:test@test.app
```

| ENV Keys | Description | Links to get Key |
| :- | :- | :- |
| **ALPHAVANTAGE_API_KEY** | Required for add/search stock Modal used in portfolio page. | [alphavantage-api-key](https://www.alphavantage.co/support/#api-key) |
| **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET**| Required for loggin-in and is the primary Auth provider currently | [Guide to creating Google Auth Credentials][google-auth-mongodb-setup-guide] |
| **MONGODB_URI** / **MONGODB_DB**| Required for loggin-in and is the primary database | [Guide to creating MogoDB Atlas Cluster Credentials][google-auth-mongodb-setup-guide] |
|**VAPID_PUBLIC_KEY**, **VAPID_PRIVATE_KEY**, **VAPID_SUBJECT**| Required for creating and sending webpush notifications | In the terminal, run `npx web-push generate-vapid-keys`. Copy the private key and public key values. |
|**NEXTAUTH_SECRET**| Required in production  |run `openssl rand -base64 32` or visit [this](https://generate-secret.vercel.app/32) site.|

***

After setting up the `env.local` file, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
