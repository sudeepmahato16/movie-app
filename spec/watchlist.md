# Watchlist Feature Spec

## 1. Overview

Add a personal watchlist to tMovies so users can save and revisit favourite movies and TV shows. The feature requires no backend — all state is held in React Context and persisted to `localStorage`, matching the existing theme persistence pattern.

---

## 2. Functional Requirements

| # | Requirement |
|---|-------------|
| FR-1 | User can add any movie or TV show to their watchlist from the **MovieCard hover overlay** |
| FR-2 | User can add/remove items from the **Detail page** hero section |
| FR-3 | User can remove items directly from the **Watchlist page** |
| FR-4 | The watchlist button visually toggles between an empty icon (not saved) and a filled icon (saved) |
| FR-5 | The nav link shows a **badge** with the current watchlist item count |
| FR-6 | A dedicated `/watchlist` route displays all saved items as a grid |
| FR-7 | An **empty state** message is shown when the watchlist has no items |
| FR-8 | The watchlist **persists across page refreshes** via localStorage |

---

## 3. Non-Functional Requirements

| # | Requirement |
|---|-------------|
| NFR-1 | No new npm dependencies — use only packages already installed |
| NFR-2 | Consistent with existing Tailwind CSS utility class patterns |
| NFR-3 | Animations use the existing `useMotion` hook / Framer Motion patterns |
| NFR-4 | All new code is fully TypeScript typed |
| NFR-5 | Layout is mobile-responsive (same breakpoints as existing pages) |

---

## 4. Tech Stack

All existing — no new installs required.

| Concern | Solution |
|---------|----------|
| State management | React Context API — mirrors `globalContext` / `themeContext` |
| Persistence | `localStorage` — mirrors theme persistence pattern |
| Styling | Tailwind CSS |
| Animations | Framer Motion via existing `useMotion` hook |
| Icons | `react-icons` |
| Routing | React Router v6 |

---

## 5. Architecture / Design Approach

### New Context — `watchlistContext.tsx`

Mirrors `themeContext.tsx` in structure:

- Holds `watchlist: MovieItem[]` in state
- Initialises from `localStorage` on mount
- Writes to `localStorage` on every change
- Exposes `addToWatchlist(item)`, `removeFromWatchlist(id)`, `isInWatchlist(id)` via a `useWatchlist()` hook

### Helper functions — `helper.ts`

Two new pure functions added to the existing file:

```ts
getWatchlist(): MovieItem[]       // reads + parses localStorage key
saveWatchlist(items: MovieItem[]): void  // serialises + writes to localStorage
```

### New `WatchlistButton` component

- Lives in `/src/common/WatchlistButton/index.tsx`
- Accepts `item: MovieItem` as a prop
- Calls `useWatchlist()` internally
- Renders a bookmark/heart icon that toggles filled/unfilled based on `isInWatchlist`
- Exported from `/src/common/index.ts`

### New `Watchlist` page

- Lives in `/src/pages/Watchlist/index.tsx`
- Reads from `useWatchlist()`
- Renders a grid of `MovieCard` components (reuse existing component)
- Shows empty-state UI when list is empty

### Nav link

- A new entry added to the nav links array in `/src/constants/index.ts`
- Badge rendered in the nav component using `useWatchlist().watchlist.length`

---

## 6. Implementation Phases

Each phase is independently testable before moving on.

### Phase 1 — Context + localStorage

**Goal:** Watchlist state initialises from and writes to `localStorage`.

Files to create/modify:
- **Create** `/src/context/watchlistContext.tsx`
- **Modify** `/src/utils/helper.ts` — add `getWatchlist` / `saveWatchlist`
- **Modify** `/src/main.tsx` — wrap `<App />` in `<WatchlistProvider>`

**Test:** Open DevTools → Application → Local Storage. Call `addToWatchlist` from the console (or a temporary button). Refresh the page — the item should still be in state.

---

### Phase 2 — WatchlistButton on MovieCard

**Goal:** Hovering a MovieCard shows an add/remove button that correctly toggles watchlist state.

Files to create/modify:
- **Create** `/src/common/WatchlistButton/index.tsx`
- **Modify** `/src/common/index.ts` — export `WatchlistButton`
- **Modify** `/src/common/MovieCard/index.tsx` — add `<WatchlistButton>` inside the hover overlay

**Test:** Hover any card → click the button → icon changes to filled. Refresh → hover again → icon is still filled.

---

### Phase 3 — WatchlistButton on Detail page

**Goal:** The Detail page hero section has an add/remove watchlist button.

Files to modify:
- **Modify** `/src/pages/Detail/index.tsx` — add `<WatchlistButton>` near the title/actions area

**Test:** Navigate to any movie detail page → click the button → navigate back → hover the card → button shows as saved.

---

### Phase 4 — Watchlist page

**Goal:** `/watchlist` displays all saved items; removing an item from this page updates the list immediately.

Files to create/modify:
- **Create** `/src/pages/Watchlist/index.tsx`
- **Modify** `/src/App.tsx` — add `<Route path="/watchlist" element={<Watchlist />} />`

**Test:** Add a few items → navigate to `/watchlist` → grid renders correctly. Remove one → it disappears immediately. Clear all → empty state is shown.

---

### Phase 5 — Nav link + badge count

**Goal:** A "Watchlist" link appears in the nav with a live count badge.

Files to modify:
- **Modify** `/src/constants/index.ts` — add watchlist nav entry
- **Modify** the nav component (wherever nav links are rendered) — add badge

**Test:** Add 3 items → nav badge shows `3`. Remove one → badge shows `2`. Empty watchlist → badge shows `0` or is hidden.

---

## 7. Files to Create / Modify

| Action | File | Notes |
|--------|------|-------|
| Create | `/src/context/watchlistContext.tsx` | Provider + `useWatchlist` hook |
| Create | `/src/common/WatchlistButton/index.tsx` | Toggle button component |
| Create | `/src/pages/Watchlist/index.tsx` | Watchlist grid page |
| Modify | `/src/utils/helper.ts` | Add `getWatchlist`, `saveWatchlist` |
| Modify | `/src/constants/index.ts` | Add watchlist nav link |
| Modify | `/src/common/index.ts` | Export `WatchlistButton` |
| Modify | `/src/App.tsx` | Add `/watchlist` route |
| Modify | `/src/main.tsx` | Wrap app in `WatchlistProvider` |
| Modify | `/src/common/MovieCard/index.tsx` | Add button to hover overlay |
| Modify | `/src/pages/Detail/index.tsx` | Add button near hero actions |

---

## 8. Verification Checklist

After all phases are complete, run through these checks at `http://localhost:5173`:

- [ ] MovieCard hover shows watchlist button
- [ ] Button icon toggles on click
- [ ] State persists on refresh (check localStorage in DevTools)
- [ ] Detail page button stays in sync with MovieCard button for the same item
- [ ] `/watchlist` page renders saved items as a grid
- [ ] Removing from Watchlist page updates the grid immediately
- [ ] Empty state shows when watchlist is cleared
- [ ] Nav badge count matches actual watchlist length
- [ ] All above work on mobile viewport (375px wide)
