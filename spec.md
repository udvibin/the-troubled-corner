# Personal Website — Spec

> The single source of truth. (The old `website-prompt.md` and its CRT/Gen-X aesthetic are retired and deleted.)
> This is an antique-letterpress site: calm, neutral, welcoming. Like a well-made old book you stumbled into.

## What it is

A personal space to explore and develop a style. Low stakes — not a portfolio, not for an audience.
One person's calm corner of the web. Inspiration: [fromjason.xyz](https://www.fromjason.xyz/) (aesthetic), [near.blog](https://near.blog/) (simplicity), and a few restrained ideas from [gwern.net](https://gwern.net/) (typography/dropcaps — borrow taste, not the machinery).

## Hard constraints (locked)

- **Single `index.html`** — all CSS in `<style>`, all JS in `<script>`, all content inline. Zero frameworks, zero build step.
- **One page, accordion navigation** (see Navigation) — no URL-hash "pages".
- **Allowed external resources** (media/code lives *outside* the file, that's fine):
  - One Google Fonts `<link>` (load-bearing — see Typography).
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
| paper | `#f4f1e8` | background (warm ivory, never white) |
| ink | `#1a1a1a` | body text (warm near-black) |
| oxblood | `#7c1f1f` | accent: masthead, dates, tags, rules |
| faded | `#6b6256` | secondary text: metadata, captions, previews |
| hairline | `rgba(26,26,26,0.12)` | thin rules / dividers |

No neon, no glow, no scanlines. Contrast comes from serif weight and oxblood, not light effects.

### Typography
One Google Fonts `<link>` is load-bearing — system fonts can't produce this look. Current: `IM Fell English` (display) + `EB Garamond` (body), ~18–19px, line-height ~1.6, reading measure max-width ~680px, single centered column, tracked small-caps subheads, optional mono for code.

**Exploration board (all free, Google Fonts) — pick to try:**
- *Display:* IM Fell English *(current)* · Cormorant Garamond · Playfair Display · Libre Caslon Display · UnifrakturCook (blackletter)
- *Body:* EB Garamond *(current)* · Crimson Pro · Spectral · Lora
- *Dropcap initial (via `::first-letter`):* IM Fell *(current)* · Goudy Initialen · UnifrakturCook (blackletter initial)

> From Gwern: borrow ONE decorative initial via `::first-letter`. Skip his system (random per-letter fonts, light/dark sets, build scripts, themed dropcap packs) — that's the complexity he warned us off.

### Ornaments & texture
- **Drop caps** on the first paragraph of the Colophon/Welcome and long entries (CSS `::first-letter`).
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

## Pending rebuild (do in ONE pass)
The current `index.html` still has the old separate Writing/Plates sections and hash-route colophon. Next build pass consolidates:
1. Convert all sections to the **accordion**; fold the colophon back in; drop the hash router.
2. Merge `POSTS` + `PLATES` → the unified **Day-book** `ENTRIES` stream; update the editor for the optional image field.
3. Apply chosen **fonts + dropcap**.
Admonitions link is already in place.

## Open decisions (pick by gut)
- **Day-book name:** `Day-book` (recommended) · `Commonplace` · keep `Writing`.
- **Font direction:** stay antique (IM Fell / Garamond) · or swap from the board above.
- **Dropcap:** keep IM Fell · Goudy Initialen · blackletter (UnifrakturCook).

## Conventions
Single file, zero deps, comment heavily for learning (lean code, rich comments). See `CLAUDE.md`.
