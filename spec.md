# The Troubled Corner — Current Spec

This file describes the current site. The final section lists unbuilt ideas.

## Purpose and rules

A personal site for essays, songs, pictures, and found things. One calm page with an antique letterpress style.

- All site code, CSS, structure, and content live in `index.html`.
- No framework, build step, server, or libraries. Browser Web Crypto and Canvas are allowed.
- Fonts and images stay in separate files or use URLs. Never base64-embed these assets in HTML.
- Keep code small. Explain non-obvious code in plain comments.
- GitHub Pages hosts https://udvibin.github.io/the-troubled-corner/. Pushing `master` starts deployment.
- JavaScript renders posts and runs the editor. This is not a PWA: no web app manifest, service worker, or offline mode.
- No sounds or sound switch.

## Files

- `index.html`: site, styles, data, editor, and publishing.
- `fonts/RoyalInitialen.ttf`, `fonts/Yinit.otf`: drop-cap fonts.
- `images/og.jpg`: shared link-preview image. `images/tailpiece.jpg`: footer engraving.
- `favicon.svg`: tab icon.
- `checks.cjs`: Node checks, no packages required.
- `encrypt-token.html`: local reset tool, ignored by Git. It does not ship with the site.
- `trinkets.md`: ornament registry. `dropcat.md`: deferred cat drop-cap idea.
- `docs/superpowers/specs/2026-07-04-day-book-design.md`: original day-book design reference.
- `mock.html` and `Selected Ornaments - Final.html`: local design references, ignored by Git.

## Page structure

No top menu, section pages, or strict accordion.

1. Masthead: hat ornament, title, byline, and the tagline “thoughts, musings, found things — kept in one place”. Clicking the ornament shows a hidden printer's mark.
2. Stream: newest three essays plus small entries as new as the oldest of those essays. Entries sort by date. Entries on the cutoff date stay together; with no essays, all small entries show.
3. Archive: a wake link reveals older entries, grouped by month. Essay title buttons open full text in place. Song rows use the same link format as the stream.
4. Doors: listening register, external Admonymous link, and colophon. Listening and colophon open in place.
5. Footer: site identity, email/social links, and engraved tailpiece. A back-to-top button appears after scrolling.

`#admin` hides the public page and opens the full-screen writing desk. `#post-slug` opens an essay, including one in the archive. Leaving the desk removes the admin hash.

## Visual design

| Name | Value | Use |
| --- | --- | --- |
| Paper | `#f3efe3` | Aged ivory background |
| Ink | `#1f1b16` | Main text |
| Oxblood | `#7c1f1f` | Accents and headings |
| Faded | `#6b6256` | Secondary text |
| Hairline | `rgba(26,26,26,.12)` | Thin rules |

IM Fell DW Pica is the main typeface, loaded from Google Fonts with its SC cut. Headings use Fell roman. Body size is 20px on desktop and 18px on phones. Main reading width is 680px.

Royal Initialen and Yinit both work as drop caps, in multiple paragraphs. Block gaps use the spacing variables in `:root`; small gaps can use separate values.

A fixed `body::before` draws stains, edge shading, and SVG grain. This avoids the iOS fixed-background issue. The footer uses a JPEG engraving with a blend and mask; the phone layout crops and scales it.

Six SVG symbols supply the seed-pod, fleuron, fern, ivy, syrinx, and snail. Renderers stamp these symbols. Song and inspiration marks have text tooltips. No manicule, neon, glow, or scanlines. Reduced-motion CSS stops archive and door opening animations.

## Content

One `ENTRIES` array holds four types:

| Type | Fields |
| --- | --- |
| Essay | `type`, `slug`, `date`, `title`, `preview`, Markdown `body`, optional `cover`, `songs` |
| Song | `type`, `id`, `date`, `text`, optional `url`, `song` |
| Picture | `type`, `id`, `date`, `src`, `caption` |
| Inspiration | `type`, `id`, `date`, `text`, optional `url` |

New small entries get stable IDs. Editing an old small entry gives it an ID. Old entries without IDs match by saved fields. Essays match by slug.

Keep the `// === ENTRIES_START ===` and `// === ENTRIES_END ===` markers. Publish uses `JSON.stringify` and escapes less-than signs so text cannot end the surrounding script.

The page and preview share `entryHTML()` and `mdToHtml()`. Markdown supports bold, italic, inline code, H2/H3, quotes, lists, links, images, and rules. Directives add `:dropcap:`, `:dropcap2:`, and `:fig-left/right: url | caption`. Raw HTML remains an author-trusted option; the renderer does not sanitize it.

The listening register collects song entries and essay songs. There are no separate `LISTENING`, `LINKS`, or `PLATES` arrays. Legacy artist fields still render. Song links open the source; there is no embedded music player.

## Writing desk

Open `#admin`, enter the passphrase, and select Unlock. The type picker shows the fields needed for each post type.

- New posts use today's local date. Edits keep the saved date. There is no date field.
- Essay slugs follow the title until edited by hand.
- The Markdown toolbar inserts text at the selection. It has undo, drop caps, and floated figures. A cheatsheet sits beside the text area.
- The live preview uses the public renderer, with share links hidden.
- Spotify oEmbed can fill an empty song-name field. The name stays editable.
- Essay link/song fields append a song. Removing a saved essay song still needs a source edit.
- The existing-entry list loads a post for edit or delete. Its empty choice starts a new post.
- Save stages changes in memory. Delete asks first, then stages removal. Neither publishes yet.
- Leaving warns about unsaved form text or staged changes. Clear and entry selection ask before discarding text. There is no local draft save or crash recovery.

## Lock and reset

`CONFIG` points to `udvibin/the-troubled-corner`, branch `master`. `TOKEN_CIPHER` holds an encrypted fine-grained GitHub token with Contents write access for this repo.

PBKDF2 uses SHA-256 and 250,000 iterations to derive an AES-GCM 256-bit key. The decrypted token stays in memory. A wrong passphrase fails; refresh forgets the unlocked token. With `TOKEN_CIPHER: null`, the desk opens in local-only mode.

The local `encrypt-token.html` tool accepts a token and new passphrase, makes a fresh salt and IV, and returns encrypted data. It sends no data, saves no secrets, and clears secret fields after success. Keep the passphrase in a password manager. Never commit a plain token or passphrase. Public encrypted data permits offline password guesses, so use a strong phrase.

To reset: supply a saved or new token to the local tool, replace `CONFIG.TOKEN_CIPHER`, then publish the site change. Test unlock and publishing. Revoke the old token if replaced. The tool cannot recover a lost passphrase.

## Publishing and images

Publish fetches live `index.html` through GitHub's contents API, parses the live array, applies staged changes, and sends one commit with the file SHA. A 409 conflict causes one fresh fetch and retry. Errors show in the desk. GitHub Pages then deploys the commit.

Image upload makes a separate commit to `images/` at once. It fills the empty image field, or inserts an image in the body if that field already has a value. Uploads do not wait for Publish.

## Share cards

Each public essay has a “pass it on” line. Story makes a 1080 × 1920 JPEG; Card makes a 1600 × 900 JPEG.

Canvas draws paper effects, date, wrapped title, Royal drop cap, opening text, and site address. It waits for fonts, limits text to fit, and breaks long words. It does not export the whole essay.

A dialog shows the result. Download saves it. Share appears where the browser supports file sharing. Copy link copies the essay URL. Errors have clear messages; a failed share leaves Download available. Closing releases the temporary image URL.

Attach the image to a social post and add the essay link yourself. A pasted link alone uses the shared `og:image`, not the generated essay image. The page has description and Open Graph tags, theme colour, and a favicon. Per-essay social preview pages do not exist.

## Checks and limits

`node checks.cjs` checks script syntax, small-entry add/edit behaviour, safe data serialization, the actual unlock function, wrong-passphrase and changed-data rejection, and share/copy errors. If the local reset tool exists, the checks also use it to make test data.

These checks do not prove visual card layout or phone-app sharing. Test those in a real browser. The new passphrase and token access also need a real unlock and publish check; code checks use a test token.

## Future work — not built

- Explore a public page without JS after using the current editor and making posts. Keep this version until the trial works.
- Custom domain through DNS and `CNAME`.
- Cloudflare Pages or a Worker; a Worker could hold the publishing token on the server.
- Move data to `posts.json` if the single file grows too large, around 40 or more entries. Do not add it before needed.
- A photo-only filter if the need returns.
- A native anonymous message form through Web3Forms or Formspree instead of the external Admonymous link.
- Refine ivy. Try the unbuilt plate frame and smoke curl. Try new masthead designs before replacing the hat.
- The full A–Z cat drop-cap set in `dropcat.md`.

Design references remain From Jason, near.blog, rotational, gwern, sive.rs, stephango.com, and wiki.xxiivv.com. Use `trinkets.md` for ornament work.
