# trinkets — the ornament set

One-of-one printed ornaments for the site, generated in Claude Design (project:
**the ornament press**, design system: **the troubled corner**, type: Prototype).
Until each is won, the site/mock wears the placeholder listed. When one wins:
open `</>` in Claude Design, copy that mark's `<svg>…</svg>`, paste it to Claude
Code as text — it gets wired in and this file updated.

## The brief (paste once when starting a fresh Design chat)

> You have my design system. For each ornament I request, show 8 distinct variations,
> each displayed three ways: (1) at 16px ending a real sentence of body text,
> (2) at 28px centered alone between two paragraphs, (3) at 72px for inspecting linework.
> Hard constraints: inline SVG with a viewBox, pure vector paths, single colour via
> currentColor. No text characters, no emoji, no gradients, no filters, no images.
> Style: 18th-century copperplate engraving / printer's fleuron — stroke-drawn, tapering
> lines, slightly imperfect, and it must survive 16px without turning to mud.

Judging rule: the 16px specimen decides. If it can't end a sentence legibly, it's dead.

## The set

| # | trinket | where it lives | placeholder now | status |
|---|---------|----------------|-----------------|--------|
| 1 | **end-mark** — a full stop that blooms; closes every essay | after the last paragraph of each post (site stamps it, replaces the final period) | ❦ | sheet made; leaning **vii closed bud** (also eye **iii curl of smoke** — rhymes with the hat) |
| 2 | **entry divider** — slim 5:1 vine/fleuron spray | between entry clusters in the stream | ★ ❦ ★ | not started (note: end-mark sheet's **viii paired volutes** could widen into this) |
| 3 | **door pointer** — delicate engraved arrow/tendril after links | wake line + foot doors | → | not started |
| 4 | **month-head flourishes** — mirrored sprig pair | flanking month names in the archive | none (bare small caps) | not started |
| 5 | **song mark** — lyre / bird / botanical quaver | fronting `played` entries | text label "played" | not started |
| 6 | **inspiration mark** — pressed leaf / palm / stone | fronting `inspiration` entries | text label "inspiration" | not started |
| 7 | **plate frame** — hairline double rule + corner ornaments | around photos | unframed images | not started (corners are the SVG; rules can be CSS borders) |
| 8 | **smoke curl** — one tapering line, 3–4 lazy loops | vertical accent; companion to the hat | none | stretch goal |

## Prompt lines (one per message, same chat)

1. `Ornament 1: a tiny end-of-essay mark, a full stop that blooms — a small leaf, a curl of smoke, or a seed-pod flourish. Quiet enough to end a sentence without shouting.`
2. `Ornament 2: a slim horizontal divider, about 5:1 wide, a symmetric vine or fleuron spray that separates diary entries.`
3. `Ornament 3: a small forward-pointing mark to sit after a link — a delicate engraved arrow or sprouting tendril. Not the chunky unicode manicule.`
4. `Ornament 4: a matched mirrored left/right pair of small sprigs to flank a small-caps month name, like a chapter heading.`
5. `Ornament 5: a tiny music indicator that isn't a modern note glyph — a small lyre, a bird mid-song, or a quaver drawn like a botanical specimen.`
6. `Ornament 6: a tiny found-things indicator — a pressed leaf, an open palm, or a small stone, engraved.`
7. `Ornament 7: a thin rectangular photograph frame — hairline double rule with small corner ornaments, like an engraved plate mount in an old book. Make the corners the SVG; the rules can be CSS borders.`
8. `Ornament 8: a thin rising curl of pipe smoke, three or four lazy loops, drawn in one tapering line.`

## House rules

- One ornament role per thing — each mark separates or marks exactly ONE kind of
  content, or the page becomes a sticker album.
- All marks: single-path-ish, `currentColor`, 24-unit square (end-mark family),
  dot on the text baseline.
- Parked: **dropcat** (A–Z cat drop caps — own project, own pipeline, see dropcat.md).

## Won so far (2026-07-04) — SHIPPED in index.html (2026-07-05)

All six live in **index.html** as `<symbol>` defs — `#o-seed #o-fleuron #o-fern
#o-ivy #o-syrinx #o-snail` — stamped by the render functions, never typed. Sizes and
positions: the **trinket control panel** block in index.html's `<style>`.
(`mock.html` and `Selected Ornaments - Final.html` can be deleted once Uday has
eyeballed the live page.)

| # | winner | placed as | note |
|---|--------|-----------|------|
| 1 | iv · seed-pod | end-mark **replacing** each essay's final full stop (no period before it) | done — sized up to 1.2em |
| 2 | ii · four-petal fleuron | divider, bare | done — stars removed, sized up to 8em |
| 3 | v · fern crozier | pointer after door/wake links | done — sized up, lowered (vertical-align −.3em) |
| 4 | viii · ivy tendril | flanking month names (mirrored pair) | **iterate later** — Uday wants it improved |
| 5 | iv · the syrinx | alone before song lines — "played" label removed; a `.tip` wrapper span shows a styled instant tooltip on hover and feeds screen readers (one `aria-label` does both) | done |
| 6 | vi · snail shell → **concentric spiral** | alone before inspiration lines — same `.tip` wrapper | redrawn in-code: semicircle arcs about two centres = perfectly even coils, heavy dot at the centre |

Tuning: all six sizes/positions live in the **TRINKET CONTROL PANEL** block in
mock.html's `<style>` — one commented line per mark; edit, save, refresh.

Still unpressed: 7 plate frame, 8 smoke curl (optional).
