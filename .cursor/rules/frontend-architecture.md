#  Frontend Architecture
## 1. Scope

Poemdle is a daily micro-poetry game: read a prompt, submit **one poem of up to 280 characters**, browse a feed, and use up to five upvotes. Once voting closes, a **Top 10 leaderboard** displays the most-voted eligible poems.

**Frontend owns:** pages, components, validation, rendering, data fetching, caching, accessibility and unit tests. **Backend owns:** anonymous sessions, authoritative rules, vote counts, ranking, moderation and the daily lifecycle.

**Not in this MVP:** accounts/authentication, profiles, following, comments, streaks, Elo/pairwise voting, reaction categories, editable submissions, dark mode or mobile apps. The README describes possible later features, not current requirements.

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js App Router, React, strict TypeScript |
| Styling | Tailwind CSS v4 and design tokens |
| Interactive server state | TanStack Query |
| Forms and validation | React Hook Form + Zod |
| Local UI state | React state; no global store initially |
| Unit tests | Vitest |

## 3. Rendering

**Hybrid approach:** Next.js Server Components render public content; client components fetch session-specific state after hydration.

| Surface | Strategy |
|---|---|
| Daily prompt and previous day's Top 10 | Server Components |
| Historical leaderboard/archive | Server Components; revalidate on publication/moderation |
| Editor and submission status | Client Components |
| Poem feed, vote budget and vote controls | Client Components + TanStack Query |
| About | Static Server Component |

The first HTML can show the prompt and published leaderboard. The browser then requests the visitor's submission/voting state using an anonymous session cookie. Display a loading state until that request completes; do not briefly show an incorrect editor or vote state. Never put session-specific data in shared server caches.

## 4. Feature-based structure

```text
src/
  app/
    layout.tsx
    page.tsx
    poems/page.tsx
    leaderboard/page.tsx
    archive/page.tsx
    archive/[date]/page.tsx
    about/page.tsx
  features/
    daily-prompt/
    submission/
    poem-feed/
    voting/
    leaderboard/
    archive/
  components/
    ui/
    layout/
  lib/
    api/
    query/
    utils/
  providers/
    query-provider.tsx
  types/
    api.ts
  styles/
    globals.css
```

Each feature can contain `components/`, `api/`, `hooks/` and, where needed, `schemas/`. Keep route files thin and shared UI components domain-agnostic.

## 5. TypeScript API models

These describe **frontend API contracts**, not database tables. Shapes and names require agreement with the backend developer.

```ts
export type GameStatus = 'scheduled' | 'open' | 'closed';
export type LeaderboardStatus = 'pending' | 'published';

export interface DailyPrompt {
  id: string;
  date: string;          // Europe/London calendar date: YYYY-MM-DD
  title: string;         // confirm backend support
  text: string;
  status: GameStatus;
  closesAt: string;      // UTC ISO timestamp
}

export interface PlayerState {
  hasSubmitted: boolean;
  ownPoemId: string | null;
  votesAllowed: number;  // MVP: 5
  votesRemaining: number;
  canVote: boolean;
}

export interface TodayResponse {
  prompt: DailyPrompt;
  player: PlayerState;
}

export interface SubmitPoemInput {
  body: string;          // maximum 280 characters
  alias?: string;
}

export interface FeedPoem {
  id: string;
  body: string;
  alias: string;         // MVP alias; no user profile
  isOwnPoem: boolean;
  hasVoted: boolean;
  canVote: boolean;
  // Never include voteCount while voting is open.
}

export interface LeaderboardEntry {
  rank: number;          // ranking policy for ties is backend-defined
  poemId: string;
  body: string;
  alias: string;
  voteCount: number;     // available only after publication
}

export interface DailyLeaderboard {
  date: string;
  status: LeaderboardStatus;
  entries: LeaderboardEntry[]; // at most 10; [] if no eligible poems
  publishedAt: string | null;
}

export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR' | 'ALREADY_SUBMITTED' | 'GAME_CLOSED'
  | 'VOTE_LIMIT_REACHED' | 'OWN_POEM' | 'RATE_LIMITED'
  | 'SESSION_EXPIRED' | 'NOT_FOUND' | 'INTERNAL_ERROR';
```

**Proposed API:** `GET /api/today`, `POST /api/poems`, `GET /api/poems?cursor=`, `PUT/DELETE /api/votes/:poemId`, `GET /api/leaderboard/:date`, `GET /api/archive?cursor=`. Finalise exact payloads and error codes with the backend owner. The backend calculates rank and vote totals; the browser must not calculate an authoritative leaderboard.

## 6. Validation and voting rules

- **Poem limit:** 280 characters maximum; **no line-count limit**. Preserve line breaks and stanza spacing.
- Use React Hook Form + Zod for immediate feedback and a live character counter. The backend enforces the same limit. Agree on counting semantics (JavaScript string length vs Unicode code points/graphemes) and whether newlines count; **default proposal: count newlines, use Unicode code points**.
- One uneditable submission per anonymous session per London day.
- Five active upvotes per session per day; players can withdraw/change votes before closure, but cannot vote on their own poem.
- Feed is cursor-paginated with stable per-session ordering. Keep live vote totals hidden.
- **Top 10** appears only after results are published; fewer than ten eligible poems means fewer than ten entries. A zero-vote day and tie-breaking/rank display need backend agreement.

## 7. State and caching

| State | Owner |
|---|---|
| Public prompt, published leaderboards and archive | Next.js server-side fetching/cache |
| Player state, feed, vote selections | TanStack Query in the browser |
| Editor and alias | React Hook Form |
| Modal, focus, countdown | Local React state |
| Archive date | URL route |

| Data | Starting cache policy | Refresh |
|---|---|---|
| Public daily prompt | Cache only within the correct London day | Day rollover |
| Published leaderboard/archive | Public cache with bounded fallback | Publication/moderation |
| Player state | TanStack Query `staleTime: 60s` | Submit/vote, focus, rollover |
| Active poem feed | TanStack Query `staleTime: 30s` | Submit/vote, focus, rollover |
| Interactive published leaderboard | TanStack Query `staleTime: 5min` | Publication/moderation |

`staleTime` determines freshness, **not** automatic polling or deletion. These are initial estimates; explicit invalidation matters more than short intervals.

```ts
export const queryKeys = {
  today: ['today'] as const,
  poems: (date: string) => ['poems', date] as const,
  leaderboard: (date: string) => ['leaderboard', date] as const,
  archive: ['archive'] as const,
};
```

After successful submission, vote or withdrawal, invalidate the player's `today` query and the current day's feed. Start with server-confirmed updates, not optimistic voting. At `closesAt`, disable uncertain actions and refetch; show **leaderboard pending** until publication. Use backend UTC deadlines so London daylight-saving changes are handled correctly. A response containing personal state (such as `/api/today`) is **private** even if it also contains the public prompt.

## 8. Components and UI states

**Components:** `DailyPrompt`, `PoemEditor`, `CharacterCounter`, `PoemSubmission`, `PoemFeed`, `PoemCard`, `VoteButton`, `VoteBudget`, `LeaderboardCard`, `LeaderboardList`, `ArchiveList`, `Countdown`.

**States:** loading, writing, submitted, voting, closed, leaderboard-pending, leaderboard-published, empty and error. The homepage's previous-winner component becomes a **previous Top 10 leaderboard preview**; a dedicated leaderboard page displays all ten ranked entries.

Render poem bodies as safe text with `white-space: pre-wrap` and overflow wrapping. Preserve drafts after failed submissions, prevent duplicate requests, support keyboard voting and visible focus, and announce important feedback accessibly.

## 9. Unit testing

Use **Vitest** for pure helpers: 280-character counting/normalisation, Zod submission validation, date/deadline handling, game-view derivation and query-key generation. No broader testing workflow is prescribed here.

## 
1. 
