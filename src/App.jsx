import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  Users, CalendarDays, BarChart3, GraduationCap, UserCheck, Utensils,
  Ticket, Mail, ArrowRight, Quote, Check, MessageSquare,
  Presentation, Globe2, MapPin, Building2, Menu, X, Search, Video, CalendarCheck,
} from 'lucide-react'
import { usePresent, PresentMode, CopyLinkButton } from './PresentMode.jsx'

const base = import.meta.env.BASE_URL
const CONTACT = 'sales@next.io'   // SALES DESK: change here to route enquiries elsewhere

/* ─── Brand marks ──────────────────────────────────────────────────────────
   Both traced from the official HR Connect infographic / project deck.
   They inherit colour from `currentColor`, so set text-* on the parent.     */

function Mark({ className = 'w-5' }) {
  return (
    <svg viewBox="0 0 249 508" width="249" height="508" fill="currentColor"
         aria-hidden="true" className={className}>
      <polygon points="52,88 156,90 192,0 223,38 183,133 78,128" />
      <polygon points="0,170 47,170 103,256 47,343 0,343 52,256" />
      <polygon points="152,260 201,184 247,184 247,335 201,335" />
      <polygon points="52,419 156,417 192,507 223,469 183,374 78,379" />
    </svg>
  )
}

/** Tiled brand mark — the texture used behind the deep-green sections. */
function MarkTexture({ className = '', opacity = 0.05 }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
         aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="hrc-marks" width="132" height="132" patternUnits="userSpaceOnUse"
                 patternTransform="rotate(12)">
          <g fill="currentColor" transform="translate(30 26) scale(0.15)">
            <polygon points="52,88 156,90 192,0 223,38 183,133 78,128" />
            <polygon points="0,170 47,170 103,256 47,343 0,343 52,256" />
            <polygon points="152,260 201,184 247,184 247,335 201,335" />
            <polygon points="52,419 156,417 192,507 223,469 183,374 78,379" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hrc-marks)" />
    </svg>
  )
}

function Lockup({ className = 'h-9' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-hrc-green ${className}`}>
      <Mark className="h-full w-auto shrink-0" />
      <img
        src={`${base}logos/hrconnect-lockup-green.svg`}
        alt="HR Connect, NEXT.io | GAMING MALTA"
        className="h-full w-auto"
      />
    </span>
  )
}

/* ─── Content ─────────────────────────────────────────────────────────────
   Sourced from the HR Connect 2027 project deck (Stage 0/1) and the public
   HR Connect infographic. Internal commercial figures — revenue, cost of
   sales, commission, profit, churn and per-member fees — are deliberately
   NOT published here; this is an external membership brochure.             */

const MISSION =
  'HR Connect is your only HR community for iGaming professionals across all People departments. ' +
  'Supported by GamingMalta, we exist to give HR professionals easy access to benchmarking, ' +
  'valuable business insights and a trusted network of loyal industry colleagues and friends.'

const STATS = [
  { value: '27',      label: 'Member companies',      note: 'operators, suppliers, studios, affiliates & the regulator' },
  { value: '9.0/10',  label: 'Member satisfaction',   note: '2026 member survey' },
  { value: '2,100+',  label: 'HR professionals',      note: 'following the community on LinkedIn' },
  { value: '12',      label: 'Sessions a year',       note: 'monthly, plus three in-person events' },
]

const PILLARS = [
  {
    icon: BarChart3,
    title: 'Benchmarking',
    body: 'Pulse surveys and benchmarking studies run on member request, so you can measure your ' +
          'People function against the companies you actually compete with for talent.',
  },
  {
    icon: MessageSquare,
    title: 'Peer exchange',
    body: 'A trusted, anonymous-to-outsiders space where members bring live challenges and leave ' +
          'with solutions from HR leaders who have already solved them.',
  },
  {
    icon: Globe2,
    title: 'Industry insight',
    body: 'Guest speakers, third-party experts and iGaming Academy content, plus a seat at ' +
          'NEXT Summit Valletta, where the industry sets its agenda.',
  },
]

const AUDIENCE = [
  {
    icon: Users, tag: 'Who',
    title: 'HR professionals',
    body: 'All People and HR seniority levels (CHRO, CPO, Heads of HR, HR Business Partners and ' +
          'HR Coordinators) operating in the iGaming industry.',
  },
  {
    icon: Building2, tag: 'Sector',
    title: 'The iGaming industry',
    body: 'Companies active and operating within, and/or towards, the iGaming and gaming industry.',
  },
  {
    icon: MapPin, tag: 'Where',
    title: 'A foothold in Malta',
    body: 'Companies with a presence in Malta. Your Malta headcount is what sets your membership fee.',
  },
]

const BENEFITS = [
  { icon: UserCheck,      title: 'Named representatives',        body: 'Two or three named seats per member company, depending on the size of your Malta organisation.' },
  { icon: CalendarDays,   title: 'Monthly online sessions',      body: 'A members-only Zoom session every month: member introductions, guest speakers and structured peer exchange.' },
  { icon: BarChart3,      title: 'Pulse surveys & benchmarking', body: 'Regular benchmarking on the topics members ask for, with results shared back to the community first.' },
  { icon: Utensils,       title: '3 workshops & dinners in Malta', body: 'Three in-person moments a year: a spring workshop, a summit dinner and the November gathering.' },
  { icon: Presentation,   title: 'Experienced HR mentors',       body: 'Direct access to senior HR practitioners inside the network for the problems that need a second opinion.' },
  { icon: Ticket,         title: 'Free NEXT Summit Valletta',    body: 'Complimentary conference passes to NEXT Summit Valletta, plus the HR Connect programme on site.' },
  { icon: GraduationCap,  title: 'iGaming Academy course',       body: 'An iGaming Academy course included with membership, for you or someone on your team.' },
]

const NEW_2027 = [
  {
    tag: 'New session format',
    title: 'Member Introduction Format',
    body: 'Two member companies per monthly Zoom session present their organisation, HR team structure ' +
          'and people strategy. Builds deeper peer knowledge and engagement across the community.',
  },
  {
    tag: 'Enhanced engagement',
    title: 'Structured Peer Exchange',
    body: 'Dedicated time within each session for peer-to-peer discussion: members bring live challenges ' +
          'and exchange solutions in a trusted, anonymous-to-outsiders space.',
  },
  {
    tag: 'Member-led panels',
    title: 'Member Expert Panel Series',
    body: 'Drawn from our strengths-mapping survey, we identify the "acclaimed knowers" across HR ' +
          'disciplines: talent acquisition, leadership coaching, workforce planning and more. ' +
          'Topic-focused panels seat these practitioners at the front to share real ways of working, ' +
          'giving every member direct access to lived expertise from within the community.',
  },
  {
    tag: 'New event format',
    title: 'HR Connect Poker Tournament',
    body: 'HR professionals learn the game and experience the social dynamics of the casino floor: a real ' +
          'casino experience connecting the people-side of iGaming with its roots. Informal, memorable, ' +
          'and uniquely relevant to the community we serve.',
  },
]

const TIERS = [
  { id: 't1', range: '1 – 79',    min: 1,   max: 79,       reps: 2, price: 2500 },
  { id: 't2', range: '80 – 249',  min: 80,  max: 249,      reps: 2, price: 3000 },
  { id: 't3', range: '250 – 499', min: 250, max: 499,      reps: 3, price: 3500 },
  { id: 't4', range: '500+',      min: 500, max: Infinity, reps: 3, price: 4000 },
]

const TIER_INCLUDES = [
  'Monthly online Zoom sessions',
  'Pulse surveys & benchmarking',
  'Access to experienced HR mentors',
  '3 workshops & dinners in Malta',
  'iGaming Academy course included',
]

/* Member-facing programme only — internal admin, invoicing and campaign
   activity from the project calendar is intentionally left out.
   Each item is [kind, text]. The kind sets its marker and weight on the page:
     live   — in person in Malta (also turns the month amber)
     plan   — agendas and speaker line-ups
     survey — benchmarking, satisfaction and topic polls
     online — the monthly members' Zoom session
   Within a month, list the distinctive moment first and the online session last,
   so the recurring session reads as the baseline rather than the headline. */
const CALENDAR = [
  { m: 'Jan', items: [['plan', 'Q1 agenda shared'], ['online', 'Online session · member introduction']] },
  { m: 'Feb', items: [['survey', 'Benchmarking survey'], ['online', 'Online session · member introduction']] },
  { m: 'Mar', items: [['live', 'In-person event · Malta'], ['online', 'Online session · member introduction']] },
  { m: 'Apr', items: [['plan', 'Q2 agenda shared'], ['survey', 'Benchmarking survey'], ['online', 'Online session · member introduction']] },
  { m: 'May', items: [['live', 'HR Connect @ NEXT Summit Valletta'], ['live', 'Exclusive members’ dinner'], ['online', 'Online session']] },
  { m: 'Jun', items: [['survey', 'Satisfaction survey'], ['online', 'Online session · member introduction']] },
  { m: 'Jul', items: [['plan', 'Q3 agenda shared'], ['online', 'Online session · member introduction']] },
  { m: 'Aug', items: [['online', 'Online session · member introduction']] },
  { m: 'Sep', items: [['plan', 'Guest speakers confirmed'], ['survey', 'Benchmarking survey'], ['online', 'Online session · member introduction']] },
  { m: 'Oct', items: [['plan', 'Q4 agenda shared'], ['online', 'Online session · member introduction']] },
  { m: 'Nov', items: [['live', 'Christmas in-person event'], ['online', 'Online session · member introduction']] },
  { m: 'Dec', items: [['survey', 'Member poll · topics for 2028'], ['online', 'Online session · member introduction']] },
]

const MEMBERS = [
  ['aviatrix', 'Aviatrix'], ['betclic-group', 'Betclic Group'], ['bragg', 'Bragg'],
  ['catena-media', 'Catena Media'], ['clever-advertising', 'Clever Advertising'],
  ['comeon-group', 'ComeOn Group'], ['eeze', 'Eeze'], ['fast-track', 'Fast Track'],
  ['game-lounge', 'Game Lounge'], ['gamingmalta', 'GamingMalta'], ['glitnor', 'Glitnor'],
  ['greentube', 'Greentube'], ['igen', 'iGEN'], ['joi-gaming', 'JOI Gaming'],
  ['leovegas', 'LeoVegas'], ['ll-europe', 'L&L Europe'], ['mga', 'MGA'],
  ['neo-group', 'Neo Group'], ['next-io', 'NEXT.io'], ['pressenter', 'PressEnter Group'],
  ['push-gaming', 'Push Gaming'], ['rank-international', 'Rank International'],
  ['rhino-entertainment', 'Rhino Entertainment'], ['rootz', 'Rootz'], ['tain', 'Tain'],
  ['yggdrasil', 'Yggdrasil'], ['yolo-group', 'Yolo Group'],
]

const TESTIMONIALS = [
  {
    name: 'Evicka Grech', org: 'L&L Europe',
    quote: 'L&L Europe has had the pleasure of being part of HR Connect for over five years, and it has ' +
      'truly been an enriching and progressive journey. The collaborative spirit within HR Connect is ' +
      'exceptional; despite each of us working in different organizations, we come together as colleagues, ' +
      'mentors, and friends, fostering a unique connection that goes beyond the workplace.',
  },
  {
    name: 'Henriette Calleja Gafa', org: 'Game Lounge',
    quote: 'One of the most significant advantages of being an HR Connect member is the unparalleled ' +
      'networking opportunities it offers. Through regular events, webinars, and workshops, I have had the ' +
      'privilege of connecting with industry experts, thought leaders, and fellow HR professionals.',
  },
  {
    name: 'Andrea Saliba', org: 'Rhino Entertainment',
    quote: 'HR Connect truly lives up to its name, by bringing HR professionals within the iGaming industry ' +
      'together, creating a platform to share ideas and best practices. This inclusive platform is designed ' +
      'by HR professionals, for HR professionals, addressing the industry’s need for collaborative spaces.',
  },
  {
    name: 'Etienne Gatt', org: 'MGA',
    quote: 'Through regular events, webinars, and surveys, HR Connect not only supports the professional ' +
      'growth of its members but also contributes to strengthening the HR landscape across the industry. ' +
      'The focus on collaborative problem-solving directly enhances the way we approach HR.',
  },
  {
    name: 'Tatiana Bogolyubskaya', org: 'Aviatrix',
    quote: 'I am happy to have become a part of HR Connect community which brings lots of value through ' +
      'practical discussions and gives opportunity to benchmark against others’ experiences. As HR ' +
      'professionals we know very well the benefit of knowledge sharing.',
  },
  {
    name: 'Wayne Zarb', org: 'PressEnter Group',
    quote: 'HR Connect offers a valuable community for HR professionals to collaborate, share knowledge, and ' +
      'discuss current challenges. The continuous learning opportunities, including insightful podcasts ' +
      'featuring industry experts, make it an excellent platform for staying updated.',
  },
]

/* Section copy. The page and the Present deck both read these, so a slide never
   re-types a line from the page, and an edit here reaches both. */
const HERO = { eyebrow: 'The one and only', title: ['The HR community', 'for iGaming.'] }

const MEMBERS_HEAD = {
  eyebrow: 'Our proud members',
  line: `${MEMBERS.length} companies: operators, suppliers, studios, affiliates and the regulator.`,
}

const HEADS = {
  benefits: {
    eyebrow: 'What you get',
    title: 'One annual fee. Everything the community does.',
    lead: 'Every band receives the full programme. The only things that change with company size are ' +
          'the number of named representatives and the fee.',
  },
  membership: {
    eyebrow: 'Membership',
    title: 'The size of your Malta organisation sets your fee.',
    lead: 'Annual company membership. Four bands, published pricing, no negotiation needed. Find your ' +
          'band below. Membership is priced on organisation size, and benefits reach your whole Malta team.',
  },
  about: { eyebrow: 'What is HR Connect' },   // the headline and lead are MISSION, split at its first sentence
  audience: {
    eyebrow: 'Who it\'s for',
    title: 'Built for the People teams behind iGaming.',
    lead: 'Membership is a company membership: your named representatives share the seats, so the ' +
          'community keeps working when one person is out of office.',
  },
  new2027: {
    eyebrow: 'New for 2027',
    title: 'Four things members get next\u00a0year that they didn’t in 2026.',   /* no-break space: balance split "next / year" */
    lead: 'The programme keeps evolving from member feedback. These formats are new for 2027.',
  },
  programme: {
    eyebrow: 'Programme',
    title: 'The 2027 member calendar.',
    lead: 'A monthly rhythm online, three in-person moments in Malta, and benchmarking through the year.',
  },
  testimonials: { eyebrow: 'What they say', title: 'In the members’ own words.' },
}

const PROGRAMME_NOTE =
  'Topics and venues are confirmed with members through the year, and agendas are shared quarterly.'

/* The membership terms, shown once under the band cards and on every band slide. */
const TERMS_YEAR =
  'Membership runs for the calendar year and covers your whole People team through your named representatives.'
const TERMS_CONFIRM = 'Not sure which band you fall into? We will confirm it with you.'

const JOIN = {
  title: ['Join the HR community', 'for iGaming.'],
  body: 'Tell us your company and your Malta headcount and we will confirm your band, send the membership ' +
        'details and get your representatives into the next session.',
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */

const eur = (n) => '€' + n.toLocaleString('en-US')

/* The lowest band's fee: "from €2,500" on the Present cover and family slide. */
const FROM_PRICE = Math.min(...TIERS.map((t) => t.price))

/* A band's name, as the hero's fee summary and the deck show it. */
const bandName = (t) => `${t.range} employees`

/* A band's details line: the fee finder's readout and the deck's join slide. */
const bandDetail = (t) => `${t.range} employees · ${t.reps} representatives · per year`

/* Each band card's anchor: #band-1-79, #band-80-249, #band-250-499, #band-500-plus.
   Read from the range, so it stays stable while the band does. The band's Present
   slide uses the same id, so a card link and a slide link agree. */
const bandAnchor = (t) =>
  'band-' + t.range.replace('+', ' plus').split(/[^0-9a-z]+/i).filter(Boolean).join('-').toLowerCase()

/* The enquiry button's label, on the membership section and the deck's join slide. */
const enquireLabel = (t) => (t ? `Enquire · ${eur(t.price)}` : 'Enquire about membership')

/* Typesetting only: ties a text's last two words with a no-break space, so a card
   never ends on a lone word. (CSS `text-wrap: pretty` is a heuristic in Chrome and
   misses short blocks.) The visible words are unchanged. */
const tie = (s) => s.replace(/ (\S+)$/, '\u00a0$1')

function tierForHeadcount(n) {
  if (!Number.isFinite(n) || n < 1) return null
  return TIERS.find((t) => n >= t.min && n <= t.max) || null
}

function buildMailto(tier) {
  const subject = 'HR Connect 2027: membership enquiry'
  const lines = [
    'Hi,',
    '',
    'We would like to enquire about HR Connect membership for 2027.',
    '',
    'Company:',
    'Malta headcount:',
    tier
      ? `Indicated tier: ${tier.range} employees, ${eur(tier.price)} per year (${tier.reps} representatives)`
      : 'Indicated tier: to be confirmed',
    '',
    'Please send over the membership details and next steps.',
    '',
    'Kind regards,',
  ]
  return `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`
}

function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-anim]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* A deep link (…/hr-connect-2027/#membership) lands on its section on first load.
   The browser's own fragment jump runs before React has rendered the section, so it
   never landed; the jump is made here instead, then repeated once fonts and late
   layout have settled. It is instant, not smooth, and any scroll input cancels it. */
function useLandOnHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id || !document.getElementById(id)) return
    let stop = false
    const cancel = () => { stop = true }
    const land = () => {
      const el = document.getElementById(id)
      if (stop || !el) return
      const root = document.documentElement
      const prev = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      el.scrollIntoView({ block: 'start' })
      root.style.scrollBehavior = prev
    }
    const inputs = ['wheel', 'touchstart', 'keydown', 'mousedown']
    inputs.forEach((t) => window.addEventListener(t, cancel, { passive: true }))
    const raf = requestAnimationFrame(land)
    const timers = [setTimeout(land, 350), setTimeout(land, 1200)]
    document.fonts?.ready.then(() => requestAnimationFrame(land))
    return () => {
      stop = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      inputs.forEach((t) => window.removeEventListener(t, cancel))
    }
  }, [])
}

/* A band link (…/#band-80-249, from Copy link on a band card or slide) opens on
   that band: it preselects itself exactly as the hero's band links do, so the fee
   finder, the band card and the enquiry mailto all read it. useLandOnHash does the
   scrolling; the card's .jump-card margin keeps it clear of the bar. */
function useBandFromHash(setPicked) {
  useEffect(() => {
    const read = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const t = TIERS.find((b) => bandAnchor(b) === id)
      if (t) setPicked(t.id)
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [setPicked])
}

/* ─── Small building blocks ───────────────────────────────────────────── */

/* `size="lg"` is the Present deck's eyebrow: the same mark and tracking, a step up. */
function Eyebrow({ children, tone = 'green', size = 'sm' }) {
  const tones = {
    green: 'text-hrc-green',
    amber: 'text-hrc-amber',
    cream: 'text-hrc-amber',
  }
  const lg = size === 'lg'
  return (
    <div className={`flex items-center gap-2.5 ${tones[tone]}`}>
      <Mark className={`${lg ? 'h-5' : 'h-4'} w-auto shrink-0`} />
      <span className={`${lg ? 'text-[12px] sm:text-[13px]' : 'text-[11px]'} font-extrabold uppercase tracking-[0.22em]`}>
        {children}
      </span>
    </div>
  )
}

/* `size` sets the headline scale. "statement" is for a headline that is a whole
   sentence (the About mission line): smaller on a phone so it keeps to four lines,
   the same scale as every other head from sm up. */
const HEAD_SIZE = {
  default:   'text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]',
  statement: 'text-[1.6rem] leading-[1.14] sm:text-4xl sm:leading-[1.08] lg:text-[2.75rem]',
}

function SectionHead({ eyebrow, title, lead, tone = 'green', align = 'left', size = 'default' }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`animate-on-scroll ${align === 'center' ? 'text-center' : ''} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
      data-anim
    >
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <Eyebrow tone={dark ? 'amber' : 'green'}>{eyebrow}</Eyebrow>
      </div>
      <h2 className={`mt-5 font-extrabold tracking-tight text-balance ${HEAD_SIZE[size]}
        ${dark ? 'text-white' : 'text-hrc-green'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed text-pretty ${dark ? 'text-white/70' : 'text-hrc-ink/70'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}

/* ─── Navigation ──────────────────────────────────────────────────────── */

/* In page order. The product (membership fees) comes first, and sits right after
   "What you get" on the page. */
const NAV = [
  ['Membership', 'membership'],
  ['About', 'about'],
  ['New for 2027', 'new-2027'],
  ['Programme', 'programme'],
]

/* The nav's Present button. Cream-backed, so it reads over the hero photo panel too.
   No display utility in here: each use adds its own (`hidden` and `inline-flex` on one
   element resolve by stylesheet order, and inline-flex won). */
const PRESENT_PILL =
  'h-10 items-center gap-1.5 rounded-full border-2 border-hrc-green/25 bg-hrc-cream/85 px-4 ' +
  'text-[13px] font-bold text-hrc-green transition-colors hover:border-hrc-green/60'

function Nav({ onPresent }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  const menuBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Anchored sections land flush under the bar. Its height changes by breakpoint,
  // so it is measured into --nav-h (read by `section[id]` in index.css) rather than
  // hardcoded. Only the bar row is observed: the open phone menu hangs below it and
  // must not push the landing point down.
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const set = () => document.documentElement.style.setProperty('--nav-h', `${bar.offsetHeight}px`)
    set()
    if (!('ResizeObserver' in window)) return
    const ro = new ResizeObserver(set)
    ro.observe(bar)
    return () => ro.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${solid ? 'bg-hrc-cream/92 backdrop-blur-md shadow-[0_1px_0_rgba(36,91,60,.12)]' : 'bg-transparent'}`}
    >
      <div ref={barRef} className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex h-11 shrink-0 items-center" aria-label="HR Connect, top of page">
          <Lockup className="h-7 min-[360px]:h-8 sm:h-9" />
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`}
               className="inline-flex h-10 items-center px-1 text-[13px] font-semibold text-hrc-ink/70 transition-colors
                          hover:text-hrc-green">
              {label}
            </a>
          ))}
          <button type="button" onClick={() => onPresent('')} data-present-open className={`inline-flex ${PRESENT_PILL}`}>
            <Presentation className="h-4 w-4" aria-hidden="true" /> Present
          </button>
          <a href="#join"
             className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-hrc-green px-5 text-[13px]
                        font-bold text-white transition-colors hover:bg-hrc-green-mid">
            Become a member <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* below lg the fees stay one tap away without opening the menu; Present joins
            them from md, and sits in the menu on a phone */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a href="#membership" data-fees-pill
             className="inline-flex h-10 items-center rounded-full border-2 border-hrc-green/25 px-4 text-[13px]
                        font-bold text-hrc-green transition-colors hover:border-hrc-green/60">
            <span className="sm:hidden">Fees</span>
            <span className="hidden sm:inline">See membership fees</span>
          </a>
          <button type="button" onClick={() => onPresent('')} data-present-open
                  className={`${PRESENT_PILL} hidden md:inline-flex`}>
            <Presentation className="h-4 w-4" aria-hidden="true" /> Present
          </button>
          <button
            ref={menuBtnRef}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-hrc-green"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hrc-green/10 bg-hrc-cream/98 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                 className="border-b border-hrc-green/10 py-3 text-sm font-semibold text-hrc-ink/80">
                {label}
              </a>
            ))}
            {/* focus moves to the menu button first, so closing the deck returns there */}
            <button type="button" data-present-open data-present-menu
                    onClick={() => { menuBtnRef.current?.focus(); setOpen(false); onPresent('') }}
                    className="flex items-center gap-2 border-b border-hrc-green/10 py-3 text-left text-sm font-semibold
                               text-hrc-ink/80 md:hidden">
              <Presentation className="h-4 w-4 text-hrc-green" aria-hidden="true" /> Present
            </button>
            <a href="#join" onClick={() => setOpen(false)}
               className="mt-4 mb-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-hrc-green
                          px-5 py-3 text-sm font-bold text-white">
              Become a member <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────── */

/* The first screen's answer to "what can I buy, and what does it cost": the four
   bands and their fees, read from TIERS like the product section. It is a summary,
   not a second rate card. Each band links to #membership and preselects itself
   there, so the fee finder, the band card and the enquiry mailto all open on it. */
function FeeSummary({ onPick }) {
  // Two by two until xl: beside the lg photo panel, and on phones, four across is too
  // narrow for "250 – 499 employees" on one line. From xl the four bands sit in a row.
  return (
    <div data-fee-summary
         className="overflow-hidden rounded-2xl bg-white ring-1 ring-hrc-green/10 sm:max-w-lg xl:max-w-none
                    shadow-[0_1px_2px_rgba(20,37,27,.05),0_18px_40px_-26px_rgba(20,37,27,.45)]">
      <div className="flex items-center justify-between gap-4 border-b border-hrc-ink/8 px-4 py-1
                      min-[360px]:px-5 sm:px-6 xl:px-5">
        <div className="flex min-h-10 items-center gap-2 text-hrc-green">
          <Mark className="h-3.5 w-auto shrink-0" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">Annual company membership</span>
        </div>
        <a href="#membership" data-fee-link
           className="group hidden min-h-10 shrink-0 items-center gap-1.5 text-[13px] font-bold text-hrc-green
                      transition-colors hover:text-hrc-green-mid sm:inline-flex">
          See membership fees
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <ul className="grid grid-cols-2 gap-px bg-hrc-ink/8 xl:grid-cols-4">
        {TIERS.map((t) => (
          <li key={t.id} className="bg-white">
            <a href="#membership" data-band={t.id} onClick={() => onPick(t.id)}
               aria-label={`${t.range} employees: ${eur(t.price)} per year`}
               className="group flex h-full flex-col px-3 py-3.5 transition-colors hover:bg-hrc-sand/70
                          focus-visible:bg-hrc-sand/70 min-[360px]:px-4 sm:px-6 sm:py-4 xl:px-5">
              <span className="whitespace-nowrap text-[11px] font-semibold tabular-nums text-hrc-ink/65
                               min-[360px]:text-[12px]">
                {t.range} employees
              </span>
              <span className="mt-1.5 flex items-end justify-between gap-2">
                <span className="text-[1.55rem] font-extrabold leading-none tracking-tight tabular-nums text-hrc-green
                                 sm:text-[1.7rem]">
                  {eur(t.price)}
                </span>
                <ArrowRight className="mb-0.5 h-4 w-4 shrink-0 text-hrc-green/35 transition-all
                                       group-hover:translate-x-0.5 group-hover:text-hrc-green" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href="#membership" data-fee-link
         className="flex min-h-11 items-center justify-between border-t border-hrc-ink/8 px-4 text-[13px]
                    font-bold text-hrc-green min-[360px]:px-5 sm:hidden">
        See membership fees <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

/* The hero's sign-off line. Each half is kept whole, so on a narrow phone it breaks
   at the dot rather than leaving "GamingMalta" on a line of its own. */
function Attribution() {
  return (
    <>
      <span className="whitespace-nowrap">A NEXT.io portfolio project</span> ·{' '}
      <span className="whitespace-nowrap">Supported by GamingMalta</span>
    </>
  )
}

function Hero({ onPick }) {
  return (
    <section id="top" className="relative overflow-hidden bg-hrc-cream pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-24 lg:pb-20
                                xl:pt-28">
      {/* the brand's cream → amber wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(115deg,#fffdf6 0%,#fffdf6 42%,#fdf3d2 68%,#ffce33 128%)' }}
      />
      {/* angled photo panel, echoing the infographic's hexagon crop. The top vertex
          sits at 65% so the diagonal clears the transparent nav's links at every
          laptop width (at 54% it cut through "Programme" from ~1150 to ~1400px) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <div
          className="h-full w-full"
          style={{
            clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 0 100%, 0 58%)',
            backgroundImage: `url(${base}images/hr-connect-session.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 26%',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="animate-on-scroll" data-anim>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </div>

          <h1
            className="animate-on-scroll mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight
                       text-hrc-green sm:mt-6 sm:text-6xl lg:text-[4.25rem]"
            data-anim style={{ transitionDelay: '60ms' }}
          >
            {HERO.title[0]}<br />{HERO.title[1]}
          </h1>

          {/* 16px on a phone (18px from sm) so the fee summary still makes the first screen */}
          <p className="animate-on-scroll mt-5 max-w-xl text-base leading-relaxed text-pretty text-hrc-ink/75
                        sm:mt-7 sm:text-lg lg:mt-6"
             data-anim style={{ transitionDelay: '120ms' }}>
            HR Connect is a business network for iGaming HR professionals, an omni-channel platform where
            members share experience, knowledge and connections. Supported by GamingMalta, we help iGaming
            organisations improve their People functions through peer-to-peer collaboration.
          </p>

          {/* "See membership fees" moved into the fee summary below, as its link */}
          <div className="animate-on-scroll mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8 lg:mt-7"
               data-anim style={{ transitionDelay: '180ms' }}>
            <a href="#join"
               className="inline-flex items-center gap-2 rounded-full bg-hrc-green px-7 py-3.5 text-sm
                          font-bold text-white shadow-lg shadow-hrc-green/20 transition-colors hover:bg-hrc-green-mid">
              Become a member <ArrowRight className="h-4 w-4" />
            </a>
            <p className="hidden text-[13px] font-semibold text-hrc-ink/65 sm:block">
              <Attribution />
            </p>
          </div>

          <div className="animate-on-scroll mt-7 sm:mt-8 lg:mt-7" data-anim style={{ transitionDelay: '220ms' }}>
            <FeeSummary onPick={onPick} />
          </div>

          <p className="animate-on-scroll mt-5 text-[13px] font-semibold text-hrc-ink/65 sm:hidden"
             data-anim style={{ transitionDelay: '240ms' }}>
            <Attribution />
          </p>
        </div>

        {/* proof strip: a solid card over the photo edge. The hairlines are the green/10
            gap over an opaque cream backing, so they read the same over cream and photo */}
        <div className="animate-on-scroll mt-10 overflow-hidden rounded-2xl bg-hrc-cream ring-1 ring-hrc-green/10
                        shadow-[0_1px_2px_rgba(20,37,27,.05),0_22px_48px_-30px_rgba(20,37,27,.5)] sm:mt-14 lg:mt-16"
             data-anim style={{ transitionDelay: '260ms' }}>
          <div className="grid grid-cols-2 gap-px bg-hrc-green/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-hrc-cream px-5 py-6 sm:px-7 sm:py-7">
                <div className="text-3xl font-extrabold tracking-tight tabular-nums text-hrc-green sm:text-4xl">{s.value}</div>
                <div className="mt-1.5 text-[13px] font-bold text-hrc-ink/80">{s.label}</div>
                <div className="mt-0.5 text-[11.5px] leading-snug text-hrc-ink/65">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── About / mission ─────────────────────────────────────────────────── */

function About() {
  // The mission statement is the section head: its first sentence is the headline and
  // the rest the lead. (A separate headline repeated the sentence's opening words.)
  const cut = MISSION.indexOf('. ') + 1
  return (
    <section id="about" className="relative bg-hrc-green-deep py-20 sm:py-28">
      <MarkTexture className="text-hrc-amber" opacity={0.07} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          tone="dark"
          size="statement"
          eyebrow={HEADS.about.eyebrow}
          title={MISSION.slice(0, cut)}
          lead={MISSION.slice(cut).trim()}
        />

        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title}
                 className="animate-on-scroll corner-cut bg-white/[0.055] p-7 ring-1 ring-inset ring-white/10"
                 data-anim style={{ transitionDelay: `${100 + i * 70}ms` }}>
              <p.icon className="h-6 w-6 text-hrc-amber" strokeWidth={2} />
              <h3 className="mt-5 text-lg font-extrabold text-white">{p.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{tie(p.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Who it's for ────────────────────────────────────────────────────── */

function Audience() {
  return (
    <section className="bg-hrc-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead {...HEADS.audience} />
        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <div key={a.tag}
                 className="animate-on-scroll relative overflow-hidden rounded-2xl bg-white p-7
                            shadow-[0_1px_3px_rgba(20,37,27,.06),0_12px_32px_-18px_rgba(20,37,27,.28)]"
                 data-anim style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="absolute right-0 top-0 h-16 w-16 bg-hrc-amber/12"
                   style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
              <a.icon className="relative h-6 w-6 text-hrc-green" strokeWidth={2} />
              {/* amber chip, deep-green type: amber-deep type on white read at 2.2:1 */}
              <div className="hex-clip-sm relative mt-5 inline-block bg-hrc-amber px-3.5 py-1 text-[10.5px] font-extrabold
                              uppercase tracking-[0.16em] text-hrc-green-deep">
                {a.tag}
              </div>
              <h3 className="relative mt-3 text-xl font-extrabold text-hrc-green">{a.title}</h3>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-hrc-ink/70">{tie(a.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── What membership includes ────────────────────────────────────────── */

function Benefits() {
  return (
    <section className="bg-hrc-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead {...HEADS.benefits} />
        {/* A wrapping row centres a short last row (7 items: 4 + 3 on desktop, 2-2-2-1
            on tablet), so no deliverable sits alone beside empty columns. Four across,
            the badge moves above the text so the titles keep to one line. */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-9 lg:gap-y-12">
          {BENEFITS.map((b, i) => (
            <div key={b.title}
                 className="animate-on-scroll flex w-full gap-4 sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]
                            lg:flex-col lg:gap-4"
                 data-anim style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <div className="hex-clip flex h-11 w-12 shrink-0 items-center justify-center bg-hrc-green">
                <b.icon className="h-5 w-5 text-hrc-amber" strokeWidth={2} />
              </div>
              <div className="pt-0.5 lg:pt-0">
                <h3 className="text-balance text-[15.5px] font-extrabold text-hrc-green">{b.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-hrc-ink/70">{tie(b.body)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Membership fees + fee finder ────────────────────────────────────── */

/* What changes between bands: the seats, and one free NEXT Summit Valletta pass per
   representative. The band card and the band's Present slide both render this, so
   the pass count can never drift from the seat count. `big` is the slide's scale. */
function BandLines({ t, big = false }) {
  const row = big
    ? 'gap-3 text-[17px] sm:text-lg'
    : 'gap-1.5 text-[12.5px] sm:gap-2.5 sm:text-[13.5px]'
  const icon = big ? 'mt-0.5 h-5 w-5' : 'mt-0.5 h-3.5 w-3.5 sm:mt-px sm:h-4 sm:w-4'
  return (
    <>
      <li className={`flex font-bold leading-snug text-hrc-ink/85 ${row}`}>
        <UserCheck className={`shrink-0 text-hrc-green ${icon}`} strokeWidth={2.2} />
        {t.reps} representatives
      </li>
      <li className={`flex leading-snug text-hrc-ink/70 ${row}`}>
        <Ticket className={`shrink-0 text-hrc-green ${icon}`} strokeWidth={2.2} />
        <span className="text-balance">{t.reps} free NEXT Summit Valletta passes</span>
      </li>
    </>
  )
}

/* What every band shares (TIER_INCLUDES), listed once: under the band cards, and on
   the deck's membership and band slides. */
function IncludesList({ className = '', item = 'text-[13.5px]', icon = 'mt-0.5 h-4 w-4' }) {
  return (
    <ul className={className}>
      {TIER_INCLUDES.map((inc) => (
        <li key={inc} className={`flex gap-2.5 font-semibold leading-snug text-hrc-ink/75 ${item}`}>
          <Check className={`shrink-0 text-hrc-green ${icon}`} strokeWidth={3} />
          <span className="text-balance">{inc}</span>
        </li>
      ))}
    </ul>
  )
}

/* Quiet tools beside the membership head: Present and Copy link. */
const QUIET_PILL = 'min-h-10 rounded-full border-2 border-hrc-green/20 bg-white/70 px-4 text-[13px] ' +
                   'text-hrc-green hover:border-hrc-green/50'

function Membership({ picked, setPicked, headcount, setHeadcount, active, onPresent }) {
  // `picked` and the headcount live in App, so the hero's fee summary and the Present
  // deck read and set the same band as this section
  const typed = headcount.trim() === '' ? NaN : Number(headcount)
  const invalid = headcount.trim() !== '' && (!Number.isFinite(typed) || typed < 1)

  const choose = useCallback((id) => {
    setPicked((prev) => (prev === id ? null : id))
  }, [setPicked])

  return (
    <section id="membership" className="bg-hrc-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHead {...HEADS.membership} />
          <div className="animate-on-scroll flex flex-wrap items-center gap-2" data-anim>
            <button type="button" onClick={() => onPresent('membership')} data-present-open
                    className={`inline-flex items-center gap-1.5 font-bold transition-colors ${QUIET_PILL}`}>
              <Presentation className="h-4 w-4" aria-hidden="true" /> Present
            </button>
            <CopyLinkButton id="membership" title="Copy a link to the membership fees" size={QUIET_PILL} />
          </div>
        </div>

        {/* fee finder */}
        <div className="animate-on-scroll mt-12 overflow-hidden rounded-2xl bg-hrc-green shadow-xl shadow-hrc-green/15"
             data-anim>
          <div className="grid items-center gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_auto]">
            <div>
              <label htmlFor="headcount"
                     className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-hrc-amber">
                <Search className="h-3.5 w-3.5" /> Find your membership fee
              </label>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <input
                  id="headcount"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={headcount}
                  onChange={(e) => { setHeadcount(e.target.value); setPicked(null) }}
                  placeholder="e.g. 180"
                  className="w-36 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-lg font-bold sm:w-44
                             text-white placeholder:font-medium placeholder:text-white/35 outline-none
                             transition-colors focus:border-hrc-amber"
                />
                <span className="text-sm font-semibold text-white/70">employees in Malta</span>
              </div>
              {invalid && (
                <p className="mt-3 text-[13px] font-semibold text-hrc-amber">
                  Enter a headcount of 1 or more.
                </p>
              )}
            </div>

            <div aria-live="polite" className="lg:text-right">
              {active ? (
                <>
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                    {picked ? 'Selected band' : 'Your band'}
                  </div>
                  <div className="mt-1.5 text-4xl font-extrabold tracking-tight tabular-nums text-hrc-amber sm:text-5xl">
                    {eur(active.price)}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/70">{bandDetail(active)}</div>
                </>
              ) : (
                <div className="text-sm font-medium text-pretty text-white/70">
                  Enter your Malta headcount, or pick a band below.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* band cards. Only the fee, the seats and the Valletta passes change between
            bands, so each card carries just those. The shared TIER_INCLUDES are listed
            once underneath instead of four times, which also keeps all four fees on one
            phone screen (two by two). Each card is a select button plus a quiet strip
            (Present, Copy link) outside it: a button cannot hold other buttons. */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {TIERS.map((t, i) => {
            const on = active?.id === t.id
            const anchor = bandAnchor(t)
            return (
              // the anchor sits on a still wrapper: the card inside animates in, and a
              // moving target would land a deep link short of the bar
              <div key={t.id} id={anchor} className="jump-card flex">
                <div className={`animate-on-scroll flex w-full flex-col overflow-hidden rounded-2xl bg-white
                                 transition-all duration-200
                                 ${on
                                   ? 'ring-2 ring-hrc-green shadow-xl shadow-hrc-green/15 -translate-y-1'
                                   : 'ring-1 ring-hrc-ink/8 hover:-translate-y-1 hover:ring-hrc-green/40'}`}
                     data-anim style={{ transitionDelay: `${i * 70}ms` }}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-pressed={on}
                    data-band-card={t.id}
                    className="group flex flex-1 flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-2
                               focus-visible:outline-hrc-green"
                  >
                    <div className={`w-full px-4 pt-4 pb-3.5 transition-colors sm:px-6 sm:pt-6 sm:pb-5
                                    ${on ? 'bg-hrc-green' : 'bg-hrc-green-deep group-hover:bg-hrc-green'}`}>
                      <div className="flex items-center gap-1.5 text-hrc-amber sm:gap-2">
                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.4} />
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]">
                          Employees
                        </span>
                      </div>
                      <div className="mt-1.5 text-xl font-extrabold tabular-nums text-white sm:mt-2 sm:text-2xl">{t.range}</div>
                    </div>

                    <div className="px-4 pt-4 pb-3.5 sm:px-6 sm:pt-5 sm:pb-5">
                      <div className="text-[1.7rem] font-extrabold leading-none tracking-tight tabular-nums text-hrc-green sm:text-[2rem]">
                        {eur(t.price)}
                      </div>
                      <div className="mt-1.5 text-[12px] font-semibold text-hrc-ink/65 sm:text-[12.5px]">per year</div>
                    </div>

                    <ul className="w-full flex-1 space-y-2 border-t border-hrc-ink/8 px-4 py-3.5 sm:space-y-2.5 sm:px-6 sm:py-5">
                      <BandLines t={t} />
                    </ul>

                    <div className={`flex w-full items-center gap-1.5 border-t border-hrc-ink/8 px-4 py-3 text-[12px] font-extrabold
                                     transition-colors sm:px-6 sm:py-3.5 sm:text-[12.5px]
                                    ${on ? 'bg-hrc-green/[0.07] text-hrc-green' : 'text-hrc-green/80 group-hover:text-hrc-green'}`}>
                      {on
                        ? <><Check className="h-3.5 w-3.5" strokeWidth={3} /> Selected</>
                        : <>Select this band <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></>}
                    </div>
                  </button>

                  {/* quiet tools for a call: present this band, or send a link to it */}
                  <div className="flex border-t border-hrc-ink/8 bg-hrc-sand/40">
                    <button type="button" onClick={() => onPresent(anchor)} data-present-open
                            aria-label={`Present the ${bandName(t)} band`} title="Present this band"
                            className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center gap-1.5 text-[11.5px]
                                       font-bold text-hrc-green/85 transition-colors hover:bg-hrc-green/[0.05]
                                       hover:text-hrc-green sm:w-auto sm:flex-1 sm:px-3">
                      <Presentation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="hidden sm:inline">Present</span>
                    </button>
                    <span className="my-2.5 w-px shrink-0 bg-hrc-ink/10" aria-hidden="true" />
                    <CopyLinkButton id={anchor} size="min-h-11 flex-1 justify-center px-2 text-[11.5px]"
                                    className="text-hrc-green/85 hover:bg-hrc-green/[0.05] hover:text-hrc-green" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* what every band shares, once, then the enquiry */}
        <div className="animate-on-scroll mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-hrc-ink/8 sm:mt-6" data-anim>
          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-hrc-green">Every band includes</div>
            <IncludesList className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-hrc-ink/8 bg-hrc-sand/45
                          px-5 py-5 sm:px-7 sm:py-6">
            <p className="max-w-xl text-[14.5px] leading-relaxed text-pretty text-hrc-ink/70">
              {TERMS_YEAR} {TERMS_CONFIRM}
            </p>
            <a href={buildMailto(active)} data-enquire
               className="inline-flex shrink-0 items-center gap-2 rounded-full bg-hrc-green px-7 py-3.5
                          text-sm font-bold text-white transition-colors hover:bg-hrc-green-mid">
              <Mail className="h-4 w-4" />
              {enquireLabel(active)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── New for 2027 ────────────────────────────────────────────────────── */

function New2027() {
  return (
    <section id="new-2027" className="relative overflow-hidden bg-hrc-green-deep py-20 sm:py-28">
      <MarkTexture className="text-hrc-amber" opacity={0.06} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tone="dark" {...HEADS.new2027} />
        {/* two by two from lg: full-width rows left the right third of every card
            empty on desktop (below lg a full-width card reads well). The tag leads each
            card, so the title and body always start on the same line across a row. */}
        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-5">
          {NEW_2027.map((n, i) => (
            <div key={n.title}
                 className="animate-on-scroll relative overflow-hidden rounded-xl bg-hrc-green/35 p-6 pl-8
                            ring-1 ring-inset ring-white/10 sm:p-8 sm:pl-10"
                 data-anim style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
              <div className="absolute inset-y-0 left-0 w-1.5 bg-hrc-amber" />
              <span className="hex-clip-sm inline-block bg-hrc-amber px-4 py-1.5 text-[10.5px] font-extrabold
                               uppercase tracking-[0.14em] text-hrc-green-deep">
                {n.tag}
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-balance text-hrc-amber sm:text-2xl">{n.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{tie(n.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 2027 programme calendar ─────────────────────────────────────────── */

/* How each kind of calendar item is marked. In-person moments carry the weight;
   the monthly session is the quiet baseline every month shares. */
const KIND = {
  live:   { Icon: MapPin,        text: 'font-bold text-hrc-green', icon: 'text-hrc-amber-deep' },
  plan:   { Icon: CalendarCheck, text: 'text-hrc-ink/80',          icon: 'text-hrc-green' },
  survey: { Icon: BarChart3,     text: 'text-hrc-ink/80',          icon: 'text-hrc-green' },
  online: { Icon: Video,         text: 'text-hrc-ink/65',          icon: 'text-hrc-green/50' },
}
/* Type sizes by kind: the online session sits half a step below the rest. `big` is
   the Present deck's programme slide. */
const KIND_SIZE = {
  page: { live: 'text-[13.5px]', plan: 'text-[13.5px]', survey: 'text-[13.5px]', online: 'text-[13px]' },
  big:  { live: 'text-[15px]',   plan: 'text-[15px]',   survey: 'text-[15px]',   online: 'text-[14px]' },
}

/* The year as four quarters of three months, matching how agendas are shared. */
const QUARTERS = [0, 1, 2, 3].map((q) => CALENDAR.slice(q * 3, q * 3 + 3))

/* One month: its date block (amber when it holds an in-person moment) and its items,
   each marked by kind. The page's quarter cards and the deck's programme slide both
   render months through this, so the markers mean the same thing in both. */
function MonthRow({ c, className = '', big = false }) {
  const live = c.items.some(([k]) => k === 'live')
  const sizes = KIND_SIZE[big ? 'big' : 'page']
  return (
    <div className={`flex gap-3 ${live ? 'bg-hrc-amber/[0.1]' : ''} ${className}`}>
      <div className={`hex-clip flex h-10 w-12 shrink-0 items-center justify-center text-[11.5px]
                       font-extrabold uppercase tracking-[0.08em]
                       ${live ? 'bg-hrc-amber text-hrc-green-deep' : 'bg-hrc-green text-white'}`}>
        {c.m}
      </div>
      <ul className="min-w-0 flex-1 space-y-1.5 pt-0.5">
        {c.items.map(([k, t]) => {
          const { Icon, text, icon } = KIND[k]
          return (
            <li key={t} className={`flex gap-2 leading-snug ${sizes[k]} ${text}`}>
              <Icon className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${icon}`} strokeWidth={2.2} aria-hidden="true" />
              {t}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* `display` carries the display utility, so a caller can hide it by breakpoint
   without a second, conflicting one on the same element. */
function ProgrammeLegend({ className = '', display = 'flex', ...rest }) {
  return (
    <div className={`${display} flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] font-semibold text-hrc-ink/70 ${className}`}
         {...rest}>
      <span className="flex items-center gap-2">
        <span className="hex-clip h-3.5 w-4 bg-hrc-amber" aria-hidden="true" /> In-person in Malta
      </span>
      <span className="flex items-center gap-2">
        <Video className="h-4 w-4 text-hrc-green/60" strokeWidth={2.2} aria-hidden="true" /> Online session
      </span>
    </div>
  )
}

function Programme() {
  return (
    <section id="programme" className="bg-hrc-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead {...HEADS.programme} />

        <ProgrammeLegend className="animate-on-scroll mt-8" data-anim />

        {/* Quarter cards. From md up each card is a four-row grid (header + three
            months, the months as equal 1fr rows) and the cards stretch to one height,
            so the month rows line up across the quarters like a planner. */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {QUARTERS.map((months, q) => (
            <div key={q} role="group" aria-label={`Quarter ${q + 1}: ${months[0].m} to ${months[2].m}`}
                 className="animate-on-scroll flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-hrc-ink/8
                            md:grid md:grid-rows-[auto_1fr_1fr_1fr]"
                 data-anim style={{ transitionDelay: `${q * 70}ms` }}>
              <div className="flex items-baseline justify-between border-b border-hrc-ink/8 px-4 py-3.5 sm:px-5">
                <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-hrc-green">Q{q + 1}</span>
                <span className="text-[12px] font-semibold text-hrc-ink/65">{months[0].m} – {months[2].m}</span>
              </div>
              {months.map((c, r) => (
                <MonthRow key={c.m} c={c}
                          className={`px-4 py-4 sm:gap-4 sm:px-5 ${r > 0 ? 'border-t border-hrc-ink/[0.07]' : ''}`} />
              ))}
            </div>
          ))}
        </div>

        <p className="animate-on-scroll mt-8 text-[13px] text-pretty text-hrc-ink/65" data-anim>
          {PROGRAMME_NOTE}
        </p>
      </div>
    </section>
  )
}

/* ─── Members wall ────────────────────────────────────────────────────── */

function Members() {
  const doubled = useMemo(() => [...MEMBERS, ...MEMBERS], [])
  return (
    <section id="members" className="overflow-hidden border-b border-hrc-ink/8 bg-hrc-sand py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="animate-on-scroll flex flex-wrap items-baseline gap-x-4 gap-y-1" data-anim>
          <Eyebrow>{MEMBERS_HEAD.eyebrow}</Eyebrow>
          <p className="text-[13.5px] text-hrc-ink/65">{MEMBERS_HEAD.line}</p>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r
                        from-hrc-sand to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l
                        from-hrc-sand to-transparent sm:w-24" />
        <div className="flex w-max marquee-track">
          {doubled.map(([slug, name], i) => (
            <div key={`${slug}-${i}`}
                 className="mx-2 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-5
                            ring-1 ring-hrc-ink/6 sm:mx-2.5 sm:h-22 sm:w-48">
              <img src={`${base}logos/members/${slug}.png`} alt={name} decoding="async"
                   className="max-h-9 w-auto max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ────────────────────────────────────────────────────── */

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-hrc-green-deep py-20 sm:py-28">
      <MarkTexture className="text-hrc-amber" opacity={0.06} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tone="dark" {...HEADS.testimonials} />
        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name}
                    className="animate-on-scroll mb-5 break-inside-avoid rounded-2xl bg-white p-7"
                    data-anim style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <Quote className="h-6 w-6 text-hrc-amber" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-4 text-[14.5px] leading-relaxed text-hrc-ink/75">
                {tie(t.quote)}
              </blockquote>
              <figcaption className="mt-5 border-t border-hrc-ink/10 pt-4">
                <div className="text-[14.5px] font-extrabold text-hrc-green">{t.name}</div>
                <div className="text-[13px] font-semibold text-hrc-ink/65">{t.org}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Join ────────────────────────────────────────────────────────────── */

function Join() {
  return (
    <section id="join" className="relative overflow-hidden bg-hrc-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0"
           style={{ background: 'linear-gradient(200deg,#fffdf6 0%,#fdf3d2 62%,#ffce33 150%)' }} />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="animate-on-scroll flex justify-center" data-anim>
          <Mark className="h-12 w-auto text-hrc-green" />
        </div>
        <h2 className="animate-on-scroll mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight text-balance
                       text-hrc-green sm:text-5xl" data-anim style={{ transitionDelay: '60ms' }}>
          {JOIN.title[0]}<br className="hidden sm:block" /> {JOIN.title[1]}
        </h2>
        <p className="animate-on-scroll mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-hrc-ink/70"
           data-anim style={{ transitionDelay: '120ms' }}>
          {JOIN.body}
        </p>
        {/* stacked on a phone the two buttons share one width, rather than two ragged pills */}
        <div className="animate-on-scroll mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row
                        sm:flex-wrap sm:justify-center"
             data-anim style={{ transitionDelay: '180ms' }}>
          <a href={buildMailto(null)}
             className="inline-flex items-center justify-center gap-2 rounded-full bg-hrc-green px-8 py-4 text-sm
                        font-bold text-white shadow-lg shadow-hrc-green/20 transition-colors hover:bg-hrc-green-mid">
            <Mail className="h-4 w-4" /> Enquire about membership
          </a>
          <a href="#membership"
             className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-hrc-green/25 px-8
                        py-4 text-sm font-bold text-hrc-green transition-colors hover:border-hrc-green/60">
            Check your fee band
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-hrc-green-deep py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8
                      md:flex-row md:justify-between md:text-left">
        <img src={`${base}logos/hrconnect-lockup-amber.svg`} alt="HR Connect, NEXT.io | GAMING MALTA"
             className="h-9 w-auto" />
        <div className="text-[13px] leading-relaxed text-white/60">
          <p>A NEXT.io portfolio project, supported by GamingMalta.</p>
          <p>
            {/* a 40px-tall target for a thumb, still set as inline text */}
            <a href={`mailto:${CONTACT}`}
               className="inline-flex min-h-10 items-center font-semibold text-white/80 hover:text-hrc-amber">
              {CONTACT}
            </a>
            <span className="mx-2 text-white/30" aria-hidden="true">·</span>
            HR Connect 2027
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Present mode: the deck ──────────────────────────────────────────────
   A full-screen walk-through for a call (src/PresentMode.jsx runs it). Every slide
   reads the page's own arrays and section copy, in page order, so a new band,
   benefit, month or testimonial appears in the deck by itself and no slide says
   anything the page does not. The deck is light and warm, in HR Connect's own
   identity: cream ground, green type, amber accents, deep-green cards. */

const SLIDE_H2 = 'font-extrabold tracking-tight text-balance text-hrc-green'
const SLIDE_SIZE = {
  default: 'text-[2rem] leading-[1.06] sm:text-5xl lg:text-[3.25rem]',
  split:   'text-[2rem] leading-[1.06] sm:text-5xl lg:text-[2.75rem]',
  statement: 'text-[1.6rem] leading-[1.14] sm:text-4xl sm:leading-[1.1] lg:text-[2.4rem]',
}
const SLIDE_LEAD = 'text-lg leading-relaxed text-pretty text-hrc-ink/75 sm:text-xl'
const SLIDE_LABEL = 'text-[11px] font-extrabold uppercase tracking-[0.2em] text-hrc-green'
const SLIDE_CARD = 'rounded-2xl bg-white ring-1 ring-hrc-ink/8 ' +
                   'shadow-[0_1px_2px_rgba(20,37,27,.05),0_18px_40px_-26px_rgba(20,37,27,.35)]'
const PM_PRIMARY = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-hrc-green px-6 text-[15px] ' +
                   'font-bold text-white shadow-lg shadow-hrc-green/20 transition-colors hover:bg-hrc-green-mid'
const PM_SECONDARY = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-hrc-green/25 ' +
                     'bg-white/70 px-6 text-[15px] font-bold text-hrc-green transition-colors hover:border-hrc-green/60'

const chunk = (list, n) => list.reduce((acc, x, i) => {
  if (i % n === 0) acc.push([])
  acc[acc.length - 1].push(x)
  return acc
}, [])

/* The deck, in page order. `toc` puts a slide in the cover's "In this presentation"
   list ('' lists it without a count). Band slides use the band card's anchor as their
   id, so ?present=band-80-249 and #band-80-249 point at the same band. */
function buildSlides() {
  const s = []
  s.push({ id: 'cover', label: 'Cover', group: 'HR Connect 2027', kind: 'cover' })
  s.push({ id: 'members', label: 'Our members', group: 'Our members', kind: 'members',
           toc: `${MEMBERS.length} companies` })
  s.push({ id: 'what-you-get', label: 'What you get', group: 'Membership', kind: 'benefits',
           toc: `${BENEFITS.length} included` })
  s.push({ id: 'membership', label: 'Membership', group: 'Membership', kind: 'family',
           toc: `${TIERS.length} bands, from ${eur(FROM_PRICE)}` })
  TIERS.forEach((t, n) => s.push({ id: bandAnchor(t), label: bandName(t), group: 'Membership', kind: 'band', t, n }))
  s.push({ id: 'about', label: HEADS.about.eyebrow, group: 'About HR Connect', kind: 'about', toc: '' })
  s.push({ id: 'who', label: HEADS.audience.eyebrow, group: 'About HR Connect', kind: 'who', toc: '' })
  s.push({ id: 'new-2027', label: HEADS.new2027.eyebrow, group: 'About HR Connect', kind: 'new',
           toc: `${NEW_2027.length} new formats` })
  s.push({ id: 'programme', label: HEADS.programme.eyebrow, group: 'About HR Connect', kind: 'programme',
           toc: `${CALENDAR.length} months` })
  const pages = chunk(TESTIMONIALS, 3)
  pages.forEach((items, n) => s.push({
    id: n ? `testimonials-${n + 1}` : 'testimonials',
    label: pages.length > 1 ? `${HEADS.testimonials.eyebrow}, ${n + 1} of ${pages.length}` : HEADS.testimonials.eyebrow,
    group: HEADS.testimonials.eyebrow, kind: 'quotes', items, n, of: pages.length,
    toc: n ? undefined : `${TESTIMONIALS.length} members`, tocLabel: HEADS.testimonials.eyebrow,
  }))
  s.push({ id: 'join', label: 'Next steps', group: 'Next steps', kind: 'join', toc: '' })
  return s
}

/* `compact` is for the two densest slides (New for 2027, Programme): tighter
   spacing and a smaller, wider lead, so they still fit a 1280x800 screen. */
function SlideHead({ eyebrow, title, lead, size = 'default', compact = false, className = '' }) {
  return (
    <div className={`${compact ? 'max-w-5xl' : 'max-w-4xl'} ${className}`}>
      <Eyebrow size="lg">{eyebrow}</Eyebrow>
      <h2 className={`${compact ? 'mt-3' : 'mt-4'} ${SLIDE_H2} ${SLIDE_SIZE[size]}`}>{title}</h2>
      {lead && (
        <p className={compact
          ? 'mt-3 max-w-4xl text-base leading-relaxed text-pretty text-hrc-ink/75 sm:text-lg'
          : `mt-4 max-w-3xl ${SLIDE_LEAD}`}>
          {lead}
        </p>
      )}
    </div>
  )
}

/* 1 · Cover: the hero's lockup, headline and proof figures, and the way through. */
function CoverSlide({ slides, goId }) {
  const toc = slides.filter((s) => s.toc !== undefined)
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <Lockup className="h-9 sm:h-11" />
        <h1 className="mt-8 text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-hrc-green sm:mt-10 sm:text-6xl
                       lg:text-[4.1rem]">
          {HERO.title[0]}<br />{HERO.title[1]}
        </h1>
        <p className="mt-5 text-base font-bold text-hrc-ink/75 sm:text-lg">
          <span className="whitespace-nowrap">Annual company membership</span> ·{' '}
          <span className="whitespace-nowrap">from {eur(FROM_PRICE)} per year</span>
        </p>
        <p className="mt-1.5 text-[13px] font-semibold text-hrc-ink/65"><Attribution /></p>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-hrc-green/10 ring-1 ring-hrc-green/10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-hrc-cream px-4 py-4 sm:px-5">
              <div className="text-2xl font-extrabold tracking-tight tabular-nums text-hrc-green sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[13px] font-bold text-hrc-ink/80">{s.label}</div>
              <div className="mt-0.5 text-[12px] leading-snug text-hrc-ink/65">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className={`${SLIDE_CARD} px-5 py-4 sm:px-6 sm:py-5`}>
          <p className={SLIDE_LABEL}>In this presentation</p>
          <ol className="mt-2 divide-y divide-hrc-ink/8">
            {toc.map((s, n) => (
              <li key={s.id}>
                <button type="button" onClick={() => goId(s.id)} data-toc={s.id}
                        className="group flex min-h-11 w-full items-center gap-3 py-1.5 text-left">
                  <span className="w-6 shrink-0 text-xs font-bold tabular-nums text-hrc-ink/65">
                    {String(n + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-bold text-hrc-green">{s.tocLabel || s.label}</span>
                  {s.toc && <span className="shrink-0 text-right text-[13px] font-semibold text-hrc-ink/65">{s.toc}</span>}
                  <ArrowRight className="h-4 w-4 shrink-0 text-hrc-green/40 transition-all group-hover:translate-x-0.5
                                         group-hover:text-hrc-green" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-center text-[13px] font-semibold text-hrc-ink/65 lg:text-left">
          Use the arrow keys, or swipe
        </p>
      </div>
    </div>
  )
}

/* 2 · Proof: the member wall, as a still grid, with the page's own line. */
function MembersSlide() {
  return (
    <div>
      <SlideHead eyebrow={MEMBERS_HEAD.eyebrow} title="Who is already in HR Connect." lead={MEMBERS_HEAD.line} />
      <ul className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:mt-10">
        {MEMBERS.map(([slug, name]) => (
          <li key={slug}
              className="flex h-14 w-[calc((100%_-_1.25rem)/3_-_0.1px)] items-center justify-center rounded-xl bg-white px-3
                         ring-1 ring-hrc-ink/[0.06] sm:h-16 sm:w-[calc((100%_-_3rem)/5_-_0.1px)]
                         lg:w-[calc((100%_-_4.5rem)/7_-_0.1px)]">
            <img src={`${base}logos/members/${slug}.png`} alt={name} decoding="async"
                 className="max-h-7 w-auto max-w-full object-contain sm:max-h-8" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 3 · What you get: the seven deliverables, as the page's "What you get" lists them. */
function BenefitsSlide() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <SlideHead {...HEADS.benefits} size="split" className="lg:col-span-5" />
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7">
        {BENEFITS.map((b) => (
          <li key={b.title} className="flex gap-4">
            <div className="hex-clip flex h-10 w-11 shrink-0 items-center justify-center bg-hrc-green">
              <b.icon className="h-5 w-5 text-hrc-amber" strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-balance text-hrc-green">{b.title}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-hrc-ink/70">{tie(b.body)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 4 · The family slide: the membership section's head, the four bands (each opens
   its slide) and what every band shares. */
function FamilySlide({ active, goId }) {
  const h = HEADS.membership
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <Eyebrow size="lg">{h.eyebrow}</Eyebrow>
        <h2 className={`mt-4 ${SLIDE_H2} ${SLIDE_SIZE.split}`}>{h.title}</h2>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-9 items-center rounded-full bg-hrc-green px-3.5 text-[13px] font-bold text-white">
            {TIERS.length} bands
          </span>
          <span className="inline-flex min-h-9 items-center rounded-full bg-hrc-amber px-3.5 text-[13px] font-bold
                           text-hrc-green-deep">
            from {eur(FROM_PRICE)} per year
          </span>
          <CopyLinkButton id="membership" title="Copy a link to the membership fees"
                          className="text-hrc-green/85 hover:bg-hrc-green/[0.07] hover:text-hrc-green" />
        </div>
        <p className="mt-5 text-base leading-relaxed text-pretty text-hrc-ink/75 sm:text-lg">{h.lead}</p>
      </div>
      <div className="lg:col-span-7">
        <ul className="grid grid-cols-2 gap-3">
          {TIERS.map((t) => {
            const on = active?.id === t.id
            return (
              <li key={t.id} className="flex">
                <button type="button" onClick={() => goId(bandAnchor(t))} data-family-band={t.id}
                        className={`group flex w-full flex-col rounded-2xl bg-white p-4 text-left transition sm:p-5
                                    ${on ? 'ring-2 ring-hrc-green' : 'ring-1 ring-hrc-ink/8 hover:ring-hrc-green/40'}`}>
                  <span className="text-[12px] font-semibold tabular-nums text-hrc-ink/65 sm:text-[13px]">{bandName(t)}</span>
                  <span className="mt-1.5 flex items-end justify-between gap-2">
                    <span className="text-[1.7rem] font-extrabold leading-none tracking-tight tabular-nums text-hrc-green
                                     sm:text-4xl">
                      {eur(t.price)}
                    </span>
                    <ArrowRight className="mb-1 h-4 w-4 shrink-0 text-hrc-green/35 transition-all group-hover:translate-x-0.5
                                           group-hover:text-hrc-green" aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-[12.5px] font-semibold text-hrc-ink/65 sm:text-[13px]">
                    <span className="whitespace-nowrap">per year</span> ·{' '}
                    <span className="whitespace-nowrap">{t.reps} representatives</span>
                  </span>
                  {on && (
                    <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-extrabold text-hrc-green">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> Selected
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
        <div className={`${SLIDE_CARD} mt-3 px-5 py-5 sm:px-6`}>
          <p className={SLIDE_LABEL}>Every band includes</p>
          <IncludesList className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" item="text-[14.5px]" />
        </div>
      </div>
    </div>
  )
}

/* 5 · One slide per band: its fee, what it gets, the terms, and the same choice the
   hero's band links make. "Choose this band" sets `picked`, so the enquiry on the
   next-steps slide (and on the page) carries it. */
function BandSlide({ t, n, active, onChoose, onOpenCard, goId }) {
  const on = active?.id === t.id
  const anchor = bandAnchor(t)
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <Eyebrow size="lg">{HEADS.membership.eyebrow} · Band {n + 1} of {TIERS.length}</Eyebrow>
        <h2 className={`mt-4 ${SLIDE_H2}`}>
          <span className="block text-[3.2rem] leading-none tabular-nums sm:text-7xl lg:text-[5.25rem]">{t.range}</span>
          <span className="mt-2 block text-2xl font-bold tracking-normal text-hrc-ink/70 sm:text-3xl">employees</span>
        </h2>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-5xl font-extrabold tracking-tight tabular-nums text-hrc-green sm:text-6xl">{eur(t.price)}</span>
          <span className="text-lg font-semibold text-hrc-ink/65">per year</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onChoose(t.id)} aria-pressed={on} data-choose={t.id}
                  className={on
                    ? 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-hrc-amber px-6 text-[15px] font-bold text-hrc-green-deep'
                    : PM_PRIMARY}>
            {on
              ? <><Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> Selected</>
              : <>Choose this band <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
          </button>
          <button type="button" onClick={() => onOpenCard(anchor)} data-open-card={anchor} className={PM_SECONDARY}>
            Open the card
          </button>
          <CopyLinkButton id={anchor} size="min-h-12 rounded-full px-4 text-sm"
                          className="text-hrc-green/85 hover:bg-hrc-green/[0.07] hover:text-hrc-green" />
        </div>
        <div className="mt-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-hrc-ink/65">Other bands</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIERS.filter((o) => o.id !== t.id).map((o) => (
              <button key={o.id} type="button" onClick={() => goId(bandAnchor(o))}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/80 px-4 text-sm font-bold
                                 text-hrc-green ring-1 ring-hrc-green/15 transition hover:ring-hrc-green/45">
                {active?.id === o.id && (
                  <><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /><span className="sr-only">Selected:</span></>
                )}
                <span className="tabular-nums">{o.range}</span>
                <span className="font-semibold tabular-nums text-hrc-ink/65">{eur(o.price)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className={`${SLIDE_CARD} overflow-hidden`}>
          <div className="px-5 py-5 sm:px-6">
            <p className={SLIDE_LABEL}>What you get</p>
            <ul className="mt-4 space-y-3"><BandLines t={t} big /></ul>
          </div>
          <div className="border-t border-hrc-ink/8 px-5 py-5 sm:px-6">
            <p className={SLIDE_LABEL}>Every band includes</p>
            <IncludesList className="mt-3 space-y-2.5" item="text-[15px]" />
          </div>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-pretty text-hrc-ink/70">{TERMS_YEAR} {TERMS_CONFIRM}</p>
      </div>
    </div>
  )
}

/* 6 · What is HR Connect: the mission (headline + lead, as on the page) and its three pillars. */
function AboutSlide() {
  const cut = MISSION.indexOf('. ') + 1
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <Eyebrow size="lg">{HEADS.about.eyebrow}</Eyebrow>
        <h2 className={`mt-4 ${SLIDE_H2} ${SLIDE_SIZE.statement}`}>{MISSION.slice(0, cut)}</h2>
        <p className={`mt-5 ${SLIDE_LEAD}`}>{MISSION.slice(cut).trim()}</p>
      </div>
      <ul className="grid gap-3 lg:col-span-6">
        {PILLARS.map((p) => (
          <li key={p.title} className="corner-cut flex gap-4 bg-hrc-green-deep p-5 sm:p-6">
            <p.icon className="mt-0.5 h-6 w-6 shrink-0 text-hrc-amber" strokeWidth={2} aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold text-white">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">{tie(p.body)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 7 · Who it's for: who, sector, where. */
function WhoSlide() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <SlideHead {...HEADS.audience} size="split" className="lg:col-span-5" />
      <ul className="grid gap-3 lg:col-span-7">
        {AUDIENCE.map((a) => (
          <li key={a.tag} className={`${SLIDE_CARD} flex gap-4 p-5 sm:p-6`}>
            <a.icon className="mt-1 h-6 w-6 shrink-0 text-hrc-green" strokeWidth={2} aria-hidden="true" />
            <div className="min-w-0">
              <span className="hex-clip-sm inline-block bg-hrc-amber px-3.5 py-1 text-[10.5px] font-extrabold uppercase
                               tracking-[0.16em] text-hrc-green-deep">
                {a.tag}
              </span>
              <h3 className="mt-2.5 text-xl font-extrabold text-hrc-green">{a.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-hrc-ink/70">{tie(a.body)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 8 · New for 2027: the four new formats, as the page's deep-green cards. */
function NewSlide() {
  return (
    <div>
      <SlideHead {...HEADS.new2027} size="statement" compact />
      <ul className="mt-5 grid gap-3 lg:grid-cols-2">
        {NEW_2027.map((x) => (
          <li key={x.title} className="relative overflow-hidden rounded-xl bg-hrc-green-deep p-5 pl-7 sm:px-6 sm:pl-8 lg:py-4">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-hrc-amber" aria-hidden="true" />
            <span className="hex-clip-sm inline-block bg-hrc-amber px-3.5 py-1 text-[10.5px] font-extrabold uppercase
                             tracking-[0.14em] text-hrc-green-deep">
              {x.tag}
            </span>
            <h3 className="mt-2 text-xl font-extrabold text-balance text-hrc-amber">{x.title}</h3>
            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/80">{tie(x.body)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 9 · Programme: the member calendar, quarter by quarter, months through MonthRow.
   Quarters run as rows here (a wide screen has the width, not the height). */
function ProgrammeSlide() {
  const h = HEADS.programme
  return (
    <div>
      <SlideHead {...h} compact />
      <ProgrammeLegend className="mt-4" display="flex lg:hidden" />
      <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-hrc-ink/8 lg:mt-5">
        {QUARTERS.map((months, q) => (
          <div key={q} role="group" aria-label={`Quarter ${q + 1}: ${months[0].m} to ${months[2].m}`}
               className={`grid lg:grid-cols-[6.25rem_1fr_1fr_1fr] ${q ? 'border-t border-hrc-ink/10' : ''}`}>
            <div className="flex items-baseline justify-between gap-2 border-b border-hrc-ink/8 bg-hrc-sand/50 px-4 py-2.5
                            lg:flex-col lg:justify-center lg:border-b-0 lg:border-r">
              <span className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-hrc-green">Q{q + 1}</span>
              <span className="whitespace-nowrap text-[12px] font-semibold text-hrc-ink/65">{months[0].m} – {months[2].m}</span>
            </div>
            {months.map((c, r) => (
              <MonthRow key={c.m} c={c} big
                        className={`px-4 py-3 lg:py-2.5 ${r > 0 ? 'border-t border-hrc-ink/[0.07] lg:border-t-0 lg:border-l' : ''}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p className="text-[13px] text-pretty text-hrc-ink/65">{PROGRAMME_NOTE}</p>
        <ProgrammeLegend display="hidden lg:flex" />
      </div>
    </div>
  )
}

/* 10 · Testimonials, three to a slide, attributed as on the page. */
function QuotesSlide({ items }) {
  return (
    <div>
      <SlideHead {...HEADS.testimonials} />
      <div className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {items.map((t) => (
          <figure key={t.name} className={`${SLIDE_CARD} flex flex-col p-6 sm:p-7`}>
            <Quote className="h-6 w-6 text-hrc-amber" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-hrc-ink/80">{tie(t.quote)}</blockquote>
            <figcaption className="mt-5 border-t border-hrc-ink/10 pt-4">
              <div className="text-[15px] font-extrabold text-hrc-green">{t.name}</div>
              <div className="text-[13px] font-semibold text-hrc-ink/65">{t.org}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/* 11 · Next steps: the page's join copy, the band (the same `picked` the page uses)
   and the page's own enquiry mailto for it. */
function JoinSlide({ active, onChoose }) {
  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <div className="flex justify-center"><Mark className="h-11 w-auto text-hrc-green" /></div>
      <h2 className={`mt-6 ${SLIDE_H2} ${SLIDE_SIZE.default}`}>
        {JOIN.title[0]}<br className="hidden sm:block" /> {JOIN.title[1]}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-hrc-ink/70">{JOIN.body}</p>
      <div className={`${SLIDE_CARD} mx-auto mt-8 max-w-xl p-5 text-left sm:p-6`}>
        <p className={SLIDE_LABEL} id="pm-band-label">Your band</p>
        <div role="group" aria-labelledby="pm-band-label" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIERS.map((t) => {
            const on = active?.id === t.id
            return (
              <button key={t.id} type="button" aria-pressed={on} onClick={() => onChoose(t.id)} data-join-band={t.id}
                      className={`min-h-11 rounded-xl px-2 text-sm font-bold tabular-nums ring-1 transition-colors
                                  ${on ? 'bg-hrc-green text-white ring-hrc-green'
                                       : 'bg-white text-hrc-green ring-hrc-green/20 hover:ring-hrc-green/50'}`}>
                {t.range}
              </button>
            )
          })}
        </div>
        <p className="mt-3 min-h-6 text-[14px] font-semibold text-pretty text-hrc-ink/70" aria-live="polite">
          {active
            ? <><span className="font-extrabold text-hrc-green">{eur(active.price)}</span> · {bandDetail(active)}</>
            : TERMS_CONFIRM}
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        <a href={buildMailto(active)} data-pm-mailto className={PM_PRIMARY}>
          <Mail className="h-4 w-4" aria-hidden="true" /> {enquireLabel(active)}
        </a>
        <p className="text-[13px] font-semibold text-hrc-ink/65">
          Or write to{' '}
          <a href={`mailto:${CONTACT}`}
             className="inline-flex min-h-10 items-center font-bold text-hrc-green underline decoration-hrc-green/30
                        underline-offset-4 hover:decoration-hrc-green">
            {CONTACT}
          </a>
        </p>
      </div>
    </div>
  )
}

function Deck({ startId, onClose, active, onChoose, onOpenCard }) {
  const slides = useMemo(buildSlides, [])
  const renderSlide = (s, { goId }) => {
    switch (s.kind) {
      case 'cover':     return <CoverSlide slides={slides} goId={goId} />
      case 'members':   return <MembersSlide />
      case 'benefits':  return <BenefitsSlide />
      case 'family':    return <FamilySlide active={active} goId={goId} />
      case 'band':      return <BandSlide t={s.t} n={s.n} active={active} onChoose={onChoose} onOpenCard={onOpenCard} goId={goId} />
      case 'about':     return <AboutSlide />
      case 'who':       return <WhoSlide />
      case 'new':       return <NewSlide />
      case 'programme': return <ProgrammeSlide />
      case 'quotes':    return <QuotesSlide items={s.items} />
      case 'join':      return <JoinSlide active={active} onChoose={onChoose} />
      default:          return null
    }
  }
  return (
    <PresentMode slides={slides} startId={startId} onClose={onClose} renderSlide={renderSlide}
                 title="HR Connect 2027" logo={<Mark className="h-6 w-auto shrink-0 text-hrc-green" />} />
  )
}

/* ─── App ─────────────────────────────────────────────────────────────── */

/* Section order: the product comes early. The fee summary in the hero states the
   bands on the first screen; "What you get" then "Membership" follow the logo wall,
   so value and fee stay together, and the mission ("What is HR Connect") and
   "Who it's for" follow the product. The hero already says what HR Connect is and
   who it serves, so neither is needed to read the fees. */
export default function App() {
  useScrollAnimation()
  useLandOnHash()
  const [picked, setPicked] = useState(null)       // the band chosen in the hero, on a card or in the deck
  const [headcount, setHeadcount] = useState('')   // the fee finder's input
  const typed = headcount.trim() === '' ? NaN : Number(headcount)
  const matched = useMemo(() => tierForHeadcount(typed), [typed])
  const active = picked ? TIERS.find((t) => t.id === picked) : matched   // what the page and the deck show
  useBandFromHash(setPicked)
  const { present, open, close } = usePresent()

  /* "Open the card" on a band slide: close the deck, land on the card the way a deep
     link does (instantly, clear of the bar), put its anchor in the address bar, move
     focus to it and outline it briefly (four cards share a row on a laptop, so the
     landing alone does not say which). It shows the band; choosing it stays a
     separate action. */
  const openCard = useCallback((id) => {
    close()
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return
      const root = document.documentElement
      const prev = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      el.scrollIntoView({ block: 'start' })
      root.style.scrollBehavior = prev
      try { window.history.replaceState(window.history.state, '', `#${id}`) } catch { /* no URL access */ }
      el.querySelector('button')?.focus({ preventScroll: true })
      const card = el.firstElementChild
      if (card) {
        card.setAttribute('data-flash', '')
        setTimeout(() => card.removeAttribute('data-flash'), 1800)
      }
    })
  }, [close])

  return (
    <>
      <Nav onPresent={open} />
      <main>
        <Hero onPick={setPicked} />
        <Members />
        <Benefits />
        <Membership picked={picked} setPicked={setPicked} headcount={headcount} setHeadcount={setHeadcount}
                    active={active} onPresent={open} />
        <About />
        <Audience />
        <New2027 />
        <Programme />
        <Testimonials />
        <Join />
      </main>
      <Footer />
      {present !== null && (
        <Deck startId={present} onClose={close} active={active} onChoose={setPicked} onOpenCard={openCard} />
      )}
    </>
  )
}
