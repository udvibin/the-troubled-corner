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

### To do (next session)
1. **Go live (manual steps, ~10 min — the code is done, see Done ✅):**
   - Create a **fine-grained GitHub PAT**: only repo `udvibin/the-troubled-corner`, permission **Contents: Read and write**, nothing else.
   - Open `encrypt-token.html` locally, encrypt the PAT with a strong passphrase, paste the JSON into `CONFIG.TOKEN_CIPHER` in `index.html`. Then delete `encrypt-token.html`.
   - Enable **GitHub Pages** on the repo (Settings → Pages → deploy from `master`), commit + push.
2. **Day-book content model** — still pending: merge `POSTS` + `PLATES` → one chronological `ENTRIES` stream (editor still writes to `POSTS`; `PLATES` is separate). Decide the name (Day-book / Commonplace / keep Writing).
3. **Song / Spotify embeds** — designed (click-to-load facade, host-allowlist) but not built; add a `media`/`song` field + render.
4. **dropcat** — fun side-project, parked in `dropcat.md` (a full A–Z cat drop-cap set).

**Reference (liked):** [rotational.co.uk](https://rotational.co.uk/) — calm single-column serif blog; slim horizontal nav; newest-first stream; hairline separators; writing carries it. Other touchstones: fromjason.xyz, near.blog, sive.rs, stephango.com, wiki.xxiivv.com.

## Open decisions
- **Fonts:** ✅ locked — IM Fell DW Pica everywhere; **headings = Fell roman**.
- **Drop caps:** ✅ locked & tuned — Royal + Yinit, both selectable per paragraph.
- **Heading style:** ✅ resolved — Fell roman (small-caps cut retired for headings).
- **Contents / legend:** ✅ resolved — slim horizontal nav.
- **Editor model:** ✅ resolved — Markdown.
- **Day-book name:** still open — `Day-book` (recommended) · `Commonplace` · keep `Writing`.

## Conventions
Single file, zero deps, comment heavily for learning (lean code, rich comments). Post bodies are **Markdown**. See `CLAUDE.md`.
