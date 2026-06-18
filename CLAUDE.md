# CLAUDE.md — house rules for this project

A personal website: one calm, antique-letterpress page. The author is **new to web dev** and using this as a crash course, so favour clarity over cleverness.

## What is where

Everything ships as plain static files — no framework, no build step, no server.

- **`index.html`** — the entire site. Internally, top to bottom:
  - `<head>` — meta + the one web-font `<link>` (IM Fell English + EB Garamond).
  - `<style>` — all CSS. Colours/sizes are CSS variables in `:root`.
  - first `<script>` — **DATA**: `POSTS`, `LISTENING`, `PLATES`, `LINKS` arrays + `CONFIG`. Add content by copying a block in these arrays.
  - `<body>` — page structure. Sections hold **empty containers** (e.g. `#writing-list`) that JS fills.
  - last `<script>` — **BEHAVIOUR**: render functions, click/scroll/routing, the hidden editor, publishing.
- **`encrypt-token.html`** — throwaway tool to encrypt the GitHub token for the editor. Run once, then delete.
- **`spec.md`** — the full design/spec source of truth.
- **`CLAUDE.md`** — this file.

## Conventions (follow these when editing)

- **Single file, zero dependencies.** Don't add frameworks, libraries, or a build step. Vanilla HTML/CSS/JS only. Web Crypto (`crypto.subtle`) is browser-built-in and allowed.
- **Comment heavily for learning.** Explain *what a block does and the mechanism (why)* in plain language above non-obvious CSS/JS/HTML — the author is learning. Skip trivial lines. Keep the actual code minimal (ponytail): rich comments, lean code.
- **Aesthetic: antique letterpress.** Warm ivory `#f4f1e8`, ink `#1a1a1a`, oxblood `#7c1f1f`. No neon/CRT/glow/scanlines — that direction was retired.
- **Posts:** stored as HTML strings in `POSTS`, between the `// === POSTS_START/END ===` markers. The in-site editor regex-replaces that block, so don't rename the markers; serialize with `JSON.stringify`.
- **Auth (editor):** a fine-grained, single-repo `contents:write` GitHub token, AES-GCM encrypted (Web Crypto) and stored in `CONFIG.TOKEN_CIPHER`. Never commit a plaintext token.
- **Navigation:** accordion — Contents is the persistent menu; sections are collapsible folds, one open at a time (no URL-hash pages). See `spec.md`. (`#admin` still reveals the hidden editor.)
- **Content model:** one dated **Day-book** stream (`ENTRIES`); each entry has optional title/body/image/caption. (Replaces the old separate Writing + Plates.)

## Host
GitHub Pages (`git push` deploys). Custom domain and a Cloudflare/Worker upgrade are deferred, additive — not built.
