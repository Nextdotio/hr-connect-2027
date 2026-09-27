# HR Connect 2027 — membership brochure

Single-page React (Vite + Tailwind) brochure for **HR Connect**, the HR community for
iGaming professionals. A NEXT.io portfolio project, supported by GamingMalta.

Live: https://nextdotio.github.io/hr-connect-2027/

## Run it

```
npm install
npm run dev      # local dev server
npm run build    # production build
npm run deploy   # build + publish to gh-pages
```

## What's in it

| Section | Content |
| --- | --- |
| Hero | Positioning, mission, the four fee bands at a glance, proof stats |
| Members | The 27-company logo wall, directly beneath the hero |
| What you get | The seven membership deliverables |
| Membership | Four fee bands by Malta headcount, with an interactive fee finder |
| What is HR Connect | Mission statement + three pillars |
| Who it's for | Who / Sector / Where |
| New for 2027 | Member introductions, peer exchange, expert panels, poker tournament |
| Programme | The 2027 member calendar |
| What they say | Six attributed member testimonials |

**Present mode.** `?present` opens a full-screen walk-through of the page for a call:
cover, members, what you get, the membership bands (one slide each), what HR Connect is,
who it's for, new for 2027, the programme, testimonials and next steps. It is built from
the same arrays as the page, so it never says anything the page does not. The membership
section and every band card carry **Copy link**; a band link (`#band-80-249`) opens the
page on that band, preselected. Details in `CLAUDE.md`.

## Branding

HR Connect uses its own identity, **not** the NEXT.io dark-grey house style:

| Token | Value | Use |
| --- | --- | --- |
| `hrc-green` | `#245b3c` | Primary — headings, buttons |
| `hrc-green-deep` | `#1b2d21` | Dark section bands |
| `hrc-green-mid` | `#2f7a4f` | Hover states |
| `hrc-amber` | `#ffce33` | Accent — eyebrows, marks, highlights |
| `hrc-cream` / `hrc-sand` | `#fffdf6` / `#f6f3e9` | Page backgrounds |

Colours were sampled directly from the official HR Connect infographic. Type is
Plus Jakarta Sans.

Brand assets in `public/logos/`:

- `hrconnect-lockup-{green,amber,white}.svg` — the `HRconnect · NEXT.io | GAMING MALTA`
  lockup, one file per colourway (an `<img>`-loaded SVG cannot inherit `currentColor`,
  so the colour is baked in).
- `hrconnect-mark.svg` / the inline `<Mark>` component — the four-piece brand mark,
  traced from the infographic. Inline, so it *does* follow `currentColor`.
- `members/*.png` — 27 member logos. The infographic PDF is a stack of full-page
  layers at 150 DPI, so logos cut from it are soft. These come from better sources
  instead: real brand assets reused from `next-summit-valletta` where one exists
  (6), and the project deck's members word-cloud artwork for the rest (19), which
  carries roughly 3x the pixels of the infographic. Only Aviatrix and Bragg still
  come from the infographic — the word cloud has a washed-out metallic Aviatrix
  variant, and its Bragg wordmark runs off the artboard.

## Source material

Content comes from the **HR Connect 2027 project deck** (Stage 0 Definition and
Stage 1 Products & Financials) and the public **HR Connect infographic**.

## Internal-only material — do not publish

The project deck contains commercial information that must **not** appear on this
site. Keep it out of any future change:

- Revenue, cost of sales, commission rate, profit targets and cashflow projections
- Per-member fee breakdowns (which company pays what)
- Churn rates, member-count targets and internal KPI tables
- Team responsibilities and named internal owners
- Sales mechanics (the light-membership deal add-on, September Drive, HubSpot campaigns)
- The internal OneDrive project folder link

Published proof points are limited to member satisfaction, LinkedIn reach, the
public member wall and the published fee bands.
