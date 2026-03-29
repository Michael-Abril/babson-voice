# Babson Voice

An anonymous idea and feedback platform for Babson College students. Submit campus improvement ideas, vote on what matters most, and volunteer to help bring the best ones to life.

[![Built with Varity](https://img.shields.io/badge/built%20with-Varity-7C3AED)](https://www.varity.so)

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What It Does

- **Anonymous idea submission** — students submit campus improvement ideas without revealing their identity
- **Community voting** — upvote or downvote ideas; the best ones surface naturally
- **Volunteer sign-ups** — students can raise their hand to help execute top ideas
- **Category filtering** — ideas organized by Academics, Campus Life, Dining, Facilities, Clubs, Other
- **Activity tracking** — each user can view their own votes and volunteer history

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, `output: 'export'`) |
| Auth | Privy via `@varity-labs/ui-kit` |
| Database | Varity DB Proxy via `@varity-labs/sdk` |
| Hosting | IPFS via Varity (`varitykit app deploy`) |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

## Project Structure

```
src/
  app/
    page.tsx                  # Landing page
    login/page.tsx            # Privy authentication
    dashboard/
      layout.tsx              # Auth guard + bottom nav
      page.tsx                # Idea feed (home)
      submit/page.tsx         # Submit a new idea
      activity/page.tsx       # Your votes & volunteer history
  components/
    providers.tsx             # ToastProvider wrapper
    landing/                  # (reserved for future landing sections)
    shared/                   # (reserved for future shared components)
  lib/
    varity.ts                 # SDK db export
    database.ts               # Typed collections (ideas, votes, volunteers)
    hooks.ts                  # Data hooks (useIdeas, useVotes, etc.)
    constants.ts              # App name, nav items, category config
    utils.ts                  # formatDate, formatRelativeDate, cn, hardNavigate
  types/
    index.ts                  # Idea, Vote, Volunteer types
```

---

## Data Collections

| Collection | Purpose |
|------------|---------|
| `ideas` | Campus improvement submissions |
| `votes` | Per-user upvote/downvote records |
| `volunteers` | Per-user volunteer sign-ups per idea |

All collections are defined in `src/lib/database.ts` and declared in `varity.config.json`.

---

## Environment Variables

**Development:** No setup needed. The Varity SDK uses shared dev credentials automatically.

**Production:** Run `varitykit app deploy` — credentials are injected automatically.

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_VARITY_APP_TOKEN` | DB auth token (auto-injected by CLI on deploy) |
| `NEXT_PUBLIC_VARITY_DB_PROXY_URL` | DB proxy URL (auto-injected by CLI on deploy) |
| `NEXT_PUBLIC_VARITY_APP_ID` | App ID (auto-injected by CLI on deploy) |

---

## Deployment

```bash
varitykit app deploy
```

Builds the static export, provisions a private database, and deploys to IPFS with a custom Varity gateway URL.

---

## Known Platform Issues

See [`VARITY-TEAM-FEEDBACK.md`](./VARITY-TEAM-FEEDBACK.md) for a detailed developer experience report covering Windows compatibility bugs, credential proxy issues, and DB proxy authentication errors that were encountered during development.
