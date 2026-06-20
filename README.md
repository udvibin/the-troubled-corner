# the troubled corner

A personal website — one calm, antique-letterpress page. Warm ivory paper, oxblood serif, drop caps. A space to write and post, not a portfolio.

Plain static files: **no framework, no build step, no server.** Vanilla HTML/CSS/JS in a single file.

## Files

- **`index.html`** — the entire site. Top to bottom: `<head>` (meta + web-font link) → `<style>` (all CSS, palette in `:root` variables) → DATA script (content arrays + `CONFIG`) → `<body>` (empty containers JS fills) → BEHAVIOUR script (rendering, navigation, the hidden editor).
- **`encrypt-token.html`** — throwaway tool to encrypt the GitHub token for the editor. Run once, then delete.
- **`spec.md`** — design/spec source of truth.
- **`CLAUDE.md`** — house rules for editing.

## Run it

Open `index.html` in a browser. That's it. Edit, save, refresh.

## Add content

Copy a block in the content arrays inside the DATA script in `index.html` — post bodies are **Markdown**. There's also a full-screen in-browser editor at `#admin` (a Markdown writing desk with live preview). Publishing to GitHub (and the passphrase-decrypted token gate) is wired but currently switched off — publish is local-only for now. See `spec.md` for the done/to-do list.

## Deploy

GitHub Pages — `git push` deploys to <https://udvibin.github.io/the-troubled-corner/>.
