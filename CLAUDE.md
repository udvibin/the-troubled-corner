# CLAUDE.md — house rules for this project

A personal website: one calm, antique-letterpress page. The author is **new to web dev** and using this as a crash course, so favour clarity over cleverness.

## What is where

Everything ships as plain static files — no framework, no build step, no server.

- **`index.html`** — the entire site. Internally, top to bottom:
  - `<head>` — meta + the web-font `<link>` (IM Fell DW Pica + its small-caps `SC` cut, from Google).
  - `<style>` — all CSS. Colours/sizes are CSS variables in `:root`.
  - first `<script>` — **DATA**: `POSTS`, `LISTENING`, `PLATES`, `LINKS` arrays + `CONFIG`. Add content by copying a block in these arrays. (Post bodies are **Markdown** strings — see below.)
  - `<body>` — page structure. Sections hold **empty containers** (e.g. `#writing-list`) that JS fills.
  - last `<script>` — **BEHAVIOUR**: `mdToHtml()` (a tiny no-library Markdown renderer), render functions, click/scroll/routing, the `#admin` writing desk, publishing.
- **`fonts/`** — self-hosted font files Google doesn't serve: `RoyalInitialen.ttf` and `Yinit.otf` — **both** wired via `@font-face` as drop-cap faces (`.dropcap` / `.dropcap.yinit`).
- **`encrypt-token.html`** — throwaway tool to encrypt the GitHub token for the editor. Run once, then delete.
- **`spec.md`** — the full design/spec source of truth (has the current done/to-do list).
- **`dropcat.md`** — parked side-project idea (a full A–Z cat drop-cap set).
- **`CLAUDE.md`** — this file.

## Conventions (follow these when editing)

- **Single-file *code*, assets alongside.** All code + content + structure live in one `index.html` (CSS in `<style>`, JS in `<script>`, content in the data arrays). The rule that actually matters: **no framework, no build step, no server, no libraries.** *Assets are not code* — fonts live in `fonts/`, images are URLs; sibling asset files are expected, not a violation. **Never base64-embed a font/image into the HTML** (bloats the file, kills readability). Web Crypto (`crypto.subtle`) is browser-built-in and allowed.
- **Comment heavily for learning.** Explain *what a block does and the mechanism (why)* in plain language above non-obvious CSS/JS/HTML — the author is learning. Skip trivial lines. Keep the actual code minimal (ponytail): rich comments, lean code.
- **Aesthetic: antique letterpress.** Aged-paper ivory `#f3efe3` (with a CSS patina: foxing stains + edge vignette + SVG grain on `body`), warm ink `#1f1b16`, oxblood `#7c1f1f`. Type is **IM Fell DW Pica** everywhere; **headings are Fell roman** (the small-caps cut was retired for headings). **Drop caps: Royal Initialen + Yinit**, either selectable per paragraph, insertable anywhere/multiple. No neon/CRT/glow/scanlines.
- **Posts:** **Markdown** strings in `POSTS`, between the `// === POSTS_START/END ===` markers. `mdToHtml()` renders them (the live preview and the site use the same function). Small subset: `**b**`, `*i*`, `` `code` ``, `## H`, `> quote`, `- / 1.` lists, `[](url)`, `![](url)`, `---`; plus directives `:dropcap:` / `:dropcap2:` and `:fig-left: url | cap` / `:fig-right:`. Raw HTML passes through (escape hatch). Don't rename the markers; serialize with `JSON.stringify`.
- **Editor (`#admin`):** a **full-screen hash route** (visiting `#admin` hides the site, shows only the writing desk). Markdown textarea + a tactile-key toolbar + a pinned cheatsheet + a live preview that renders via the same `mdToHtml`. **Publish is currently LOCAL/in-memory** (no commit) while the real backend is pending — see `spec.md` to-do.
- **Auth (editor):** a fine-grained, single-repo `contents:write` GitHub token, AES-GCM encrypted (Web Crypto) in `CONFIG.TOKEN_CIPHER`. Never commit a plaintext token. (The gate + real GitHub `publish()` are written but switched off; the commented real publish is kept in `index.html`.)
- **Navigation:** a **slim horizontal nav** (`renderNav()`) links the folds; sections are collapsible folds, one open at a time (no URL-hash pages, except `#admin`). The old big "Contents" tree was removed.
- **Content model:** still `POSTS` (writing) + `PLATES` (photos) as separate arrays. The planned merge into one dated **Day-book** `ENTRIES` stream is **not done yet** — see `spec.md` to-do.

## Host
GitHub Pages (`git push` deploys). Custom domain and a Cloudflare/Worker upgrade are deferred, additive — not built.
