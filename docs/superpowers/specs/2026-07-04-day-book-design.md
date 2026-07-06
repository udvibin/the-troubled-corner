# The Day-Book — site structure redesign

Approved reference: `mock.html` (the living mock; delete after the build ships).
This doc records the decisions so the build has one source of truth.

## The model

One dated stream — **the day-book** — replaces the sectioned site. Everything is an
**entry** with a date and a type; typography does the weighting, dates do the discipline
(gaps are visible, that's the forcing function).

| type | on the page | fields |
|------|-------------|--------|
| `essay` | big: title, date line, drop cap, full Markdown body, end-mark | slug, title, date, md, songs[] (optional), preview (one-liner for archive) |
| `song` | one quiet italic line | date, text (album, artist, aside), url |
| `picture` | small centered plate (≤340px) with date + caption | date, src, caption |
| `inspiration` | one quiet italic line | date, text, url (optional) |

## Page composition (top to bottom)

1. **Masthead** — hat ornament, title, tagline (placeholder: "writing, mostly" — Uday
   will replace). Nothing else: no byline box, no links, no controls. You land in the book.
2. **The stream** — the last **3 essays** and every small entry between/around them,
   newest first, printed in full. Blog date line merges songs:
   `28 JUNE 2026 · played — Astral Weeks ↗ · …` (date small-caps; song half italic faded).
3. **Wake line** — "the older pages sleep in the archive →".
4. **The archive** — asleep (display:none) until clicked; wakes below with the fold
   animation, same page. Ledger form: date in a left gutter (collapses above the entry
   on mobile), month headings, hairlines. Essay rows **unfold in place** to the full
   essay. Small entries are one ledger line each.
5. **Doors** — italic prose lines, foot only:
   - "every song posted here, in one list: listening →" — a **compiled view** built
     from song entries + essays' songs[]; not hand-maintained.
   - "how this site is made: the colophon →" — existing colophon content; absorbs
     the old About (who keeps this place + how it's made).
6. **Footer** — title, "last updated {date of newest entry}", email/github/elsewhere,
   sinking tailpiece (unchanged).

## Typography rules (from the mock)

- Every date: 16px, small caps, oxblood, upright (never italic), letter-spacing .2em.
- Essay: title first, date under it.
- Small entries: one line, italic, faded ink; type label ("played", "inspiration") in
  small caps. External links `target="_blank" rel="noopener"`; Spotify album URLs
  (they deep-link into the app on mobile by themselves).
- ★ ❦ ★ separates entry clusters — to be replaced by the trinket divider.

## Trinkets (from trinkets.md; stamped by render functions, never typed)

- **end-mark** — after each essay's final paragraph, replacing a trailing period.
- **divider** — ★ fern ★ (fern crozier flanked by stars) between entry clusters.
- **door pointer** — fern crozier, small, replaces → after door/wake links.
- Others (month flourishes, song/inspiration marks, plate frame) are optional; the
  site ships without them and adopts them one at a time as they win.

## What is removed

Nav bar and folds-as-sections; Writing/Listening/Marginalia sections; the marginalia
register (inspiration entries just live in the stream); the full/brief view toggle
(the stream IS full, the archive IS brief).

## Code plan (single file, no libraries — house rules apply)

- `ENTRIES` array replaces `POSTS` + `LISTENING`, between
  `// === ENTRIES_START ===` / `// === ENTRIES_END ===` markers. Existing posts
  migrate to essay entries; LISTENING items to song entries.
- Publishing (`commitPost` → `commitEntry`) parses the ENTRIES block; same
  GET→splice→PUT+sha flow, 409 retry. Editor (#admin) unchanged for essays; gains a
  small type picker so a song/picture/inspiration is a 30-second post.
- `mdToHtml`, drop caps, fig directives, patina, tailpiece: unchanged.
- Renderers: `renderStream()` (last 3 essays + interleaved smalls),
  `renderArchive()` (month-grouped ledger, unfold in place), `renderListening()`
  (compiled register), footer date.
- Self-check: scratchpad check.js updated for ENTRIES markers; run before commit.
- After ship: update spec.md + CLAUDE.md, delete mock.html.

## Open items (non-blocking)

- Tagline wording (Uday). "plates" word in old tagline dies with this build anyway.
- Trinket SVGs land whenever won; placeholders (❦, ★ ❦ ★, →) ship fine.
