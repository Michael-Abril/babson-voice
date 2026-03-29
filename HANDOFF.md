# Babson Voice — Handoff Guide

> This guide is for whoever wants to run their own independent copy of Babson Voice under their own accounts. Follow every step in order — the whole process takes about 20 minutes.

---

## What You'll Need

- A free [GitHub](https://github.com) account
- A free [Supabase](https://supabase.com) account (the database)
- A free [Vercel](https://vercel.com) account (the hosting)
- Your custom domain (optional but recommended)

---

## Step 1 — Fork the Repository

1. Go to **https://github.com/Michael-Abril/babson-voice**
2. Click **Fork** (top right) → **Create fork**
3. You now have your own copy at `https://github.com/YOUR_USERNAME/babson-voice`

---

## Step 2 — Set Up the Database (Supabase)

### 2a. Create a Supabase project

1. Go to **[supabase.com](https://supabase.com)** → sign up (free)
2. Click **New project**:
   - **Name:** `babson-voice`
   - **Region:** US East (closest to Babson College)
   - **Database Password:** pick a strong password and save it
3. Wait ~2 minutes for the project to provision

### 2b. Create the database tables

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query** and paste the entire block below, then click **Run**:

```sql
-- Ideas table
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

-- Votes table
CREATE TABLE votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId" uuid REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "voterId" text NOT NULL,
  "voteType" text NOT NULL CHECK ("voteType" IN ('up', 'down')),
  "createdAt" timestamptz DEFAULT now() NOT NULL
);

-- Volunteers table
CREATE TABLE volunteers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId" uuid REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "userId" text NOT NULL,
  email text NOT NULL,
  "signedUpAt" timestamptz DEFAULT now() NOT NULL
);

-- Allow public read + write (anonymous app — no login required for posting)
ALTER TABLE ideas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes      ENABLE ROW LEVEL SECURITY;
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

You should see "Success. No rows returned." — that means it worked.

### 2c. Copy your Supabase credentials

1. In your Supabase project, go to **Settings → API** (left sidebar)
2. Copy these two values — you'll need them in Step 3:

| What | Where to find it | Variable name |
|------|-----------------|---------------|
| Project URL | Under "Project URL" | `NEXT_PUBLIC_SUPABASE_URL` |
| anon / public key | Under "Project API keys" → anon row | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

---

## Step 3 — Deploy to Vercel

### 3a. Create a Vercel account

1. Go to **[vercel.com](https://vercel.com)** → sign up with your GitHub account (easiest)

### 3b. Import the project

1. From your Vercel dashboard, click **Add New → Project**
2. Click **Import Git Repository** → find `babson-voice` in your forked repos → click **Import**
3. On the configuration screen, **before clicking Deploy**, expand **Environment Variables** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | The URL you copied from Supabase (e.g. `https://abcdefgh.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The long anon key you copied from Supabase |
| `NEXT_PUBLIC_SITE_URL` | Your custom domain, e.g. `https://babsonvoice.com` (or leave blank for now) |

4. Click **Deploy** — the build takes about 60–90 seconds
5. Vercel gives you a free URL like `babson-voice-abc123.vercel.app` — the app is live!

---

## Step 4 — Add Your Custom Domain (Optional)

If you have a custom domain (e.g. `babsonvoice.com`):

1. In your Vercel project, go to **Settings → Domains**
2. Click **Add** and type your domain
3. Vercel shows you a DNS record to add. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add:
   - **If using the root domain** (`babsonvoice.com`): add an **A record** pointing `@` → `76.76.21.21`
   - **If using a subdomain** (`voice.mysite.com`): add a **CNAME record** pointing `voice` → `cname.vercel-dns.com`
4. Back in Vercel, click **Verify** — DNS can take 1–30 minutes to propagate
5. SSL certificate is provisioned automatically once DNS is verified

Then update the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel to your real domain:
- Vercel → your project → **Settings → Environment Variables** → edit `NEXT_PUBLIC_SITE_URL`
- After saving, go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

---

## Step 5 — Test It

1. Open the app at your Vercel URL (or custom domain)
2. Click **Sign in with Babson Email** — enter any `@babson.edu` address
3. Go to **Submit** — post a test idea
4. Go back to **Feed** — the idea should appear
5. Click the upvote/downvote arrows — the count should update
6. In your Supabase dashboard → **Table Editor** → `ideas` — you should see the row

If any of these don't work, check the **browser console** (F12) for error messages — most issues are env var typos.

---

## Automatic Deploys

Once connected, every time you push a change to `main` on GitHub, Vercel automatically rebuilds and deploys. No manual steps needed after the initial setup.

---

## Troubleshooting

### "Invalid API key" or "Failed to fetch" errors in the app
- Your Supabase env vars are wrong or missing. Double-check in Vercel → Settings → Environment Variables that both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly (no extra spaces).
- After fixing env vars, redeploy: Vercel → Deployments → latest → Redeploy.

### App loads but no ideas show up / posts don't save
- The database tables don't exist yet. Go to Supabase → SQL Editor and run the SQL from Step 2b.
- Make sure you also ran the `CREATE POLICY` statements — without them, the anon key can't read or write data.

### Login rejects my email
- Only `@babson.edu` addresses are accepted. The login page validates the domain client-side before saving to localStorage.

### Custom domain shows "Invalid SSL" or doesn't load
- DNS hasn't propagated yet. Wait 10–30 minutes and try again.
- Make sure you added the correct record type (A record for root domain, CNAME for subdomain).

---

## Tech Stack Reference

| Layer | Service | Cost |
|-------|---------|------|
| Hosting | Vercel | Free (Hobby plan) |
| Database | Supabase | Free (500MB, 50k rows/month) |
| Auth | Babson email validation (localStorage session) | Free |
| Domain | Your registrar | Whatever you pay for the domain |

The free tiers are more than enough for a Babson-scale app (a few hundred students).

---

## Staying Up to Date

To pull in future updates from the original repo:

```bash
# Add the original repo as a remote (one-time setup)
git remote add upstream https://github.com/Michael-Abril/babson-voice.git

# Pull latest changes
git fetch upstream
git merge upstream/main

# Push to your fork
git push origin main
```

Vercel will auto-deploy the update.
