# the troubled corner

A personal website — one calm, antique-letterpress page. Warm ivory paper, oxblood serif, drop caps. A space to write and post, not a portfolio.

Plain static files: **no framework, no build step, no server.** Vanilla HTML/CSS/JS in a single file.

## Files

- **`index.html`** — the entire site. Top to bottom: `<head>` (meta + web-font link) → `<style>` (all CSS, palette in `:root` variables) → DATA script (content arrays + `CONFIG`) → `<body>` (empty containers JS fills) → BEHAVIOUR script (rendering, navigation, the hidden editor).
- **`encrypt-token.html`** — local tool to encrypt a GitHub token with a new passphrase. Git ignores this file; it stays on this computer. It sends no data and stores no secrets.
- **`checks.cjs`** — small code checks. Run with `node checks.cjs`; no packages are needed.
- **`spec.md`** — design/spec source of truth.
- **`CLAUDE.md`** — house rules for editing.

## Run it

Open `index.html` in a browser. That's it. Edit, save, refresh.

## Add content

Copy a block in the content arrays inside the DATA script in `index.html` — post bodies are **Markdown**. The editor at `#admin` has a live preview. An encrypted GitHub token is set: after unlocking, Save stages a change and Publish sends it to GitHub. With `TOKEN_CIPHER: null`, changes stay local and disappear on refresh.

## Reset the passphrase

1. Use your saved GitHub token, or create a new fine-grained token in GitHub Settings → Developer settings → Personal access tokens.
2. Select only `the-troubled-corner`. Give it **Contents: Read and write**, and choose an expiry date.
3. Open `encrypt-token.html` in your normal browser. Enter the token and a new passphrase. Keep the passphrase in a password manager.
4. Press **Encrypt token**. Replace only the `TOKEN_CIPHER` object in `index.html` with the result. Never put the token or passphrase in the source.
5. Publish the change, then test unlocking and publishing. Revoke the old token if you replaced it.

The tool cannot recover the old passphrase. It only encrypts a token you supply. The encrypted result is safe to share; the token and passphrase are not.

## Share cards

Under an essay, choose **story** or **card**. The preview has separate **Download image**, **Share image** (where supported), and **Copy link** controls. Attach the JPEG to your social post and add the link. A pasted link alone uses the site's shared preview image.

## Deploy

GitHub Pages — `git push` deploys to <https://udvibin.github.io/the-troubled-corner/>.
