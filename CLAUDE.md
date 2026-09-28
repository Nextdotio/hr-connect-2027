# HR Connect 2027 — membership brochure

Single-page React (Vite + Tailwind) app. All content lives in `src/App.jsx`
(membership bands, benefits, programme calendar, members, testimonials).

## Deploying to gh-pages — ALWAYS

After any change that affects the site, **redeploy to gh-pages** so the live
site stays current. Do this without being asked, as part of finishing the work:

```
npm run deploy   # = vite build && npx gh-pages -d dist
```

Confirm it prints `Published` before reporting done.

## Workflow

- Develop on `main`. It became the source of truth on 23 Sep 2026, when the
  working branch was merged in (PR #1). The earlier `claude/...` branches are
  retired; do not develop on them or deploy from them.
- Run `npm run build` to verify changes compile.
- Redeploy gh-pages (see above).
- Commit with a clear message and push `main`. No PR is needed unless
  someone asks for a review first.

## Branding — HR Connect, not NEXT.io

HR Connect has its own identity. Do **not** restyle this toward the NEXT.io
dark-grey/yellow house style used by the summit brochures.

- Green `#245b3c`, deep green `#1b2d21`, amber `#ffce33`, cream `#fffdf6`,
  sand `#f6f3e9` — defined as `hrc-*` tokens in `src/index.css`.
- Type is Plus Jakarta Sans.
- The lockup is an `<img>`, so it cannot inherit `currentColor` — use the
  matching colourway file in `public/logos/` (`-green`, `-amber`, `-white`).
- The four-piece `<Mark>` is inline SVG and *does* follow `currentColor`. It
  carries explicit `width`/`height` attributes; without them `w-auto` has no
  intrinsic ratio to work from and the mark renders at full size.

## Content rules

- Membership bands are the `TIERS` array; shared deliverables are `TIER_INCLUDES`.
  Only the representative count and fee change between bands.
- `CONTACT` (top of `App.jsx`) is the enquiry address used by every mailto.
- The programme calendar is deliberately member-facing only. Internal admin,
  invoicing and campaign lines from the project deck are filtered out.

## Internal-only material — never publish

The 2027 project deck is an internal document. These must not reach the site:
revenue, cost of sales, commission, profit, cashflow, per-member fees, churn,
internal KPI targets, team responsibilities, sales mechanics (light-membership
add-on, September Drive, HubSpot campaigns) and the OneDrive link.

See `README.md` for the full list.

## Notes

- Member logos in `public/logos/members/` are sourced by quality, not convenience.
  The infographic PDF is only 150 DPI (it is a stack of full-page layers), so
  logos cut from it look grainy. Order of preference, and what `build_logos` did:
  1. a real brand asset from `next-summit-valletta/public/logos` (6 logos);
  2. the project deck's members word-cloud artwork, ~3x the infographic's pixels
     (19 logos) — the logos there overlap, so the crop boxes are hand-set;
  3. the infographic, only for Aviatrix (the word cloud has a washed-out metallic
     variant) and Bragg (its wordmark runs off the word-cloud artboard).
  Backgrounds are removed by a border-connected flood fill, which keeps whites
  enclosed by a logo, then edge-touching stray blobs are dropped.
- The `neo-group` logo is icon-only in the infographic; it was identified from
  the members word-cloud in the project deck.
- The hero photo is the HR Connect session at NEXT Summit Valletta, reused from
  `next-summit-valletta/public/images/hr-connect.jpg` and cropped above the
  burned-in sponsor bar (which starts at y=1429 in that file).

## The org move — links, Pages and what to verify

The repos moved from the `stuatnext` account to the `Nextdotio` org (Sep 2026).
GitHub redirects `github.com` repo URLs and git remotes on a transfer; it does
**not** redirect GitHub Pages. Every `stuatnext.github.io/...` URL 404s, so any
such link left in shipped code is a dead link on a client-facing page.

- The live site is `https://nextdotio.github.io/hr-connect-2027/`.
- Sweep `index.html` as well as `src/` and `public/`. `og:url` and `og:image`
  live only in `index.html`, so fixing `src/` alone leaves the page rendering
  correctly while still previewing against a dead URL wherever it is shared.
  Six sites stayed stale exactly that way after the first pass.
- `Published` from `npm run deploy` only means gh-pages accepted the push.
  Verify the deployed artefact, not the local build: fetch the live page, pull
  the hashed `assets/index-*.js` out of it, and grep that for
  `stuatnext.github.io`. It should come back empty.

## This repository is public

`Nextdotio/hr-connect-2027` is public (checked 28 Sep 2026), so everything
tracked here is world-readable — this file and `README.md` included, not just the built site.
Internal commercial reasoning belongs in a git-ignored file, never in a tracked
one. Some passages here predate that check and still carry pricing rationale the
card itself deliberately withholds, so treat anything written here as readable
by a client or a competitor, and review before adding more.
