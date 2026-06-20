# dropcat — a full-alphabet cat drop-cap set (side-project, someday)

A parking doc for a fun idea: a complete **A–Z set of illustrated drop caps where each letter is drawn as a cat**, in the spirit of gwern's "dropcat". Not building now — just writing it all down so we can pick it up later.

## The idea

gwern made a set of drop caps called **dropcat**: per-letter illustrations where the initial letter *is* a cat (or made of cats). They're gorgeous. We want our own, covering the **whole alphabet**, so any post can open with a cat initial — alongside the existing Royal Initialen and Yinit drop caps.

Source for reference / inspiration: <https://github.com/gwern/gwern.net/tree/master/font/dropcap/dropcat>

## What gwern's set actually is (so we don't repeat the mistake of expecting a font)

- **Not a font.** It's a folder of per-letter **image files** — `light/` and `dark/` variants, each letter as `.svg` + `.png` (with `-small-1x` / `-small-2x` raster sizes).
- **Full colour, illustrated.** That's why it can't be a normal monochrome webfont; colour fonts (COLR/SVG-in-OpenType) are a pain and patchily supported.
- **Partial alphabet.** Only some letters exist (seen: B, C, G, I, Q…), each with several hand-drawn variants. No format conversion creates the missing letters — that's the whole reason we'd build our own.

**Conclusion:** ours should also be **image-based** (float a PNG/SVG where the drop cap goes), NOT a font. Same look, none of the font toolchain.

## The plan, when we do it

1. **Decide the style.** Pick one consistent look so all 26 read as a set (line weight, colour — likely our oxblood `#7c1f1f` on ivory, framing, level of detail). Letterpress/woodcut cats would fit the site; full-colour gwern-style is an option too.
2. **Generate A–Z.** AI-generate each letter as a cat forming/becoming that letter, in the chosen style. The hard part is **style consistency across 26 images** — fixed prompt + seed discipline, or generate many and cull. This is the real work and a bit of a gamble.
3. **Clean up.** Crop/trim to consistent bounds, transparent background, export SVG if we can (scales cleanly) else high-res PNG (2× for retina). Keep them small.
4. **Vendor them.** Drop into `images/dropcat/` (or `fonts/dropcat/`), named simply: `a.svg … z.svg`.
5. **Wire into the editor + site.** A drop-cap option (sibling to the `drop-cap` / `cap²` buttons) that, for a paragraph, replaces the first letter with the matching cat image floated like a drop cap. Sketch:

   ```html
   <p class="dropcat"><span class="cap-img" style="--cap:url(images/dropcat/w.svg)"></span>hen the press comes down…</p>
   ```
   - The first letter is pulled out and rendered as the image; the rest of the word follows.
   - CSS floats `.cap-img` left at ~3 lines tall (mirror the Royal/Yinit `::first-letter` sizing), oxblood-tinted if monochrome.
   - Editor button: take the paragraph, peel the first letter, look up `images/dropcat/<letter>.svg`; if it exists, use it; else fall back to a font drop cap. (Our generated set will be full A–Z, so the fallback is just a safety net.)

## Open questions / gotchas

- **Licensing of gwern's originals** — couldn't find a LICENSE in that folder. If we ever ship any of *his* files (vs. our own generated set), confirm the license first. Generating our own sidesteps this.
- **Style consistency** across 26 generated letters is the make-or-break.
- **SVG vs PNG** — SVG scales and tints cleanly; AI gen usually outputs raster, so we may be on high-res PNG and just size carefully.
- **File weight** — 26 images; keep each lean so the page stays light. Lazy-load is fine since drop caps appear inside posts.
- **`::first-letter` can't do this** (it can't be an image), hence the peel-the-first-letter-into-a-span approach above.

## Why it's worth doing

It's the kind of pointless-but-delightful detail the whole site is for. A cat opening every post. That's it. That's the reason.
