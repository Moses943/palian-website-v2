# Palian Money Lending — Website

A Vite + React + Tailwind project containing the Palian Money Lending marketing
site, loan calculator, and demo customer login/dashboard.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Deploy it live

### Option A — Vercel (recommended, free tier is enough for this)

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Palian Money Lending site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/palian-site.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **Add New → Project**, select the repo.
4. Vercel auto-detects Vite — leave the defaults and click **Deploy**.
5. You'll get a live URL like `palian-site.vercel.app` within a minute.
6. To use your own domain: **Project → Settings → Domains**, add
   `palianmoney.co.zm` (or whichever you own), and update your domain
   registrar's DNS records with the values Vercel shows you.

### Option B — Netlify

1. Same GitHub push as above.
2. [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
3. Build command: `npm run build`  ·  Publish directory: `dist`
4. Deploy, then attach your domain under **Domain settings**.

## Current limitations (demo state)

- **Customer login accepts any email/password** — there's no real backend yet.
  The dashboard shows fixed sample data (`DEMO_ACCOUNT` in `src/App.jsx`).
- **The application form and contact form don't send anywhere** — they show a
  success state in the UI only.
- **Branch map, live chat, and file uploads are UI-only placeholders.**

## Wiring up real data (Supabase)

See the schema and code snippets already discussed for `customers`, `loans`,
and `payments` tables, Row Level Security policies, and swapping
`LoginPage`/`Dashboard` over to real `supabase.auth` and `supabase.from(...)`
calls. Once that's in place, this same Vercel/Netlify deploy will serve the
live version — no separate hosting needed for Supabase itself.
