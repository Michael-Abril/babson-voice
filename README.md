# Babson Voice

**Live at [www.buildbabsonbetter.com](https://www.buildbabsonbetter.com)**

An anonymous idea and feedback platform for Babson College students. Submit campus improvement ideas, vote on what matters most, and volunteer to help bring the best ones to life.

---

## What It Does

- **Anonymous idea submission** — post campus improvement ideas without revealing your identity
- **Community voting** — upvote or downvote ideas; the best ones surface naturally
- **Volunteer sign-ups** — raise your hand to help execute top ideas
- **Category filtering** — Academics, Campus Life, Dining, Facilities, Clubs, Other
- **Activity tracking** — view your own vote and volunteer history
- **PWA support** — add to your phone's home screen and use it like a native app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Auth | Babson email login (`@babson.edu` verified, stored in `localStorage`) |
| Database | Supabase (PostgreSQL with Row Level Security) |
| Hosting | Vercel (auto-deploys on every push to `main`) |
| Domain | `www.buildbabsonbetter.com` |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

## Contributing

This is a shared repository. If you've been added as a collaborator you can push directly to a branch and open a pull request — Vercel will auto-deploy once it merges to `main`.

**First-time setup:**

```bash
git clone https://github.com/Michael-Abril/babson-voice.git
cd babson-voice
npm install
```

Make sure your local git identity matches your GitHub account or Vercel will block the deployment:

```bash
git config user.name  "YourGitHubUsername"
git config user.email "your-github-email@example.com"
```

**Typical workflow:**

```bash
git checkout -b feature/my-change   # create a branch
# ... make your changes ...
git add .
git commit -m "describe what you changed"
git push origin feature/my-change   # push the branch
# then open a Pull Request on GitHub → merge to main → Vercel deploys automatically
```

---

## Project Structure

Every file that matters lives under `src/`. Here's the full map:

```
babson-voice/
├── src/
│   ├── app/                          # Next.js App Router — one folder = one route
│   │   ├── layout.tsx                # Root HTML shell, PWA metadata, global font
│   │   ├── globals.css               # Tailwind base + custom CSS variables/animations
│   │   ├── page.tsx                  # Landing page (hero, feature cards, sign-in CTA)
│   │   ├── not-found.tsx             # 404 page
│   │   ├── icon.tsx                  # Auto-generated favicon (ImageResponse)
│   │   ├── apple-icon.tsx            # Auto-generated iOS home screen icon
│   │   ├── manifest.ts               # PWA web manifest (name, icons, theme color)
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx              # Email login form — validates @babson.edu domain
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            # Auth guard (redirects to /login if not signed in)
│   │   │   │                         # + bottom navigation bar + PWA install prompt
│   │   │   ├── page.tsx              # Main idea feed — voting, sorting, filtering, hot badge
│   │   │   ├── submit/
│   │   │   │   └── page.tsx          # Submit a new idea (title, body, category)
│   │   │   └── activity/
│   │   │       └── page.tsx          # Your votes + volunteer signups history
│   │   │
│   │   └── api/
│   │       └── pwa-icon/
│   │           └── route.tsx         # API route that generates PWA icons at 192×192 / 512×512
│   │
│   ├── components/
│   │   ├── InstallPrompt.tsx         # "Add to Home Screen" banner for iOS and Android
│   │   └── providers.tsx             # Global Next.js client providers wrapper
│   │
│   ├── lib/
│   │   ├── supabase.ts               # Supabase client + generic collection() CRUD wrapper
│   │   ├── database.ts               # Typed exports: ideas(), votes(), volunteers()
│   │   ├── hooks.ts                  # All React hooks + async actions:
│   │   │                             #   useCurrentUser, useIdeas, useVotes, useAllVotes,
│   │   │                             #   useVolunteers, castVote, removeVote,
│   │   │                             #   recalculateIdeaVotes, signUpVolunteer
│   │   ├── constants.ts              # Category list, nav items, category color map
│   │   └── utils.ts                  # formatRelativeDate(), cn() (Tailwind class merge)
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces: Idea, Vote, Volunteer
│
├── supabase/
│   └── schema.sql                    # Full database schema — run this in Supabase SQL Editor
│
├── public/
│   └── sitemap.xml                   # SEO sitemap
│
├── .env.example                      # Template for required environment variables
├── HANDOFF.md                        # Step-by-step guide to deploy your own instance
├── next.config.js                    # Next.js config
├── tailwind.config.js                # Tailwind theme config
└── package.json                      # Dependencies and scripts
```

---

## Local Development

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Database

Run `supabase/schema.sql` in the Supabase SQL Editor to create the three tables (`ideas`, `votes`, `volunteers`) with the correct columns, constraints, and Row Level Security policies.

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — sign in with any `@babson.edu` email.

---

## Database Schema

| Table | Key Fields |
|-------|-----------|
| `ideas` | `id`, `title`, `body`, `category`, `upvotes`, `downvotes`, `volunteerCount`, `createdAt` |
| `votes` | `id`, `ideaId`, `voterId`, `voteType` (`up`/`down`), `createdAt` — unique per `(ideaId, voterId)` |
| `volunteers` | `id`, `ideaId`, `userId`, `email`, `signedUpAt` — unique per `(ideaId, userId)` |

Full schema with RLS policies is in [`supabase/schema.sql`](./supabase/schema.sql).

---

## Environment Variables

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your domain — used for PWA and OG meta tags |

---

## Deployment

Every push to `main` triggers an automatic Vercel deployment to [www.buildbabsonbetter.com](https://www.buildbabsonbetter.com).

For a full walkthrough (Supabase setup, Vercel config, custom domain), see [`HANDOFF.md`](./HANDOFF.md).
