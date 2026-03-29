# Babson Voice

An anonymous idea and feedback platform for Babson College students. Submit campus improvement ideas, vote on what matters most, and volunteer to help bring the best ones to life.

---

## What It Does

- **Anonymous idea submission** — post campus improvement ideas without revealing your identity
- **Community voting** — upvote or downvote ideas; the best ones surface naturally
- **Volunteer sign-ups** — raise your hand to help execute top ideas
- **Category filtering** — Academics, Campus Life, Dining, Facilities, Clubs, Other
- **Activity tracking** — view your own vote and volunteer history

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Auth | Privy (via `@varity-labs/ui-kit`) |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

## Getting Started (Local Development)

### 1. Clone and install

```bash
git clone https://github.com/Michael-Abril/babson-voice.git
cd babson-voice
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the table setup SQL from `HANDOFF.md` in the Supabase SQL Editor
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  app/
    page.tsx                  # Landing page
    login/page.tsx            # Authentication
    dashboard/
      layout.tsx              # Auth guard + bottom navigation
      page.tsx                # Idea feed
      submit/page.tsx         # Submit a new idea
      activity/page.tsx       # Your votes & volunteer history
    not-found.tsx             # 404 page
  components/
    providers.tsx             # Global providers (toast)
  lib/
    supabase.ts               # Supabase client + collection wrapper
    database.ts               # Typed collection accessors
    hooks.ts                  # Data hooks (useIdeas, useVotes, etc.)
    constants.ts              # App config, nav items, category colors
    utils.ts                  # Date formatting, cn(), hardNavigate()
  types/
    index.ts                  # Idea, Vote, Volunteer TypeScript types
```

---

## Database Schema

| Table | Fields |
|-------|--------|
| `ideas` | `id`, `title`, `body`, `category`, `upvotes`, `downvotes`, `volunteerCount`, `createdAt` |
| `votes` | `id`, `ideaId`, `voterId`, `voteType` (`up`/`down`), `createdAt` |
| `volunteers` | `id`, `ideaId`, `userId`, `email`, `signedUpAt` |

---

## Environment Variables

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your domain — used for OG meta tags |

---

## Deployment

The app deploys automatically to Vercel on every push to `main`.

For a full deployment walkthrough (Supabase setup, Vercel config, custom domain), see [`HANDOFF.md`](./HANDOFF.md).

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes
4. Open a pull request against `main`
