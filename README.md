# Amigos360 — website mockup

Static, dependency-free mockup. Open `index.html` directly in a browser — no build step, no npm, no server required.

**Status:** all six pages built — `index`, `portfolio`, `pricing`, `faq`, `book-a-call`, `sign-in`. Content placeholders remain (see TODO at the bottom).

---

## Design direction

**Bauhaus photomontage** — flat colour blocking, geometric primitives, visible grid structure, oversized display type, hard 4px print shadows, *plus duotone photography cut into geometric shapes*.

That last part is the Moholy-Nagy / Lissitzky / Rodchenko Constructivist language: a grayscale plate printed in two inks, cropped to a circle or arch, overlapped with flat colour. It is what makes the direction read as 2D and avant-garde rather than merely clean, and it is period-correct — Moholy-Nagy was a Bauhaus master and photomontage was Bauhaus practice, not a modern graft.

**On the Halden Miller reference:** its photography and its IBM Plex Mono micro-labels were adopted. Its actual aesthetic — cream ground, editorial serif display, rounded pills, soft full-colour photography — was **not**, because it contradicts the Bauhaus brief and fights the logo's stencil-cut geometric letterforms. Do not let the build drift back toward it. Photography stays duotone and geometrically cut; never full-colour, never in a soft rounded frame.

**Signature element — the 360 dial.** A circle split into four quadrants recurs as the site's structural motif:

| Where | What it does |
|---|---|
| Hero | Full four-quadrant dial, the composition's anchor |
| How we work | Each step closes another 90° — steps 1–4 fill 90° → 180° → 270° → 360° |
| CTA band | A closed dial, ending the loop the page opened with |

Photography enters the montage at two points on the homepage — a duotone **arch** overlapping the hero dial, and a duotone **circle** overlapping the CTA dial. Flat geometry and photographic cut always overlap; they never sit side by side in separate boxes.

The numbering in "How we work" is load-bearing: the plan genuinely is a sequence, and the dial makes the sequence's completion visible. Reuse the motif on the remaining pages; don't add a second competing device.

---

## Colour tokens

Sampled from the supplied logo SVGs, **not** from the approximations in the brief. Differences are listed so they can be corrected in any other brand collateral.

| Token | Value | Brief said | Role |
|---|---|---|---|
| `--cerulean` | `#009ACF` | `#1E9CD8` | Primary brand blue |
| `--deep-slate` | `#1C355E` | `#21365C` | Headings, footer, dark ground |
| `--blush` | `#F7929E` | `#F29CA4` | Accent — shapes and fills only |
| `--ink` | `#231F20` | `#111111` | Body text, borders, print shadow |
| `--grey` | `#606161` | — | Muted body text (5.7:1 on paper) |
| `--paper` | `#F7F5F0` | same | Page ground |
| `--white` | `#FFFFFF` | same | Card ground |
| `--cerulean-wash` | `#E5F4FA` | — | Flat tint, never behind text |
| `--blush-wash` | `#FDEBED` | — | Flat tint, never behind text |

Ratio in use is roughly paper/white 60% · deep-slate 20% · cerulean 15% · blush 5%.

### Contrast rules — read before adding any component

Two constraints fall out of the brand palette. Both are already enforced in `styles.css`; breaking them will break WCAG AA.

1. **White on cerulean measures 3.22:1.** That clears AA for *large* text only. Every cerulean button is therefore locked to **700 weight at 19px minimum** (`.btn` sets `font-size: 1.1875rem`), plus a 2px ink border that carries the edge. **Never shrink a cerulean button's label below 19px** and never put small text on a cerulean fill.
2. **Small text never sits on a cerulean fill.** The 24px/700 service labels clear the large-text bar at 3.22:1, but 13px captions do not — `.placeholder-cerulean` therefore uses **ink** text (5.07:1), not white. This was caught in audit after being got wrong once.
3. **Blush never carries text on paper** — the ratio is close to 1:1. Blush is a shape and background colour only. Ink on blush is 7.4:1 and deep-slate on blush is 5.6:1, both fine. Blush *on deep-slate* is 5.6:1, which is why the footer column titles use it.

Verified against the rendered page: all text currently passes AA, all tap targets are ≥24px, heading order runs H1 → H2 → H3 with no skips.

---

## Type scale

| Role | Token | Value |
|---|---|---|
| H1 | `--fs-h1` | `clamp(3rem, 7vw, 6rem)` · Jost 800 · `-0.035em` · lh 0.94 |
| H2 | `--fs-h2` | `clamp(2.125rem, 4.2vw, 3rem)` · Jost 700 |
| H3 | `--fs-h3` | `clamp(1.25rem, 1.8vw, 1.5rem)` · Jost 700 |
| Body | `--fs-body` | `1.125rem` · IBM Plex Sans 400 · lh 1.6 |
| Body small | `--fs-body-sm` | `1rem` |
| Label / eyebrow | `--fs-label` | `0.8125rem` · **IBM Plex Mono 500** · uppercase · `0.14em` |
| Step numeral | `--fs-numeral` | `clamp(4rem, 8vw, 7.5rem)` · Jost 800 |

### Third face: the mono utility label

Every micro-label — section eyebrows, placeholder captions, footer column titles — is set in **IBM Plex Mono**, not Jost. This is the one thing taken from the [Halden Miller](https://halden-miller.webflow.io/) reference, which sets all its small labels in Plex Mono at 10px.

It works here for a reason beyond taste: a technical annotation face is period-correct for Bauhaus, and the contrast between a precise mono micro-label and a 96px geometric display headline is what gives the reference's hero its tension. Ours gets the same effect without importing anything else.

The eyebrow is `.eyebrow` + a `.eyebrow-marker` square:

```html
<p class="eyebrow"><span class="eyebrow-marker"></span>What can we do?</p>
```

The reference renders this as a rounded pill. A pill would break the zero-radius rule this system runs on, so the chip became a 9px solid square instead — cerulean on paper, blush on deep-slate (`.eyebrow-marker-blush`).

### The duotone photo system

Three stacked layers, no images pre-processed in Photoshop — swap the source file and the treatment follows:

| Layer | Class | Blend | Result |
|---|---|---|---|
| Container background | `.photo` + an ink pair | — | supplies the **shadow ink** |
| Image | `.photo-img` | `screen` + `grayscale(1)` | shadows drop to the container ink |
| Overlay | `.photo-tint` | `multiply` | highlights take the **highlight ink** |

```html
<div class="hero-photo photo photo-duo-cerulean photo-arch">
  <img class="photo-img" src="…" alt="…">
  <span class="photo-tint"></span>
</div>
```

**Ink pairs** — the highlight ink must be light, or the photo goes muddy. Cerulean is a mid-tone and caps brightness, so it is only ever a *shadow* ink:

| Class | Shadow | Highlight | Used on |
|---|---|---|---|
| `.photo-duo-cerulean` | cerulean | paper | Hero arch |
| `.photo-duo-blush` | deep slate | blush | CTA circle |
| `.photo-duo-slate` | ink | cerulean wash | spare |
| `.photo-mono` | — | — | grayscale only, for the logo wall |

**Geometric cuts:** `.photo-circle` · `.photo-arch` · `.photo-quarter` · `.photo-square`.

**Webflow rebuild:** all of this is native. Effects panel → Filter (grayscale + contrast) on the image, Blending (Screen) on the image, Blending (Multiply) on the tint div. No custom code. If an image fails or has not lazy-loaded yet, the tint still multiplies over the shadow ink, so the shape shows as a very dark disc rather than a clean flat block. It is a brief state, not a broken one, but do not describe it as a graceful flat-colour fallback.

### Fonts — action needed for the Webflow build

The real brand fonts ship in the supplied logo package, under `Amigos360_Logo_FA/Fonts/`: **Mont** (Bold / ExtraLight / Heavy) for display and **Helvetica Now Text** (Regular / Medium / Bold) for body.

They are **not** bundled here — two Mont weights are `_DEMO` files and Helvetica Now is commercially licensed. This mockup uses the closest free stand-ins from Google Fonts:

- **Jost** stands in for Mont (both geometric, Futura-derived)
- **IBM Plex Sans** stands in for Helvetica Now Text (both neo-grotesques), and shares its skeletons with the Plex Mono label face

**TODO:** if Amigos holds web licences for Mont and Helvetica Now, upload them under Webflow → Site settings → Fonts and swap `--font-display` / `--font-body`. Nothing else needs to change. If they don't, Jost + IBM Plex Sans + IBM Plex Mono is a defensible permanent choice.

Inter was the original stand-in and was replaced deliberately: it reads as generic product-UI, appears on a very large share of current sites, and does not relate to the Plex Mono label face. Plex Sans solves all three.

---

## Pages

| Page | Notes |
|---|---|
| `index.html` | Hero, social proof, services, process, CTA band |
| `portfolio.html` | 16 tiles, 8 category filters. Flat colour blocks, **not** duotone — real portfolio work must show in its own colours; duotone is for brand photography only |
| `pricing.html` | Comparison table desktop, stacked plan cards under 768px. Both exist in markup; exactly one is `display:none` at any width |
| `faq.html` | 8-item accordion, one open at a time, plus `FAQPage` JSON-LD |
| `book-a-call.html` | Two-column layout, five-field form with client-side validation, Calendly embed slot |
| `sign-in.html` | Centred card, geometric accent behind. Mockup only — no auth |

## Webflow rebuild notes

- **Structure** is `section.section-[name] > .container > content` everywhere. Container is `max-width: 1280px` with `padding-inline: clamp(20px, 5vw, 40px)`.
- **Class naming** is Client-First-inspired: lowercase, hyphenated, purpose-named. Every styled element has its own class. No IDs are used for styling (`id` appears only for the skip link and `aria-controls`). No selector goes deeper than two levels.
- **Breakpoints** are desktop-first `max-width` queries at **1280 / 992 / 768 / 480**, matching Webflow's cascade direction exactly — build at desktop, then step down.
- **`[hidden]` is enforced in the reset** with `display: none !important`. The UA stylesheet's `[hidden]` rule loses to *any* author rule that sets `display` — `.placeholder-media` sets `display: flex`, which silently defeated the portfolio filter. If you rebuild the filter as a Webflow interaction, hide by class rather than relying on the attribute.
- **`.js-on`** is added to `<html>` by an inline script in `<head>`, mirroring Webflow's own `w-mod-js`. Scroll-reveal styles are scoped to it so a JS failure degrades to plain visible content instead of a blank page. Keep this if you hand-build the reveals.

### Responsive strategy

Fluid first, breakpoints only where the layout genuinely has to change shape:

- **Type is fluid, not stepped.** Every size is a `clamp()`, so headings scale continuously between breakpoints instead of jumping. H1 runs 48px → 96px across the range.
- **No fixed widths.** Container is `max-width` + fluid `padding-inline: clamp(20px, 5vw, 40px)`. Figures use `aspect-ratio` rather than fixed heights.
- **Grids reflow by column count**, which is the one thing that needs breakpoints.

| | ≥993 | 992 | 768 | ≤480 |
|---|---|---|---|---|
| Nav | inline | hamburger | hamburger | hamburger, full-width CTA |
| Hero | 2 col | 1 col | 1 col | 1 col |
| Services | 4 col | 2 col | 2 col | 1 col, **icon-beside-label rows** |
| Process | 4 col | 2 col | 2 col | 1 col |
| Logo wall | 5 col | 4 col | 2 col | 2 col |
| CTA band | 2 col | 1 col | 1 col | 1 col |
| Footer | 3 col | 2 col | 1 col | 1 col |

**Verified at 1440 / 1280 / 993 / 768 / 600 / 480 / 390 / 320**, including the breakpoint boundaries: no horizontal overflow at any width, no clipped or overflowing text, no tap target under 24px. 320px is the narrowest supported width and it holds.

Two deliberate behaviours that look like bugs in an automated audit:

- `.hero-owl` extends past the right viewport edge at every width. That is the intended bleed; `.section-hero` has `overflow: hidden` and clips it, so it never creates a scrollbar. Keep the `overflow: hidden` when rebuilding.
- `.hero-quadrant` bleeds past the container at desktop but is pulled back to `left: -2%` below 992, where a large negative offset reads as a stray sliver rather than a composed bleed.

Known trade-off, not fixed: the sticky navbar is 88px tall, which is a noticeable share of a landscape phone's ~390px viewport height. A height-based media query would fix it but Webflow can't express one in the designer, so it is left alone for rebuild fidelity.

### JS → Webflow interaction mapping

| `js/main.js` | Webflow equivalent |
|---|---|
| `initNavToggle` | Native Navbar component |
| `initAccordion` | Dropdown, or click Interaction (one open at a time) |
| `initPortfolioFilter` | CMS Collection List + Tabs, or a filter Interaction |
| `initReveal` | "Scroll into view" page-trigger Interaction (fade + move only) |
| `initBookingForm` | Native Form block with Success / Error states |

Every module guards on element presence, so one file serves every page.

---

## Assets

`assets/` holds all logo lockups, kebab-cased. **SVG is used throughout** — the brief referenced PNGs, but the supplied SVGs are crisper, smaller, and recolourable. PNGs are copied alongside as fallbacks.

- `amigos360-full-logo-{cerulean,deep-slate,blush,colour,reverse-white}.svg` (+ `.png`)
- `amigos360-wordmark-{...}.svg`
- `amigos360-owl-{...}.svg` — owl mark alone, derived by re-`viewBox`ing the full lockup to `432 -4 154 184`
- `amigos360-owl-wash.svg` — owl in `#DCEDF6`, the hero's low-emphasis bleed shape

Navbar uses the deep-slate full logo on paper; footer uses reverse-white on deep-slate.

---

## TODO before this goes live

**Content**
- [ ] **Real photography.** `assets/photo-placeholder-*.jpg` are generated tonal stand-ins, not art. Drop real images in at the same paths and they inherit the duotone automatically — no CSS changes. Shoot or select for **strong tonal range**; a flat, low-contrast image turns to mush under duotone.
- [ ] Ten real client logos to replace the `Client logo 01–10` slots in the social-proof grid
- [ ] Pricing figures — all three tiers are `S$X,XXX/mo` placeholders
- [ ] Confirm which features belong to Basic / Pro / Premium; the distribution in `pricing.html` is a guess and must be signed off
- [ ] Calendly or Zoom embed for `book-a-call.html` (placeholder div is marked in the markup)
- [ ] **Eyebrow copy sign-off.** Three eyebrows are my wording, not the client's, and are marked `TODO` in the markup: `Design subscription / Singapore` (hero, derived from the brief's own description of the business), `Clients` (social proof), `Get started` (CTA band, reusing the footer column title). The other two — `What can we do?` and `How we work` — are the brief's own section titles, verbatim.
- [ ] Optional footer blurb — slot and `.footer-blurb` style exist, copy required
- [ ] Privacy and Terms pages — footer links currently point to `#`
- [ ] Hero eyebrow line, if wanted — deliberately left out rather than invented

**Build**
- [ ] Remaining five pages
- [ ] Same-day turnaround asterisk on the pricing page needs its footnote text

> All supplied copy is used **verbatim**. Nothing in the marketing copy was invented, shortened, or reworded. Placeholder strings are limited to functional labels (`Client logo 01`, `S$X,XXX/mo`) and are listed above.

---

## Pre-launch: not indexable

The site is public but deliberately unsearchable, matching `carine-website` and `tienyan-website`:

- `<meta name="robots" content="noindex, nofollow">` in the head of **all six pages**
- `robots.txt` with `Disallow: /`
- `.nojekyll` so GitHub Pages serves the files as-is

**At sign-off, reverse all three:** delete the robots meta from every page, change `robots.txt` to `Allow: /`, and drop this section.

Note that a public repo is itself visible on GitHub regardless of these — noindex governs the deployed site, not the source. Move the repo back to private if the source needs to stay unseen.

## Deployed

**https://mingkey88.github.io/amigos360-website/** — GitHub Pages, `main` branch, root path.

Two things to know when sharing it:

- **Assets are cached for 10 minutes** (`Cache-Control: max-age=600`). After a push, the HTML updates quickly but CSS and JS can lag. If a change looks missing, hard-refresh (`Cmd+Shift+R`) or wait ten minutes — don't go hunting for a bug that isn't there.
- **`robots.txt` does nothing on a project Pages site.** Crawlers only read it from the host root — `mingkey88.github.io/robots.txt` — never from `/amigos360-website/robots.txt`. The `noindex, nofollow` meta on all six pages is what actually keeps this out of search results. Keep it on every new page. The same applies to `carine-website` and `tienyan-website`.

## Local preview

Opening `index.html` in a browser is enough. A server is only needed for tooling that blocks `file://`:

```bash
cd amigos360 && python3 -m http.server 8765
```
