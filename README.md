# Open Source Spirit Shop

A small Next.js app that turns popular open source GitHub repositories into "potions".
It is built to show the three main data fetching strategies of the Next.js App Router:

| Route | Strategy | How |
|---|---|---|
| `/` | SSG (cached data) + filters via `searchParams` | `fetch(..., { cache: "force-cache" })` |
| `/potions/[slug]` | ISR | `next: { revalidate: 3600 }` + `generateStaticParams` |
| `/mystery-potion` | SSR | `fetch(..., { cache: "no-store" })` |

## Getting started

```bash
npm install
```

Create a `.env.local` file (see `.env.example`):

```
GITHUB_TOKEN=your_github_token
DEVELOPMENT=true
```

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

Before deploying, put your real production domain in `utils/index.tsx` (`ORIGIN_URL`).
On Vercel, only `GITHUB_TOKEN` is needed.
