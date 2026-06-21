Hiding the Unsplash API key

What I changed

- public/script.js: removed the hard-coded API key and updated the client to call a local endpoint at `/api/photos?count=` instead of Unsplash directly.
- server.js: added a small Express server that reads UNSPLASH_API_KEY from the environment and proxies requests to Unsplash.
- .env.example: added an example environment file showing the UNSPLASH_API_KEY variable.

How to run locally

1. Create a `.env` file in the repo root (do not commit it) and add your key:

```
UNSPLASH_API_KEY=your_real_key_here
```

2. Install dependencies:

```
npm install express dotenv
```

3. Start the server:

```
node server.js
```

4. Open http://localhost:3000 in your browser. The client will call `/api/photos` and the server will attach the API key when requesting Unsplash.

Notes and alternatives

- This keeps the API key off the client. If you deploy, make sure to set the `UNSPLASH_API_KEY` environment variable in your hosting provider.
- If you use a bundler (Vite, Webpack, Next.js, etc.) there are build-time environment variable options, but those often still expose values to the client unless explicitly handled server-side. The proxy approach above is a straightforward and secure option for this project.
