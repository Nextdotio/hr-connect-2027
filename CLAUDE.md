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

- Develop on branch `claude/hr-connect-brochure-48kzfi`.
- Run `npm run build` to verify changes compile.
- Redeploy gh-pages (see above).
- Commit with a clear message and push the branch.
- Open a fresh PR into `main` only when asked.

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

## Navigation (24 Sep 2026)

Stuart: "it's hard to find products when i have to scroll right down for them".

- The first screen carries the product: `FeeSummary` in the hero lists the four
  `TIERS` bands and fees, read from the array (nothing new is claimed there).
  Each band links to `#membership` and preselects itself (`picked` lives in
  `App`), so the fee finder, the band card and the enquiry mailto open on it.
  Two by two below xl, so it clears the lg photo panel; four across from xl.
- Section order: hero → members → What you get → Membership → What is HR
  Connect → Who it's for → New for 2027 → Programme → testimonials → join.
  `NAV` follows the page order, Membership first. Below lg the header carries
  a "Fees" pill to `#membership`, and the phone menu lists Membership.
- Anchors land by measurement: `Nav` measures its bar into `--nav-h`, which
  `section[id]` uses as `scroll-margin-top`. Never hardcode a nav offset.
  First-load deep links (`…/#membership`) are landed by `useLandOnHash` once
  React has rendered.

## Present mode and seller tools (26 Sep 2026)

Stuart: "Make all brochures beautiful, easy to navigate, easy to understand for
buyers, and easy for our sellers to take the buyers through and convince them to
buy each and every product."

- **Present mode** is a full-screen deck for a screen share. The shell
  (`src/PresentMode.jsx`: URL, keys, swipe, focus, scroll lock, slide list,
  `CopyLinkButton`) is the shared NEXT.io reference with its behaviour unchanged,
  restyled in HR Connect's identity: cream ground, green type and controls, amber
  accents, deep-green cards, Plus Jakarta Sans. Never the NEXT.io charcoal/yellow.
  The deck itself (`buildSlides` and the `*Slide` components) is in `App.jsx`,
  just above `App`.
- **Where the deck gets its data.** Every slide reads the page's own arrays and
  section copy, in page order, so a new band, benefit, month or testimonial
  appears in the deck by itself: `HERO` + `STATS` (cover), `MEMBERS` +
  `MEMBERS_HEAD`, `BENEFITS`, `HEADS.membership` + `TIERS` + `TIER_INCLUDES`
  (family slide), one slide per `TIERS` band, `MISSION` + `PILLARS`, `AUDIENCE`,
  `NEW_2027`, `CALENDAR` (through `MonthRow`, so the kind markers match the
  page), `TESTIMONIALS` (three to a slide) and `JOIN` + `buildMailto`. Section
  heads and shared lines live in `HEADS`, `HERO`, `MEMBERS_HEAD`, `JOIN`,
  `PROGRAMME_NOTE` and `TERMS_YEAR` / `TERMS_CONFIRM`: edit the constant, not
  the JSX, and the page and the slide change together. The band card and the
  band slide share `BandLines` (seats, and one Valletta pass per seat) and
  `IncludesList`.
- **The deck (15 slides today):** cover (lockup, hero headline, "Annual company
  membership · from €X per year" from the lowest `TIERS` fee, the `STATS`
  figures with their own notes, "In this presentation" with counts) → our members
  → what you get → membership (family slide: the four bands, each opening its
  slide, and what every band includes) → one slide per band → what is HR Connect
  → who it's for → new for 2027 → programme → what they say (two slides) → next
  steps.
- **A band slide:** band N of 4, range, fee per year; **Choose this band** sets
  `picked` exactly as the hero's band links do (sets, never toggles) and turns
  amber "Selected" when it is the active band; **Open the card** closes the deck,
  lands on `#band-…`, outlines the card for a moment and focuses it (it does not
  choose the band); Copy link; the other bands; what you get and the membership
  terms. Bands carry no `quote`, so there is no pitch line: do not invent one.
- **Next steps:** the page's join copy, a band picker (the same `picked`) and the
  page's own mailto, `buildMailto(active)`, with its own label. `picked`, the fee
  finder's headcount and `active` (the picked band, else the headcount's match)
  all live in `App`, so the page and the deck always show the same band.
- **URL:** `?present` opens the cover; `?present=<slide id>` opens that slide
  (`cover`, `members`, `what-you-get`, `membership`, `band-1-79`, `band-80-249`,
  `band-250-499`, `band-500-plus`, `about`, `who`, `new-2027`, `programme`,
  `testimonials`, `testimonials-2`, `join`). The address bar follows the slide
  (replaceState); closing removes `present`; Back to an address without it closes
  the deck.
- **Keys:** → Space PageDown next, ← PageUp back, Home, End, G for all slides,
  Esc closes the slide list, then the deck. Swipe on touch. Focus returns to
  whatever opened the deck (the phone menu hands it to the menu button).
- **Entry points:** the nav's Present button from md (in the phone menu below
  md), Present beside the membership head (opens the family slide), and a quiet
  Present on each band card (opens its slide). FeeSummary has no room for one;
  the nav button sits right above it.
- **Copy link:** the membership head (`#membership`), the family slide, each band
  card and band slide (`#band-<range>`). A link never carries `present`.
- **Band anchors:** `bandAnchor()` derives `band-1-79` … `band-500-plus` from
  `range`. The id sits on a still wrapper (`.jump-card`: scroll margin
  `--nav-h` + 1rem), because the card inside animates in and a moving target
  lands short. A band link preselects its band on load and on hashchange
  (`useBandFromHash`), as the hero's band links do. Each card is a select button
  plus a quiet Present / Copy link strip outside it (a button cannot hold
  buttons).
- **Not built, on purpose:** goal chips (no product carries goal tags) and a
  shareable plan link (one membership, one band per company: there is no plan or
  cart, and the band link already carries the choice).
- **Rules to keep:** the deck says nothing the page does not (no new figures,
  members, testimonials or claims, and nothing from the internal list above);
  buyer words only on the page (never seller, sales desk, talk track, pitch or
  objection); no em dashes in new copy; every slide fits 1280x800 without
  scrolling (a phone may scroll a slide vertically, never sideways); 44px touch
  targets; the deck follows the page's section order. Two conflicting Tailwind
  utilities on one element resolve by stylesheet order, not class order
  (display utilities sort alphabetically, so `inline-flex` beats `hidden`):
  that is why `PRESENT_PILL`, `ProgrammeLegend` (`display`) and `CopyLinkButton`
  (`size`) take their display or box classes separately.
