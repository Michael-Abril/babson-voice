# Babson Voice — Migration Log

## From: Varity MCP (IPFS static hosting + Varity DB Proxy)
## To: Vercel (hosting) + Supabase (database)

> **Date:** March 29, 2026  
> **Reason:** Varity's server-side infrastructure has critical blocking bugs during beta — the credential proxy and DB proxy both return HTTP 401 for all requests, making deployment and database operations impossible. Switching to Vercel + Supabase to get the app live immediately.

---

## Changes Made

### 1. Database layer replaced (`src/lib/`)

| File | Change |
|------|--------|
| `src/lib/supabase.ts` | **NEW** — Supabase client + `collection<T>()` wrapper that exposes the same `.get()/.add()/.update()/.delete()` API as the Varity SDK, so `hooks.ts` needed zero changes |
| `src/lib/database.ts` | Updated import: `from './varity'` → `from './supabase'`; collection functions unchanged |
| `src/lib/varity.ts` | Unchanged (still exports `db` from `@varity-labs/sdk`; now unused but harmless) |
| `src/lib/hooks.ts` | **No changes** — all data hooks work identically against the new Supabase collection wrapper |

The `collection<T>(name)` wrapper in `supabase.ts` is a drop-in replacement:

```typescript
// Before (Varity SDK)
export const ideas = () => db.collection<Idea>('ideas');

// After (Supabase wrapper — identical call signature)
export const ideas = () => collection<Idea>('ideas');
```

### 2. Removed IPFS-specific configuration

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Removed `<base href="./" />` — this tag was required for IPFS subpath hosting (e.g. `ipfs.io/Qm.../index.html`) but breaks standard URL routing on Vercel. Removing it fixes all relative path issues on a real domain. |
| `src/app/layout.tsx` | Changed `metadataBase` from hardcoded `https://varity.app` to `process.env.NEXT_PUBLIC_SITE_URL` so the correct domain is used for OG tags |
| `next.config.js` | Removed `output: 'export'` and `trailingSlash: true` — Vercel handles Next.js natively; static export mode was only needed for IPFS file bundles |

### 3. Dependencies added

```bash
npm install @supabase/supabase-js
```

### 4. Environment variables updated

| Variable | Before | After |
|----------|--------|-------|
| `NEXT_PUBLIC_VARITY_APP_TOKEN` | Varity JWT (auto-injected by CLI) | Removed |
| `NEXT_PUBLIC_VARITY_DB_PROXY_URL` | Varity DB proxy URL | Removed |
| `NEXT_PUBLIC_VARITY_APP_ID` | Varity app ID | Removed |
| `NEXT_PUBLIC_SUPABASE_URL` | — | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | — | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | — | Your custom domain (for OG tags) |

### 5. Auth unchanged

Privy auth via `@varity-labs/ui-kit` still works — the shared dev Privy credentials are valid and unaffected by the Varity infrastructure issues. `PrivyStack`, `usePrivy`, `PrivyProtectedRoute` all remain exactly as-is.

---

## Supabase Setup (One-Time)

### Step 1 — Create project
1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name it `babson-voice`, pick a region (US East recommended for Babson)
3. Save the database password somewhere safe
4. Wait ~2 minutes for provisioning

### Step 2 — Create tables
Go to **SQL Editor** in your Supabase dashboard and run:

```sql
-- Ideas
CREATE TABLE ideas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL,
  upvotes integer DEFAULT 0 NOT NULL,
  downvotes integer DEFAULT 0 NOT NULL,
  "volunteerCount" integer DEFAULT 0 NOT NULL,
  "createdAt" timestamptz DEFAULT now() NOT NULL
);

-- Votes
CREATE TABLE votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId" uuid REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "voterId" text NOT NULL,
  "voteType" text NOT NULL CHECK ("voteType" IN ('up', 'down')),
  "createdAt" timestamptz DEFAULT now() NOT NULL
);

-- Volunteers
CREATE TABLE volunteers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId" uuid REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "userId" text NOT NULL,
  email text NOT NULL,
  "signedUpAt" timestamptz DEFAULT now() NOT NULL
);

-- Row Level Security: allow public read + write (anonymous app)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"   ON ideas      FOR SELECT USING (true);
CREATE POLICY "public insert" ON ideas      FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON ideas      FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "public read"   ON votes      FOR SELECT USING (true);
CREATE POLICY "public insert" ON votes      FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete" ON votes      FOR DELETE USING (true);

CREATE POLICY "public read"   ON volunteers FOR SELECT USING (true);
CREATE POLICY "public insert" ON volunteers FOR INSERT WITH CHECK (true);
```

### Step 3 — Get credentials
Go to **Settings → API** in your Supabase dashboard:
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4 — Add to `.env.local`
Create `c:\Users\mabril1\babson-voice\.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Vercel Deployment

### Step 1 — Push to GitHub (first time only)
```bash
# Already done if you're reading this from the repo
git init
git add .
git commit -m "initial commit"
gh repo create babson-voice --private --source=. --push
```

### Step 2 — Connect to Vercel
Option A (recommended — auto-deploys on every push):
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the `babson-voice` GitHub repository
3. Add environment variables (copy from `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Deploy** — live in ~60 seconds

Option B (CLI):
```bash
npx vercel --prod
```
When prompted, paste the same env vars.

### Step 3 — Add custom domain
In Vercel → your project → **Settings → Domains**:
1. Click **Add Domain**
2. Enter your custom domain (e.g. `babsonvoice.com`)
3. Vercel shows you a DNS record to add — either:
   - **CNAME** pointing `www` → `cname.vercel-dns.com`
   - **A record** pointing apex (`@`) → `76.76.21.21`
4. Add the record in your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.)
5. SSL is provisioned automatically — usually live within 5 minutes

---

## What's Still Using Varity

| Component | Status | Notes |
|-----------|--------|-------|
| Auth (Privy via `@varity-labs/ui-kit`) | Still active | Works fine — Privy dev credentials are valid |
| `@varity-labs/sdk` | Still installed | `varity.ts` still exports `db` but it's unused; can be removed later |
| `varity.config.json` | Still present | Harmless — no longer used for deployment |
| `VARITY-TEAM-FEEDBACK.md` | Still present | Documents all Varity DX issues found during this build session |

---

## What Was NOT Changed

- All React components (`src/app/**`, `src/components/**`) — untouched
- All TypeScript types (`src/types/index.ts`) — untouched
- All hooks (`src/lib/hooks.ts`) — untouched
- Auth flow (`PrivyStack`, `usePrivy`) — untouched
- Styling (`globals.css`, `tailwind.config.js`) — untouched
- `src/lib/constants.ts`, `src/lib/utils.ts` — untouched
