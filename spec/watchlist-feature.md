# Watchlist Feature Spec

## Overview

The tMovies app lets users browse movies and TV shows, but there's no way to save favorites. The **watchlist feature** lets users bookmark movies and TV shows they want to watch later. Everything is saved in the browser — no login or account needed.

---

## Requirements

### What users can do

1. **Add to watchlist** — Click a bookmark icon on any movie/show card or detail page to save it
2. **Remove from watchlist** — Click the same icon again to unsave it
3. **View watchlist** — Navigate to a dedicated "Watchlist" page from the top navigation to see all saved items
4. **Persist across sessions** — Saved items survive browser refreshes and closing/reopening the browser
5. **Empty state** — When the watchlist is empty, show a friendly message guiding users to browse and add items

### What this feature does NOT include

- No user accounts or login
- No syncing across devices or browsers
- No sorting/filtering within the watchlist
- No limit on how many items can be saved

---

## Design Approach

The feature is built in **6 incremental steps**. Each step can be tested on its own before moving to the next.

### Step 1: Data layer

Add the data types and helper functions for reading/writing the watchlist to the browser's localStorage.

**What changes:**
- `src/types.d.ts` — Add a `IWatchlistItem` type (a movie/show plus its category)
- `src/utils/helper.ts` — Add `saveWatchlist()` and `getWatchlist()` functions

**How to test:**
Open browser DevTools → Console, and manually call `localStorage.getItem("watchlist")` to confirm the storage key exists after the helpers are wired up.

---

### Step 2: Watchlist state management (Context)

Create a React Context that holds the watchlist in memory and syncs it to localStorage. This follows the same pattern the app already uses for themes (`themeContext.tsx`) and modals (`globalContext.tsx`).

**What changes:**
- `src/context/watchlistContext.tsx` — New file with the WatchlistProvider and `useWatchlist()` hook
- `src/main.tsx` — Wrap the app in the new WatchlistProvider

**What the context provides:**
| Function | What it does |
|---|---|
| `watchlist` | The current list of saved items |
| `addToWatchlist(movie, category)` | Saves a movie/show |
| `removeFromWatchlist(id)` | Removes a movie/show by ID |
| `isInWatchlist(id)` | Returns true/false if item is saved |

**How to test:**
Use React DevTools to confirm the WatchlistProvider appears in the component tree. All other components can now access the watchlist.

---

### Step 3: Watchlist toggle button

Create a reusable bookmark button component that can be placed on cards and detail pages.

**What changes:**
- `src/common/WatchlistButton/index.tsx` — New component
- `src/common/index.ts` — Export the new component

**Behavior:**
- Shows a **bookmark outline** icon when the item is NOT in the watchlist
- Shows a **filled bookmark** icon when the item IS in the watchlist
- Clicking toggles between add/remove
- Two visual variants: `"icon"` (just the icon, for cards) and `"full"` (icon + text like "Add to Watchlist", for the detail page)

**How to test:**
Temporarily drop the button into any page to confirm it renders, toggles state, and updates localStorage.

---

### Step 4: Add bookmark to movie cards

Show the bookmark button on every movie/show card, visible on hover.

**What changes:**
- `src/common/MovieCard/index.tsx` — Add WatchlistButton in the top-right corner

**Behavior:**
- Appears on hover over the card
- Clicking the bookmark does NOT navigate to the detail page (the click is intercepted)

**How to test:**
Hover over any movie card on the home page or catalog. Click the bookmark icon. Check localStorage in DevTools → Application → Local Storage to see the item saved. Click again to remove it.

---

### Step 5: Add bookmark to detail page

Show a full "Add to Watchlist" / "Remove from Watchlist" button on the movie/show detail page.

**What changes:**
- `src/pages/Detail/index.tsx` — Add WatchlistButton below the genre tags

**How to test:**
Navigate to any movie detail page. See the button. Click to add, confirm it changes to "Remove from Watchlist." Refresh the page — the button should still show "Remove from Watchlist" (persisted).

---

### Step 6: Watchlist page + navigation

Create the watchlist page and add a link in the navigation bar.

**What changes:**
- `src/pages/Watchlist/index.tsx` — New page component
- `src/App.tsx` — Add `/watchlist` route
- `src/constants/index.ts` — Add "watchlist" to the navigation links

**Important: Route ordering**
The `/watchlist` route must be placed **before** `/:category` in `App.tsx`. Otherwise, React Router would treat "watchlist" as a category name and show the Catalog page instead.

```
<Route path="/" element={<Home />} />
<Route path="/watchlist" element={<Watchlist />} />     ← before /:category
<Route path="/:category/:id" element={<Detail />} />
<Route path="/:category" element={<Catalog />} />
<Route path="*" element={<NotFound />} />
```

**Behavior:**
- Displays all saved items as movie cards in a grid (same layout as the catalog page)
- Each card has the bookmark button so users can remove items directly
- Shows an empty state message when nothing is saved
- Navigation link appears in the header and mobile sidebar automatically

**How to test:**
1. Add a few movies/shows via the bookmark buttons from Steps 4-5
2. Click "watchlist" in the top navigation
3. Verify all saved items appear
4. Click a bookmark on a card to remove it — the card should disappear from the grid
5. Remove all items — verify the empty state message appears

---

## Tech Stack

| What | Choice | Why |
|---|---|---|
| Storage | `localStorage` | Simple, no backend needed, already used for themes |
| State management | React Context | Matches existing patterns (themeContext, globalContext) |
| Icons | `react-icons` (BsBookmark / BsBookmarkFill) | Already installed in the project |
| Styling | Tailwind CSS | Already used everywhere in the app |
| Routing | react-router-dom | Already used, just adding one more route |
| Animations | Framer Motion | Already used on the detail page |

**No new dependencies are needed.** Everything uses tools already in the project.

---

## Data Model

Each saved item is stored as a JSON object in localStorage under the key `"watchlist"`:

```
Key:   "watchlist"
Value: [
  {
    "id": "550",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "original_title": "Fight Club",
    "name": "",
    "overview": "A ticking-Loss insomnia...",
    "backdrop_path": "/hZkgoQYus5dXo3H8T7CYV2UMrZ6.jpg",
    "category": "movie"
  },
  {
    "id": "1396",
    "poster_path": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    "original_title": "",
    "name": "Breaking Bad",
    "overview": "A high school chemistry teacher...",
    "backdrop_path": "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    "category": "tv"
  }
]
```

**Why store full movie data (not just IDs)?**
So the watchlist page loads instantly from localStorage without making API calls for each saved item.

**Why include `category`?**
The app routes are `/:category/:id` — we need to know if something is a "movie" or "tv" to link to its detail page.

---

## Files Summary

### New files
| File | Purpose |
|---|---|
| `spec/watchlist-feature.md` | This spec document |
| `src/context/watchlistContext.tsx` | Watchlist state management |
| `src/common/WatchlistButton/index.tsx` | Reusable bookmark toggle button |
| `src/pages/Watchlist/index.tsx` | Watchlist page |

### Modified files
| File | Change |
|---|---|
| `src/types.d.ts` | Add `IWatchlistItem` interface |
| `src/utils/helper.ts` | Add `saveWatchlist()` and `getWatchlist()` |
| `src/main.tsx` | Wrap app with `WatchlistProvider` |
| `src/common/index.ts` | Export `WatchlistButton` |
| `src/common/MovieCard/index.tsx` | Add bookmark button overlay |
| `src/pages/Detail/index.tsx` | Add "Add to Watchlist" button |
| `src/App.tsx` | Add `/watchlist` route |
| `src/constants/index.ts` | Add watchlist nav link |

---

## Testing Checklist

Use this to verify the feature end-to-end after all steps are complete.

- [ ] **Add from card:** Hover a movie card on the home page, click the bookmark icon. Icon fills in.
- [ ] **Add from detail:** Open a movie detail page, click "Add to Watchlist". Button text changes to "Remove from Watchlist".
- [ ] **Consistent state:** After adding from the detail page, go back — the card's bookmark icon is filled on hover.
- [ ] **Watchlist page shows items:** Navigate to `/watchlist`. Added items appear as cards.
- [ ] **Cards link correctly:** Click a movie card on the watchlist page. It opens the correct detail page (`/movie/:id` or `/tv/:id`).
- [ ] **Remove from card:** Hover a saved movie card, click the filled bookmark. Icon goes back to outline.
- [ ] **Remove from detail:** On a saved movie's detail page, click "Remove from Watchlist". Text changes back.
- [ ] **Remove from watchlist page:** On the watchlist page, hover a card and click the bookmark to remove it. The card disappears.
- [ ] **Empty state:** Remove all items. The watchlist page shows "Your watchlist is empty" with a link to browse.
- [ ] **Persistence:** Add a few items, close the browser tab entirely, reopen the app, go to `/watchlist`. Items are still there.
- [ ] **Navigation:** The "Watchlist" link appears in both the desktop header and mobile sidebar.
- [ ] **TV shows work:** Add a TV show (from `/tv` catalog). Confirm it appears on the watchlist and links to `/tv/:id`.
- [ ] **No regressions:** Browse the app normally — home page, catalog, detail pages, search. Everything still works.
