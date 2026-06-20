# CLAUDE.md — house rules for this project

A personal website: one calm, antique-letterpress page. The author is **new to web dev** and using this as a crash course, so favour clarity over cleverness.

## What is where

Everything ships as plain static files — no framework, no build step, no server.

- **`index.html`** — the entire site. Internally, top to bottom:
  - `<head>` — meta + the web-font `<link>` (IM Fell DW Pica + its small-caps `SC` cut, from Google).
  - `<style>` — all CSS. Colours/sizes are CSS variables in `:root`.
  - first `<script>` — **DATA**: `POSTS`, `LISTENING`, `PLATES`, `LINKS` arrays + `CONFIG`. Add content by copying a block in these arrays.
  - `<body>` — page structure. Sections hold **empty containers** (e.g. `#writing-list`) that JS fills.
  - last `<script>` — **BEHAVIOUR**: render functions, click/scroll/routing, the hidden editor, publishing.
- **`fonts/`** — self-hosted font files Google doesn't serve: `RoyalInitialen.ttf` (the drop-cap face, wired via `@font-face`) and `Yinit.otf` (a public-domain illuminated set kept for a possible second drop-cap style later).
- **`encrypt-token.html`** — throwaway tool to encrypt the GitHub token for the editor. Run once, then delete.
- **`spec.md`** — the full design/spec source of truth.
- **`CLAUDE.md`** — this file.

## Conventions (follow these when editing)

- **Single-file *code*, assets alongside.** All code + content + structure live in one `index.html` (CSS in `<style>`, JS in `<script>`, content in the data arrays). The rule that actually matters: **no framework, no build step, no server, no libraries.** *Assets are not code* — fonts live in `fonts/`, images are URLs; sibling asset files are expected, not a violation. **Never base64-embed a font/image into the HTML** (bloats the file, kills readability). Web Crypto (`crypto.subtle`) is browser-built-in and allowed.
- **Comment heavily for learning.** Explain *what a block does and the mechanism (why)* in plain language above non-obvious CSS/JS/HTML — the author is learning. Skip trivial lines. Keep the actual code minimal (ponytail): rich comments, lean code.
- **Aesthetic: antique letterpress.** Aged-paper ivory `#f3efe3` (with a CSS patina: foxing stains + edge vignette + SVG grain on `body`), warm ink `#1f1b16`, oxblood `#7c1f1f`. Type is **IM Fell DW Pica** everywhere; headings are its small-caps cut + tracking; drop caps are **Royal Initialen**. No neon/CRT/glow/scanlines — that direction was retired.
- **Posts:** stored as HTML strings in `POSTS`, between the `// === POSTS_START/END ===` markers. The in-site editor regex-replaces that block, so don't rename the markers; serialize with `JSON.stringify`.
- **Auth (editor):** a fine-grained, single-repo `contents:write` GitHub token, AES-GCM encrypted (Web Crypto) and stored in `CONFIG.TOKEN_CIPHER`. Never commit a plaintext token.
- **Navigation:** accordion — Contents is the persistent menu; sections are collapsible folds, one open at a time (no URL-hash pages). See `spec.md`. (`#admin` still reveals the hidden editor.)
- **Content model:** one dated **Day-book** stream (`ENTRIES`); each entry has optional title/body/image/caption. (Replaces the old separate Writing + Plates.)

## Host
GitHub Pages (`git push` deploys). Custom domain and a Cloudflare/Worker upgrade are deferred, additive — not built.
