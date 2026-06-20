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

Copy a block in the content arrays inside the DATA script in `index.html`. There's also a hidden in-browser editor at `#admin`, gated by a passphrase that decrypts a GitHub token (AES-GCM, Web Crypto) and publishes posts via the GitHub API.

## Deploy

GitHub Pages — `git push` deploys to <https://udvibin.github.io/the-troubled-corner/>.
