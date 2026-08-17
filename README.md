# Amigos360 — website mockup

Static, dependency-free mockup. Open `index.html` directly in a browser — no build step, no npm, no server required.

**Status:** all six pages built — `index`, `portfolio`, `pricing`, `faq`, `book-a-call`, `sign-in`. Content placeholders remain (see TODO at the bottom).

---

## Design direction

**Bauhaus photomontage, on a dark ground** — flat colour blocking, geometric primitives, visible grid structure, oversized display type, hard 4px print shadows, *plus duotone photography cut into geometric shapes*.

The ground is Deep Slate and there is no light theme. See *Colour tokens* for why that is a brand-sanctioned choice rather than a departure, and for the one section that deliberately inverts against it.

That last part is the Moholy-Nagy / Lissitzky / Rodchenko Constructivist language: a grayscale plate printed in two inks, cropped to a circle or arch, overlapped with flat colour. It is what makes the direction read as 2D and avant-garde rather than merely clean, and it is period-correct — Moholy-Nagy was a Bauhaus master and photomontage was Bauhaus practice, not a modern graft.

**On the Halden Miller reference:** its photographic treatment was adopted. Its actual aesthetic — cream ground, editorial serif display, rounded pills, soft full-colour photography — was **not**, because it contradicts the Bauhaus brief and fights the logo's stencil-cut geometric letterforms. Do not let the build drift back toward it. Photography stays duotone and geometrically cut; never full-colour, never in a soft rounded frame. (Its IBM Plex Mono micro-labels were adopted for a while and have since been reverted — see *Two faces, and only two*.)

The Bauhaus direction is not a stylistic preference layered on top of the brand; it is the brand's own stated basis. Guidelines v2: *"Inspired by the principles of Bauhaus art direction, the brand identity embraces simplicity, functionality, and geometric precision."* Flat colour, zero radius and visible construction are the house style **because the guide says so**, which is worth knowing before anyone proposes softening them toward a competitor's look.

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

**The site runs one theme, and it is dark.** Deep Slate is the ground. That is a brand colour, not an invented dark: §1.5 shows the reverse-white lockup on exactly this background, and the guide's own cover and section dividers use it.

| Token | Value | Guide | Role |
|---|---|---|---|
| `--ground` | `#1C355E` | PANTONE 534 C | **Page and card fill** |
| `--fg` | `#FFFFFF` | 100% White | Text, 2px borders, 4px print shadows — 12.2:1 |
| `--fg-muted` | → `--black-25` | 25% Black | Muted body text — 6.6:1 |
| `--on-light` | `#231F20` | — | Text on a light fill; see below |
| `--cerulean` | `#009ACF` | PANTONE 6121 C | Primary brand blue |
| `--blush` | `#F7929E` | PANTONE 6043 C | Accent — shapes and fills only |
| `--white` | `#FFFFFF` | 100% White | Light fills: CTA band, one service tile, `.btn-paper` |
| `--black-75` | `#404040` | 75% Black | 1.2:1 on slate — **unusable here**, kept for reference |
| `--black-50` | `#808080` | 50% Black | 1.9:1 on slate — non-text only |
| `--black-25` | `#BFBFBF` | 25% Black | 6.6:1 on slate — muted body text |
| `--cerulean-deep` | `#174772` | — | Flat tint, never behind text |
| `--blush-deep` | `#43466A` | — | Flat tint, never behind text |

**`--fg` and `--ground` are named for their role, not their colour**, because the role is what the ~60 call sites care about. The previous build's `--ink` / `--paper` / `--grey` were renamed into them wholesale.

**The construction mechanism is unchanged, just inverted.** The light build separated cards from the ground with 2px ink borders and 4px ink print shadows. This one uses white borders and white shadows on slate. Cards are the *same colour as the page* — separation is done entirely by visible construction, which is the point of the whole system.

**§2.1's black ramp is read from the other end.** Muted text was 75% Black on white (10.4:1); it is now 25% Black on slate (6.6:1). Same ramp, opposite direction. 75% Black measures 1.2:1 here and is unusable — the token is kept only so nobody re-derives it.

**`--on-light` is the old `--ink`.** It keeps its meaning — `#231F20` is `cls-5` in the official logo artwork, used 11× in the lockup — but it has no structural role any more, because ink on slate is 1.3:1. It survives only where text sits on a light fill: blush tiles, the white service tile, and the inverted CTA band.

**The two deep tints are not in the guide.** Brand colours mixed into the ground at 18%, flat fills only, never behind text. The light build's `#E5F4FA` / `#FDEBED` were light tints and die on a dark ground. Flagged for sign-off, exactly like the pair they replace.

Ratio in use is roughly deep-slate 65% · white 15% · cerulean 15% · blush 5%.

### Contrast rules — read before adding any component

All already enforced in `styles.css`; breaking them will break WCAG AA.

1. **White on cerulean measures 3.22:1.** Ground-independent — neither colour touches the page ground, so this is unchanged from the light build. It clears AA for *large* text only, which is why every cerulean button is locked to **700 weight at 19px minimum** (`.btn` sets `font-size: 1.1875rem`). **Never shrink a cerulean button's label below 19px.**
2. **Small text never sits on a cerulean fill.** The 24px/700 service labels clear the large-text bar; 13px captions do not. `.placeholder-cerulean`, `.filter-button-active` and `.group-title` therefore use `--on-light` (5.07:1), not white.
3. **Cerulean *as text* on the slate ground is 3.79:1** — large text only. `.faq-question` is the one place it appears, at `--fs-h3`/700, which clears the bar.
4. **Blush never carries text.** Blush on slate is 5.6:1 and fine as a shape; `--on-light` on blush is 7.4:1 and fine as text. The footer column titles use blush *on* slate.
5. **`--black-75` and `--black-50` are dead on this ground** — 1.2:1 and 1.9:1. Only `--fg` and `--black-25` are safe for text on slate.

Measured in the browser across all six pages after the flip: **zero elements below their AA threshold.**

### Light islands

**Two blocks invert against the dark page: the navbar and the CTA band.** They bracket every page — light bar, dark body, light band, dark footer.

The navbar is light for a specific reason, not a stylistic one. The full-colour lockup's white shapes are **knockouts**, so it can only ever sit on a light ground; and §1.4 asks for the primary colour version wherever possible. Without a light bar, the colour lockup would appear nowhere on the site except the favicon. The band gives it somewhere legitimate to live.

Anything structural inside a light island has to use the `-on-light` tokens, or it draws white on white:

| Dark page | Light island |
|---|---|
| `--fg` | `--on-light` |
| `--rule` | `--rule-on-light` |
| `--rule-strong` | `--rule-strong-on-light` |
| `--print-shadow` | `4px 4px 0 var(--on-light)` |

The cerulean CTA button is the exception that needs no change: its cerulean fill and white label are 3.22:1 *regardless of ground*, so the 19px/700 lock covers it in both places. Only its border and print shadow are overridden.

The navbar is `position: sticky`, so it floats as a light strip over dark content while scrolling — which makes its 2px bottom border load-bearing rather than decorative.

### What the flip broke, and what it did not

Three things did not invert mechanically and were handled deliberately:

- **The CTA band and footer** used to earn emphasis by *being* deep-slate on a light page. On an all-slate page that dissolves. The CTA band therefore **inverts to white** — see *Light islands* above. The footer stays slate and gains a 2px top rule. `.btn-paper` follows the band: it was a light button on a dark band, and is now a dark button on a light one.
- **`.service-tile-slate` flips to a white fill**, because a slate tile on a slate ground is an empty outline and the grid needs four accented tiles out of eight.
- **The duotone inks are pinned to literals.** They are photographic values, not page colours — the highlight ink must stay light and the shadow ink dark whatever the ground does. They were picking up `--ground` / `--fg` by name, which inverted them and broke the photograph. Pinning them means a future theme change cannot silently invert a photo again.

`.btn-slate` was deleted. It was a deep-slate fill, which on a deep-slate ground is an invisible button, and grep across all six pages confirmed it was never used.

**Form fields have no fill change on focus.** They used to rest on an off-white ground and lift to white; that became a no-op when the neutrals converged, and it is not revivable on a dark ground either. Focus is carried by the 3px cerulean ring in the reset, which is both stronger than a fill change and already a brand colour.

Verified against the rendered page: all text passes AA, all tap targets are ≥24px, heading order runs H1 → H2 → H3 with no skips.

---

## Type scale

| Role | Token | Value |
|---|---|---|
| H1 | `--fs-h1` | `clamp(3rem, 7vw, 6rem)` · Jost 800 · `-0.035em` · lh 0.94 |
| H2 | `--fs-h2` | `clamp(2.125rem, 4.2vw, 3rem)` · Jost 700 |
| H3 | `--fs-h3` | `clamp(1.25rem, 1.8vw, 1.5rem)` · Jost 700 |
| Body | `--fs-body` | `1.125rem` · IBM Plex Sans 400 · lh 1.6 |
| Body small | `--fs-body-sm` | `1rem` |
| Label / eyebrow | `--fs-label` | `0.8125rem` · IBM Plex Sans 500 · uppercase · `0.14em` |
| Step numeral | `--fs-numeral` | `clamp(4rem, 8vw, 7.5rem)` · Jost 800 |

### Two faces, and only two

**The guide specifies exactly two typefaces. Do not add a third.** §3.1 gives the primary (Mont) headlines, titles and key messaging; §3.2 gives the secondary (Helvetica Now) body copy, supporting information, **captions** and digital content.

Micro-labels are captions, so they live in the secondary face. Every one of them — section eyebrows, placeholder captions, footer column titles — is set in the body face at 500, uppercase, tracked `0.14em`. The label reads as a label through **casing, tracking and scale**, not through a face of its own.

An earlier build set all of these in IBM Plex Mono, borrowed from the [Halden Miller](https://halden-miller.webflow.io/) reference. It was a defensible look — a technical annotation face is period-correct for Bauhaus — but it was a third typeface the brand does not have, so it went. Dropping it also removes a Google Fonts family from every page.

The eyebrow is `.eyebrow` + a `.eyebrow-marker` square:

```html
<p class="eyebrow"><span class="eyebrow-marker"></span>What can we do?</p>
```

The reference renders this as a rounded pill. A pill would break the zero-radius rule this system runs on, so the chip is a 9px solid square instead — cerulean on the slate ground, and cerulean again inside the inverted CTA band, where `.eyebrow-marker-blush` is overridden because blush on white is close to 1:1.

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
| `.photo-duo-cerulean` | cerulean | white | Hero arch |
| `.photo-duo-blush` | deep slate | blush | CTA circle |
| `.photo-duo-slate` | `#231F20` | `#E5F4FA` | spare |

**These are photographic values, not page colours, so they do not follow the theme.** The highlight ink has to stay light and the shadow ink dark whatever the ground is. Two of them were reading `--ground` / `--fg` by name, which inverted them at the dark-theme flip and turned the plate inside out. They are pinned to literals now precisely so a future theme change cannot silently invert a photograph.
| `.photo-mono` | — | — | grayscale only, for the logo wall |

**Geometric cuts:** `.photo-circle` · `.photo-arch` · `.photo-quarter` · `.photo-square`.

**Webflow rebuild:** all of this is native. Effects panel → Filter (grayscale + contrast) on the image, Blending (Screen) on the image, Blending (Multiply) on the tint div. No custom code. If an image fails or has not lazy-loaded yet, the tint still multiplies over the shadow ink, so the shape shows as a very dark disc rather than a clean flat block. It is a brief state, not a broken one, but do not describe it as a graceful flat-colour fallback.

### Fonts — action needed for the Webflow build

The brand faces are named in the guide — **Mont** Heavy / Bold / ExtraLight (§3.1) and **Helvetica Now** Bold / Medium / Regular (§3.2) — and ship in the supplied logo package under `Amigos360_Logo_FA/Fonts/`.

They are **not** bundled here: two Mont weights are `_DEMO` files and Helvetica Now is commercially licensed. This mockup uses the closest free stand-ins from Google Fonts:

- **Jost** stands in for Mont (both geometric, Futura-derived)
- **IBM Plex Sans** stands in for Helvetica Now (both neo-grotesques)

**TODO:** if Amigos holds web licences for Mont and Helvetica Now, upload them under Webflow → Site settings → Fonts and swap `--font-display` / `--font-body`. Nothing else needs to change — the two token names map 1:1 onto the guide's two faces. If they don't, Jost + IBM Plex Sans is a defensible permanent stand-in pair.

Inter was the original stand-in and was replaced deliberately: it reads as generic product-UI and appears on a very large share of current sites. Plex Sans solves both.

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

### Scroll motion

One system, extended from the existing tokens — no parallel motion stack.

| Token | Value | Why |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Strong ease-out. **Never `ease-in` on an entrance** — it delays the exact moment the eye is on the element |
| `--reveal-dur` | `600ms` | Marketing tier, so longer than the 300ms UI ceiling is fine |
| `--reveal-step` | `70ms` | Stagger interval, inside the 30–80ms band. Single source of truth — `initReveal()` reads it off the token |

- `.reveal` — fade + `translateY(20px)`. Transform and opacity only; both skip layout and paint.
- **Stagger is computed from arrival, not DOM position.** `initReveal()` sorts each IntersectionObserver batch top-to-bottom and assigns incremental delays to *that batch only*, capped at 6 steps. Cards landing in the same frame cascade; a card scrolled to on its own starts immediately.

  The earlier `nth-child` version looked right on a short grid and wrong on a long one — the 16th portfolio tile sat 2,000px down, arrived alone, and still waited out a fixed 360ms before moving. That reads as lag, not stagger. There is no `.reveal-stagger` class any more; grouping is implicit.
- **The process dials sweep a quarter turn** as each step arrives — rotating the disc drags its filled wedge, so the arc reads as being drawn. The dial's delay is mirrored from its step in JS, so it stays on the same beat however the steps batch at a given breakpoint. This is the one piece of motion that *explains* something rather than softening an entrance.

**Deliberately not animated:** the portfolio filter (clicked repeatedly — it snaps, and tiles keep `reveal-visible` so re-showing never re-animates), nav, and footer.

**Button hover lift is gated** behind `@media (hover: hover) and (pointer: fine)` — on touch, a tap fires `:hover` and leaves the button stuck in its lifted state. `:active` stays ungated as real press feedback.

**Reduced motion removes reveals entirely** rather than softening them — a scroll reveal aids no comprehension, so the content is simply present. `transition-delay` is zeroed too; without that the stagger delays survive the duration override and staggered items still arrive late.

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
- `amigos360-owl-wash.svg` — owl in `#DCEDF6`, the light build's low-emphasis bleed shape. Unused now, kept for reference
- `amigos360-owl-wash-dark.svg` — the same owl in `#24406E`, the hero's bleed shape on the slate ground

On the light build the pale owl was a 1.20:1 whisper against white. Left alone on slate it measures **10.2:1** and dominates the hero, so the dark counterpart was cut to `#24406E` — **1.18:1** on the ground, matching the original's weight almost exactly.

**Which mark goes where is decided by the ground, not by taste.** The colour lockup contains white shapes (`.cls-8`) that are **knockouts**: they read as the ground showing through, so on a dark ground it renders as damaged artwork. §1.5 shows reverse-white on deep-slate for exactly this reason.

| Placement | Ground | Mark |
|---|---|---|
| Navbar (all three sizes) | white — a light island | **full colour** |
| Footer | slate | reverse-white |
| Sign-in card | slate | reverse-white wordmark |
| Favicon | browser tab, not the page | **full colour** |

The navbar is why the light island exists. §1.4 asks for the primary colour version wherever possible, and on an all-dark site the colour lockup would otherwise appear nowhere but the favicon.

### Minimum sizes — guide §1.3

The guide sets a **200px digital floor for the full lockup** and **150px for the wordmark**, and §1.3 is explicit about what to do when the space is tighter: *"use the approved favicon or symbol instead of reducing the primary logo beyond its minimum size."* So the navbar steps down rather than shrinking.

| Width | Mark | Rendered | Floor |
|---|---|---|---|
| ≥993 | full lockup | 200px | 200 ✓ |
| 992–481 | wordmark | 164px | 150 ✓ |
| ≤480 | owl symbol | 48px | n/a ✓ |

All three `<img>` live in `.navbar-brand` and CSS shows exactly one — the same way a Webflow build would express it. All three are `alt=""`; the link itself carries the accessible name via `aria-label`.

Footer uses reverse-white at 220px (already above the floor). The sign-in card uses the reverse-white **wordmark** at 168px — the lockup at its old 168px was under the 200px floor.

**Before this pass every navbar logo was undersized** — 190 / 164 / 142px against a 200px floor.

### Outstanding — needs the client

- **The approved favicon artwork is not in this repo.** §1.4 supplies it as a rounded-square container at 32/64px. The favicon currently points at `amigos360-owl-colour.svg`, which at least satisfies *"the primary colour version should always be used whenever possible"*.
- **Every `amigos360-owl-*.svg` was derived by re-`viewBox`ing the lockup.** §1.6 lists *"do not crop or simplify the logo manually"* as a don't, so the derived owl used for the mobile navbar and the favicon is itself a minor violation. Request the official symbol file.

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
- [ ] Same-day turnaround asterisk on the pricing page needs its footnote text

**Brand** — raised by the v2 guidelines pass, all need the client
- [ ] Approved favicon artwork (§1.4). Not in the repo; the derived owl is a stand-in
- [ ] Official owl symbol file — the current ones were manually re-`viewBox`ed, which §1.6 lists as a don't
- [ ] Sign off `--cerulean-deep` `#174772` / `--blush-deep` `#43466A` — brand colours mixed into the ground at 18%, but not in §2.1
- [ ] Sign off `amigos360-owl-wash-dark.svg` `#24406E` — a recolour of an already-derived owl, so it inherits both the §1.6 "unapproved colour variation" and "do not crop manually" problems
- [ ] **Confirm the dark ground is wanted.** It is defensible — §1.5 sanctions reverse-white on deep-slate, and the guide's own cover uses it — though the guide's *layout* pages are predominantly white. The §1.4 objection is now largely answered: the light navbar carries the full-colour lockup on every page, so the primary colour version is present throughout rather than confined to the favicon
- [ ] Web licences for Mont and Helvetica Now, if held (§3.1 / §3.2)
- [ ] **Positioning mismatch.** The guide's brand story describes a *"creative platform… more than a marketplace"* connecting businesses with designers. The site copy sells a *design subscription service*. Both came from the client, and the copy is used verbatim, so this is theirs to reconcile — but it should not go live unresolved.

### Checked against the client copy doc

Verified mechanically against `Amigos - Website - Sitemap + Copy - v1`: all 42 body-copy strings present on the right page, all 8 FAQ questions and answers word-identical, the struck-through hero clause (`~~Whether you need print or digital marketing assets,~~`) correctly omitted.

Two structural fixes were needed — text was right, paragraphing was not:

- **Hero sub is two paragraphs** in the source, not one run-on line
- **Every FAQ answer is 2–3 paragraphs** in the source; all eight had been flattened to one

Both now match the source exactly (2/2/3/3/2/3/2/2 paragraphs). Keep it that way when editing — `.faq-para` and `.hero-sub-follow` carry the spacing.

**The source specifies no pricing H1 and no pricing intro**, and its tier cells are empty — so the heading, the intro and the whole tier distribution are still awaiting client copy.

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
cd amigos360-website && python3 -m http.server 8765
```
