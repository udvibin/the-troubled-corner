# Personal Website — Spec

> The single source of truth. (The old `website-prompt.md` and its CRT/Gen-X aesthetic are retired and deleted.)
> This is an antique-letterpress site: calm, neutral, welcoming. Like a well-made old book you stumbled into.

## What it is

A personal space to explore and develop a style. Low stakes — not a portfolio, not for an audience.
One person's calm corner of the web. Inspiration: [fromjason.xyz](https://www.fromjason.xyz/) (aesthetic), [near.blog](https://near.blog/) (simplicity), and a few restrained ideas from [gwern.net](https://gwern.net/) (typography/dropcaps — borrow taste, not the machinery).

## Hard constraints (locked)

- **Single-file *code*.** All *code + content + structure* in one `index.html` (CSS in `<style>`, JS in `<script>`, content in the data arrays). The rule that matters: **no framework, no build step, no server, no libraries.** *Assets ≠ code* — fonts live in `fonts/`, images are URLs; sibling asset files are fine and expected. **Never base64-embed fonts/images into the HTML** (bloat + unreadable). The single escape hatch stays: move data to a `posts.json` only if it gets heavy (~40+ entries).
- **One page, accordion navigation** (see Navigation) — no URL-hash "pages".
- **Allowed external resources / assets** (assets ≠ code; living *outside* the HTML is fine):
  - The Google Fonts `<link>` (IM Fell DW Pica + its `SC` cut — load-bearing).
  - Self-hosted font files in `fonts/` (e.g. `RoyalInitialen.ttf`) via `@font-face`.
  - Images / woodcut SVGs hosted elsewhere (URLs).
  - Optionally one ambient audio file.
- **No libraries.** Pure HTML/CSS/vanilla JS. Web Crypto (`crypto.subtle`) is browser stdlib and allowed.
- **Host:** GitHub Pages. `git push` auto-deploys. Custom domain whenever (DNS + `CNAME`, security-neutral).
  Cloudflare Pages / a Worker is a deferred, additive upgrade — not built now.
- **Responsive, accessible, modern browsers only.**

---

## Navigation: accordion (replaces the old hash-route pages)

One calm page. The **Contents** is the persistent menu at the top. Every content section is a **collapsible fold**, collapsed by default. Clicking a Contents link (or a section heading) **opens that one section, closes the rest, and scrolls it to the top.** No `#/` routes, no URL clutter — pure JS toggle + `scrollIntoView`.

- One section open at a time (strict accordion).
- After toggling, scroll the opened section to top so the page doesn't lurch.
- The Colophon is just another fold (no longer a separate page).
- Long Day-book entries keep their own expand/collapse *inside* the open section (nesting is fine).
- Admin stays special: revealed via `#admin` / the discreet `◆` link, not part of the accordion.

---

## Aesthetic: antique letterpress

### Palette
| token | hex | use |
|-------|-----|-----|
| paper | `#f3efe3` | background — aged ivory; CSS patina on `body` (foxing stains + edge vignette + SVG grain) |
| ink | `#1f1b16` | body text (warm near-black) |
| oxblood | `#7c1f1f` | accent: masthead, dates, tags, rules |
| faded | `#6b6256` | secondary text: metadata, captions, previews |
| hairline | `rgba(26,26,26,0.12)` | thin rules / dividers |

No neon, no glow, no scanlines. Contrast comes from serif weight and oxblood, not light effects.

### Typography
**LOCKED.** One typeface does every job: **IM Fell DW Pica** (Igino Marini's digitisation of a 17th-c. Fell type, ink-spread and all) — body, masthead, post titles. **Headings** use its small-caps cut (`IM Fell DW Pica SC`) + tracking + oxblood — the way to make one font read as a heading. ~19px, line-height ~1.64, reading measure max-width ~680px, single centred column. Both cuts from one Google Fonts `<link>`.

**Drop caps: `Royal Initialen`** — an ornate old initials face, self-hosted from `fonts/` via `@font-face` (Google doesn't carry decorative initial sets), oxblood + a faint letterpress emboss. `fonts/Yinit.otf` (public-domain illuminated set) is kept for a possible *second* drop-cap style later (Gwern-ish variety), not wired yet.

> The heading look and the Contents-list ("legend") look are still being **workshopped** — see Pending rebuild steps 3–4.

> From Gwern: borrow ONE decorative initial via `::first-letter`. Skip his system (random per-letter fonts, light/dark sets, build scripts, themed dropcap packs) — that's the complexity he warned us off.

### Ornaments & texture
- **Drop caps** (Royal Initialen via `::first-letter`, oxblood + faint emboss) on the first paragraph of the Colophon/Welcome and long entries.
- **Aged paper:** a CSS patina on `body` — foxing stains + edge vignette + a fine SVG-noise grain. No image file.
- **Woodcut / engraving illustrations** from public-domain archives (Old Book Illustrations, rawpixel PD) as external SVG/PNG. The masthead currently uses an inline SVG ornament (swap for a woodcut anytime).
- **Star dividers** `★ ★ ★ ★ ★` and thin oxblood/hairline rules.
- **Manicule** (pointing-hand ☞) for "back to top" and permalinks.
- Single centered column, generous whitespace, everything eased (`transition: 0.25s ease`) but subtle.

---

## Content model: one dated stream ("Day-book")

Merge the old separate `POSTS` (writing) and `PLATES` (photos) into **one chronological stream**. Each entry carries only what it has — text, an image, or both:

```js
const ENTRIES = [
  { slug, date:"2026-06-17", title:"", body:"<p>HTML…</p>", image:"", caption:"" }
  // title / body / image / caption all OPTIONAL
];
```

Render rule (no entry "types"):
- image only → a photo post · text only → a writing post · both → both, stacked.
- title + long body → collapses (title is the toggle); a bare photo or quick note shows inline.
- newest first.

This makes posting feel natural — a record of your days, not content sorted into bins. (If a photos-only grid is ever missed, add a tiny filter — not before.)

**Other data arrays (unchanged):**
```js
const LISTENING = [ { album, artist, note, url } ];
const LINKS     = [ { title, url, note } ];
```

Arrays live between `// === POSTS_START/END ===` (and equivalents) markers, serialized with `JSON.stringify(arr, null, 2)` so the in-site editor can find-and-replace reliably and bodies with quotes/backticks/newlines escape correctly.

---

## Sections (each a collapsible fold under Contents)

1. **Masthead** — inline SVG ornament (also the easter egg), title in display face, italic tagline, lowercase byline. Always visible.
2. **Contents** — the persistent menu. Lists every section + (under the Day-book) each entry; discreet `◆` admin link. Always visible; drives the accordion.
3. **Welcome / Colophon** — intro blurb (drop cap); Colophon documents how the site is made (typefaces, build, host, editor, ornaments, credits to fromjason/near.blog).
4. **Day-book** — the unified stream above. Newest first; long entries collapse; permalink manicule copies `#slug`.
5. **Listening** — hand-curated album/artist/note/link list (`LISTENING`).
6. **Marginalia** — curated links (`LINKS`).
7. **Admonitions** — anonymous feedback. **Now:** a link out to `admonymous.co/uday-gupta` (their backend handles inbox + spam). **Later option:** a native letterpress-styled form posting to a free form service (Web3Forms / Formspree) so it lives in-site — anonymous inbox needs *some* backend; borrow one, run none.
8. **Footer** — small ornament, year, colophon line, social/email.
9. **Admin (hidden)** — see below.

---

## Trinkets (trimmed for calm)

CRT/neon trinkets are cut. Kept, quiet and in-theme: back-to-top manicule; one subtle easter egg (click masthead ornament → hidden printer's mark); optional ambient audio toggle (OFF by default, currently left out).

---

## Admin panel / in-browser editor

Hidden section, always in the DOM, revealed via `#admin` / the `◆` link. Styled to match the site.

### Auth — option B: passphrase decrypts a committed, encrypted token (no backend)
- A **fine-grained GitHub PAT**, scoped to **this one repo, `contents: write` only**, **AES-GCM encrypted with a passphrase-derived key (PBKDF2 via `crypto.subtle`)** and committed into `index.html` as ciphertext (`CONFIG.TOKEN_CIPHER`). Plaintext token never in the file or git. `encrypt-token.html` produces the ciphertext (throwaway).
- Passphrase input → derive key → decrypt → token held in memory. Wrong passphrase → decrypt throws → editor stays locked (real gate, not a client-side `if`).
- **Threat model:** static site, so the only risk is the token leaking; ciphertext is public but useless without the passphrase (offline brute-force only → strong passphrase). If it leaks anyway: revoke, blast radius is one repo. Upgrade path: a Worker holds the token server-side (option C), additive.

### Editor — textarea, not `execCommand` (deprecated)
- **Fields:** Title; Slug (auto from title, editable); Date (`<input type="date">`, defaults today); Preview; **Image URL (optional)**; (Caption optional). Body is optional too — an entry can be image-only.
- **Body:** a `<textarea>` of raw HTML + a toolbar that wraps the selection via `selectionStart/End` (strong/em/H2/H3/lists/blockquote/code/link/img/hr).
- **Live preview:** `preview.innerHTML = textarea.value`, styled like a real entry.
- **Edit existing:** dropdown loads an entry's fields back in; same publish flow.

### Publish
`GET` contents/index.html (content+SHA) → parse the `ENTRIES` block between markers → insert/replace newest-first → re-serialize with `JSON.stringify` → reassemble → base64 → `PUT` with SHA + `new post: {title}`. Handle invalid passphrase, bad/expired token, network failure, rate limit, **SHA conflict (re-fetch + retry)** — clear message each. Success → "live in ~a minute" + Reload.

### Migration path (deferred)
If the file gets heavy (~40+ entries): move arrays to a `posts.json` fetched on load; publish targets that file. Same UI. Don't build until it hurts.

---

## Pending rebuild (ordered punch list)

### Done ✅
- **Type system** — IM Fell DW Pica everywhere; **headings finalised as Fell roman** (the small-caps cut was dropped for headings). Aged-paper background + palette.
- **Drop caps — both faces wired & tuned.** Royal **and** Yinit (`fonts/Yinit.otf` now registered via `@font-face`). Insertable **anywhere, any number of times** (gwern-style) via the editor's `drop-cap` / `cap²` buttons → `:dropcap:` / `:dropcap2:` directives; re-click toggles off, other button switches face. Sizing tuned with the (now-deleted) `dropcap-tuner.html`; the secret was a big **negative `margin-bottom`** to crop each font's hollow lower em-box.
- **Slim nav** (replaces the old big "Contents" list/tree) — a quiet centred row *Welcome · Writing · Listening · Plates · Marginalia · Colophon · ◆*; the dated stream carries the page. (rotational-style; spec step 3 ✅.)
- **Markdown editor.** Body is written in **Markdown**, not raw HTML. A tiny hand-rolled `mdToHtml()` (no library) renders both the live preview and the site. Toolbar inserts Markdown; special site bits are one-line directives (`:dropcap:`, `:fig-left: url | caption`). Toolbar redesigned as tactile "keys"; a **cheatsheet** is pinned beside the writing area; focus-stealing bug on H2/quote fixed.
- **`#admin` is a full-screen route** (not a fold): visiting `#admin` hides the whole site and shows only the writing desk; leaving it restores the site.
- **Real publishing pipeline (code side).** Publish now commits straight to GitHub: passphrase → PBKDF2/AES-GCM decrypt of `CONFIG.TOKEN_CIPHER` → token in memory → GET live `index.html` → parse the **live** `POSTS` block (safe across devices) → insert/replace newest-first → `PUT` with sha (409 conflict → one re-fetch + retry). Human error message per failure mode. **Image upload from device**: `<input type="file">` → base64 → committed to `images/`, `raw.githubusercontent.com` URL auto-filled (empty Cover field claims it, else inserted in body at cursor). While `TOKEN_CIPHER` is `null`, Publish falls back to local/in-memory so the desk still works.
- **Editor niceties** — auto date (today, no field); date renders pretty ("Saturday, June 20, 2026") **below the title/preview line**; undo stack + ↶ button + Ctrl+Z; mobile-friendly (touch targets, stacks); blockquote = oxblood side-rule + upright faded text; inline **floated figures** with captions (`fig◧`/`fig◨` → `:fig-left/right:`).
- Aesthetic + accordion-fold groundwork from earlier sessions.

### Done since (July 2–4, 2026) ✅
- **Site is LIVE**: https://udvibin.github.io/the-troubled-corner/ (Pages enabled; rode out a
  GitHub Pages incident on Jul 2).
- **Footer identity**: AI-generated engraved tailpiece (`images/tailpiece.jpg`, 0.56MB) with
  the "sinking page" blend (negative margin + mask + multiply); hat printer's-device SVG in
  the masthead; smoke-wisp animation removed (uncommitted in working tree).
- **Plates section removed entirely** (array, render, lightbox, nav entry).
- **UX fixes**: fold-open fade animation; `overflow-x:hidden` scrollbar fix.
- **STRUCTURE DECIDED — the Day-book** (brainstormed to convergence; full design doc:
  `docs/superpowers/specs/2026-07-04-day-book-design.md`; visual reference: `mock.html`).
  One dated ENTRIES stream (essay/song/picture/inspiration), last 3 essays on the page,
  month-grouped ledger archive waking below (unfold-in-place), doors at the foot only,
  no nav bar, no full/brief toggle, no marginalia register. Date under title; a blog's
  songs share the date line. Spotify album links, `target="_blank"` (answers old to-do 3 —
  links, not embeds).
- **Trinkets pressed** (Claude Design + design system "the troubled corner" synced from
  this repo): 6 ornaments won and wired into `mock.html` as `<symbol>`s — seed-pod
  end-mark, four-petal-fleuron divider, fern-crozier door pointer, ivy month flourish,
  syrinx song mark, snail inspiration mark. See `trinkets.md` for the registry + prompts.

### To do (next session)
1. ~~BUILD THE DAY-BOOK into `index.html`~~ ✅ **DONE 2026-07-05** — ENTRIES array
   (essay/song/picture/inspiration) between `ENTRIES_START/END` markers, renderStream/
   renderArchive/renderListening/renderFooter, editor type-picker, publishing parses
   ENTRIES (`commitChange`), all six trinkets wired with instant `.tip` tooltips.
   Footer text decided: "all of it, by me" / "more of me:" above the link row /
   "since 2026". The desk can now **edit or delete ANY entry** (dropdown lists all;
   essays matched by slug, small entries by type+date+text; edits keep the original
   date; Delete asks first). check.js rebuilt (scratchpad), all checks green; verified
   with headless-Edge screenshots. **Remaining**: Uday eyeballs the live page, then
   delete `mock.html` + `Selected Ornaments - Final.html`.
2. ~~Fill the footer social URLs~~ ✅ done 2026-07-05 (github/instagram/spotify/
   letterboxd profiles wired; footer = "all of it, by me · since 2026" + "more of me"
   with the fern pointing at the link row).
3. ~~Go live for publishing~~ ✅ done 2026-07-05 — TOKEN_CIPHER set in CONFIG,
   encrypt-token.html deleted (recoverable from git history if a re-key is ever
   needed). Publishing verified end-to-end from the live site (2026-07-07: the desk
   made real commits). Re-keyed once after a forgotten passphrase.
4. ~~Commit housekeeping~~ ✅ done 2026-07-15 — `images/tailpiece.png` (3.8MB original)
   deleted (the served `tailpiece.jpg` stays); `AGENTS.md` committed. `mock.html` +
   `Selected Ornaments - Final.html` kept in the working tree for now (Uday's call —
   they're untracked, so deleting would be unrecoverable).

### Landed 2026-07-15 — mobile polish + link-sharing basics ✅
- **Masthead fits phones**: title `clamp()` minimum lowered (2.4rem → 1.5rem, 7.5vw
  preferred) so "— the troubled corner —" sits on one line down to 320px; ornament
  88px and tighter padding on mobile — the newest entry now lands above the fold.
- **Footer un-shrunk on mobile**: the old phone override made it fine print; it now
  holds desktop sizes (`footer` .95em) and the link row wraps on a roomy line-height.
- **Tailpiece with presence on phones**: 135vw wide, biased 12vw left so the man and
  tree keep their place and the red sun stays just in frame (right field crops away).
- **iOS paper fix**: the patina (foxing/vignette/grain) moved from
  `background-attachment:fixed` (ignored by iOS Safari — would stretch the vignette
  over the whole scroll height) to a `position:fixed` `body::before` pane. Desktop
  renders identically.
- **Link-sharing basics**: `<meta name="description">`, `og:title/description/image`
  (the tailpiece), `theme-color` paper tint, and a `favicon.svg` — the hat device
  re-cut with heavier strokes so it reads at 16px.
- Dev nicety: `.claude/launch.json` serves the folder locally for previewing.

### Landed since the build (2026-07-06 → 07)
- **The desk is gated**: `#admin` shows one centred passphrase field (with a
  show/hide toggle); the form appears only after the passphrase decrypts the token
  (`unlock()` → same `getToken` crypto — a door in front of the real lock). While
  TOKEN_CIPHER is null the desk opens directly (local-only mode).
- **Batched publishing**: Save/Delete only stage ops (`pending` queue) and re-render
  the local page; "Publish N changes" replays the queue onto the freshly-fetched live
  file and PUTs ONE commit (sha + 409 retry preserved). `beforeunload` guards staged
  work. Image uploads still commit immediately (their URL must exist first).
- **Delete + edit any entry** from the desk dropdown; edits keep the original date.
- **Song lines, final design**: your words (never a link) · fern · the track/album/
  playlist **name as the hyperlink**. The name auto-fills from a Spotify link via
  their public oEmbed endpoint (CORS-open; title+thumbnail only). **Artist is
  unfetchable browser-side** — confirmed: oEmbed has no artist field, the embed page
  has it but sends no CORS header, the real API needs credentials a serverless site
  can't hold — so there is no artist field; old saved `artist`/`art` fields render/
  are ignored harmlessly. Album-art experiment (oxblood duotone stamp) was tried and
  rejected — links, not pictures.
- **Essays can carry date-line songs from the desk**: the same Link/Song fields on
  the essay form append `{song,url}` to `songs[]`; existing songs survive edits
  (removal = hand-edit, deliberately). Listening register uses the same line design,
  tagged `· with "essay title"`.
- **No manicule anywhere**: ferns point everywhere instead (flipped = back, rotated
  = up/top button); colophon prose updated.
- **Clean URLs**: leaving the desk uses `history.replaceState` (no dangling `/#`).
5. **Trinket iterations** (Claude Design, new chat per ornament): improve ivy tendril
   (snail done in-code 2026-07-04 as a concentric spiral); unpressed: plate frame,
   smoke curl. **Masthead device**: Uday isn't sold on the hat — press candidates in
   Claude Design like the other trinkets, swap in a winner.
6. **Tagline** — placeholder "writing, mostly"; needs a brainstorm (Uday said all
   current candidates are bad).
7. **dropcat** — parked in `dropcat.md`.

**Reference (liked):** [rotational.co.uk](https://rotational.co.uk/) — calm single-column serif blog; slim horizontal nav; newest-first stream; hairline separators; writing carries it. Other touchstones: fromjason.xyz, near.blog, sive.rs, stephango.com, wiki.xxiivv.com.

## Open decisions
- **Fonts:** ✅ locked — IM Fell DW Pica everywhere; **headings = Fell roman**.
- **Drop caps:** ✅ locked & tuned — Royal + Yinit, both selectable per paragraph.
- **Heading style:** ✅ resolved — Fell roman (small-caps cut retired for headings).
- **Contents / legend:** ✅ resolved — slim horizontal nav.
- **Editor model:** ✅ resolved — Markdown.
- **Day-book name:** ✅ resolved — the day-book (the page itself wears no section name; see the 2026-07-04 design doc).
- **Tagline:** still open — "writing, mostly" is a placeholder; Uday to decide.

## Conventions
Single file, zero deps, comment heavily for learning (lean code, rich comments). Post bodies are **Markdown**. See `CLAUDE.md`.
