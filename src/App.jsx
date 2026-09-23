import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  Users, CalendarDays, BarChart3, GraduationCap, UserCheck, Utensils,
  Ticket, Mail, ArrowRight, Quote, Check, Sparkles, MessageSquare,
  Presentation, Globe2, MapPin, Building2, Menu, X, Search,
} from 'lucide-react'

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
        alt="HR Connect — NEXT.io | GAMING MALTA"
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
    body: 'Pulse surveys and benchmarking studies run on member request — so you can measure your ' +
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
    body: 'Guest speakers, third-party experts and iGaming Academy content — plus a seat at ' +
          'NEXT Summit Valletta, where the industry sets its agenda.',
  },
]

const AUDIENCE = [
  {
    icon: Users, tag: 'Who',
    title: 'HR professionals',
    body: 'All People and HR seniority levels — CHRO, CPO, Heads of HR, HR Business Partners and ' +
          'HR Coordinators — operating in the iGaming industry.',
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
  { icon: CalendarDays,   title: 'Monthly online sessions',      body: 'A members-only Zoom session every month — member introductions, guest speakers and structured peer exchange.' },
  { icon: BarChart3,      title: 'Pulse surveys & benchmarking', body: 'Regular benchmarking on the topics members ask for, with results shared back to the community first.' },
  { icon: Utensils,       title: '3 workshops & dinners in Malta', body: 'Three in-person moments a year — a spring workshop, a summit dinner and the November gathering.' },
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
    body: 'Dedicated time within each session for peer-to-peer discussion — members bring live challenges ' +
          'and exchange solutions in a trusted, anonymous-to-outsiders space.',
  },
  {
    tag: 'Member-led panels',
    title: 'Member Expert Panel Series',
    body: 'Drawn from our strengths-mapping survey, we identify the "acclaimed knowers" across HR ' +
          'disciplines — talent acquisition, leadership coaching, workforce planning and more. ' +
          'Topic-focused panels seat these practitioners at the front to share real ways of working, ' +
          'giving every member direct access to lived expertise from within the community.',
  },
  {
    tag: 'New event format',
    title: 'HR Connect Poker Tournament',
    body: 'HR professionals learn the game and experience the social dynamics of the casino floor — a real ' +
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
   activity from the project calendar is intentionally left out. */
const CALENDAR = [
  { m: 'Jan', items: ['Q1 agenda shared', 'Online session · member introduction'] },
  { m: 'Feb', items: ['Online session · member introduction', 'Benchmarking survey'] },
  { m: 'Mar', items: ['Online session · member introduction', 'In-person event · Malta'], flag: 'in-person' },
  { m: 'Apr', items: ['Q2 agenda shared', 'Online session · member introduction', 'Benchmarking survey'] },
  { m: 'May', items: ['HR Connect @ NEXT Summit Valletta', 'Exclusive members’ dinner', 'Online session'], flag: 'in-person' },
  { m: 'Jun', items: ['Online session · member introduction', 'Satisfaction survey'] },
  { m: 'Jul', items: ['Q3 agenda shared', 'Online session · member introduction'] },
  { m: 'Aug', items: ['Online session · member introduction'] },
  { m: 'Sep', items: ['Online session · member introduction', 'Benchmarking survey', 'Guest speakers confirmed'] },
  { m: 'Oct', items: ['Q4 agenda shared', 'Online session · member introduction'] },
  { m: 'Nov', items: ['Online session · member introduction', 'Christmas in-person event'], flag: 'in-person' },
  { m: 'Dec', items: ['Online session · member introduction', 'Member poll · topics for 2028'] },
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
      'together — creating a platform to share ideas and best practices. This inclusive platform is designed ' +
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

/* ─── Helpers ─────────────────────────────────────────────────────────── */

const eur = (n) => '€' + n.toLocaleString('en-US')

function tierForHeadcount(n) {
  if (!Number.isFinite(n) || n < 1) return null
  return TIERS.find((t) => n >= t.min && n <= t.max) || null
}

function buildMailto(tier) {
  const subject = 'HR Connect 2027 — membership enquiry'
  const lines = [
    'Hi,',
    '',
    'We would like to enquire about HR Connect membership for 2027.',
    '',
    'Company:',
    'Malta headcount:',
    tier
      ? `Indicated tier: ${tier.range} employees — ${eur(tier.price)} per year (${tier.reps} representatives)`
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

/* ─── Small building blocks ───────────────────────────────────────────── */

function Eyebrow({ children, tone = 'green' }) {
  const tones = {
    green: 'text-hrc-green',
    amber: 'text-hrc-amber',
    cream: 'text-hrc-amber',
  }
  return (
    <div className={`flex items-center gap-2.5 ${tones[tone]}`}>
      <Mark className="h-4 w-auto shrink-0" />
      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]">{children}</span>
    </div>
  )
}

function SectionHead({ eyebrow, title, lead, tone = 'green', align = 'left' }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`animate-on-scroll ${align === 'center' ? 'text-center' : ''} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
      data-anim
    >
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <Eyebrow tone={dark ? 'amber' : 'green'}>{eyebrow}</Eyebrow>
      </div>
      <h2 className={`mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight
        ${dark ? 'text-white' : 'text-hrc-green'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-hrc-ink/70'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}

/* ─── Navigation ──────────────────────────────────────────────────────── */

const NAV = [
  ['About', 'about'],
  ['Membership', 'membership'],
  ['New for 2027', 'new-2027'],
  ['Programme', 'programme'],
]

function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${solid ? 'bg-hrc-cream/92 backdrop-blur-md shadow-[0_1px_0_rgba(36,91,60,.12)]' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="HR Connect — top of page">
          <Lockup className="h-8 sm:h-9" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`}
               className="text-[13px] font-semibold text-hrc-ink/70 transition-colors hover:text-hrc-green">
              {label}
            </a>
          ))}
          <a href="#join"
             className="inline-flex items-center gap-1.5 rounded-full bg-hrc-green px-5 py-2.5 text-[13px]
                        font-bold text-white transition-colors hover:bg-hrc-green-mid">
            Become a member <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-hrc-green lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hrc-cream pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* the brand's cream → amber wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(115deg,#fffdf6 0%,#fffdf6 42%,#fdf3d2 68%,#ffce33 128%)' }}
      />
      {/* angled photo panel, echoing the infographic's hexagon crop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <div
          className="h-full w-full"
          style={{
            clipPath: 'polygon(54% 0, 100% 0, 100% 100%, 0 100%, 0 58%)',
            backgroundImage: `url(${base}images/hr-connect-session.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 26%',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="animate-on-scroll" data-anim>
            <Eyebrow>The one and only</Eyebrow>
          </div>

          <h1
            className="animate-on-scroll mt-6 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight
                       text-hrc-green sm:text-6xl lg:text-[4.25rem]"
            data-anim style={{ transitionDelay: '60ms' }}
          >
            The HR community<br />for iGaming.
          </h1>

          <p className="animate-on-scroll mt-7 max-w-xl text-lg leading-relaxed text-hrc-ink/75"
             data-anim style={{ transitionDelay: '120ms' }}>
            HR Connect is a business network for iGaming HR professionals — an omni-channel platform where
            members share experience, knowledge and connections. Supported by GamingMalta, we help iGaming
            organisations improve their People functions through peer-to-peer collaboration.
          </p>

          <div className="animate-on-scroll mt-9 flex flex-wrap items-center gap-3"
               data-anim style={{ transitionDelay: '180ms' }}>
            <a href="#join"
               className="inline-flex items-center gap-2 rounded-full bg-hrc-green px-7 py-3.5 text-sm
                          font-bold text-white shadow-lg shadow-hrc-green/20 transition-colors hover:bg-hrc-green-mid">
              Become a member <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#membership"
               className="inline-flex items-center gap-2 rounded-full border-2 border-hrc-green/25 px-7 py-3.5
                          text-sm font-bold text-hrc-green transition-colors hover:border-hrc-green/60">
              See membership fees
            </a>
          </div>

          <p className="animate-on-scroll mt-7 text-[13px] font-semibold text-hrc-ink/45"
             data-anim style={{ transitionDelay: '220ms' }}>
            A NEXT.io portfolio project · Supported by GamingMalta
          </p>
        </div>

        {/* proof strip */}
        <div className="animate-on-scroll mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl
                        bg-hrc-green/10 lg:mt-20 lg:grid-cols-4"
             data-anim style={{ transitionDelay: '260ms' }}>
          {STATS.map((s) => (
            <div key={s.label} className="bg-hrc-cream/85 px-5 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
              <div className="text-3xl font-extrabold tracking-tight text-hrc-green sm:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-[13px] font-bold text-hrc-ink/80">{s.label}</div>
              <div className="mt-0.5 text-[11.5px] leading-snug text-hrc-ink/45">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About / mission ─────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="relative bg-hrc-green-deep py-20 sm:py-28">
      <MarkTexture className="text-hrc-amber" opacity={0.07} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          tone="dark"
          eyebrow="What is HR Connect"
          title="Your only HR community for iGaming professionals."
        />

        <blockquote className="animate-on-scroll mt-10 max-w-4xl border-l-4 border-hrc-amber pl-6 sm:pl-8"
                    data-anim style={{ transitionDelay: '80ms' }}>
          <p className="text-xl font-medium leading-relaxed text-white/90 sm:text-2xl sm:leading-relaxed">
            “{MISSION}”
          </p>
        </blockquote>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title}
                 className="animate-on-scroll corner-cut bg-white/[0.055] p-7 ring-1 ring-inset ring-white/10"
                 data-anim style={{ transitionDelay: `${100 + i * 70}ms` }}>
              <p.icon className="h-6 w-6 text-hrc-amber" strokeWidth={2} />
              <h3 className="mt-5 text-lg font-extrabold text-white">{p.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
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
        <SectionHead
          eyebrow="Who it's for"
          title="Built for the People teams behind iGaming."
          lead="Membership is a company membership: your named representatives share the seats, so the
                community keeps working when one person is out of office."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <div key={a.tag}
                 className="animate-on-scroll relative overflow-hidden rounded-2xl bg-white p-7
                            shadow-[0_1px_3px_rgba(20,37,27,.06),0_12px_32px_-18px_rgba(20,37,27,.28)]"
                 data-anim style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="absolute right-0 top-0 h-16 w-16 bg-hrc-amber/12"
                   style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
              <a.icon className="relative h-6 w-6 text-hrc-green" strokeWidth={2} />
              <div className="relative mt-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-hrc-amber-deep">
                {a.tag}
              </div>
              <h3 className="relative mt-1.5 text-xl font-extrabold text-hrc-green">{a.title}</h3>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-hrc-ink/65">{a.body}</p>
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
        <SectionHead
          eyebrow="What you get"
          title="One annual fee. Everything the community does."
          lead="Every tier receives the full programme — the only things that change with company size are
                the number of named representatives and the fee."
        />
        <div className="mt-14 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="animate-on-scroll flex gap-4"
                 data-anim style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="hex-clip flex h-11 w-12 shrink-0 items-center justify-center bg-hrc-green">
                <b.icon className="h-5 w-5 text-hrc-amber" strokeWidth={2} />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15.5px] font-extrabold text-hrc-green">{b.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-hrc-ink/65">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Membership fees + fee finder ────────────────────────────────────── */

function Membership() {
  const [headcount, setHeadcount] = useState('')
  const [picked, setPicked] = useState(null)

  const typed = headcount.trim() === '' ? NaN : Number(headcount)
  const matched = useMemo(() => tierForHeadcount(typed), [typed])
  const active = picked ? TIERS.find((t) => t.id === picked) : matched
  const invalid = headcount.trim() !== '' && (!Number.isFinite(typed) || typed < 1)

  const choose = useCallback((id) => {
    setPicked((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section id="membership" className="bg-hrc-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Membership"
          title="The size of your Malta organisation sets your fee."
          lead="Annual company membership. Four bands, published pricing, no negotiation needed —
                find your band below. Membership is priced on organisation size - benefits reach your whole Malta team."
        />

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
                  className="w-44 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-lg font-bold
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
                  <div className="mt-1.5 text-4xl font-extrabold tracking-tight text-hrc-amber sm:text-5xl">
                    {eur(active.price)}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/70">
                    {active.range} employees · {active.reps} representatives · per year
                  </div>
                </>
              ) : (
                <div className="text-sm font-medium text-white/45">
                  Enter your Malta headcount, or pick a band below.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* tier cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => {
            const on = active?.id === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => choose(t.id)}
                aria-pressed={on}
                className={`animate-on-scroll group flex flex-col overflow-hidden rounded-2xl bg-white text-left
                            transition-all duration-200
                            ${on
                              ? 'ring-2 ring-hrc-green shadow-xl shadow-hrc-green/15 -translate-y-1'
                              : 'ring-1 ring-hrc-ink/8 hover:-translate-y-1 hover:ring-hrc-green/40'}`}
                data-anim style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className={`px-6 pt-6 pb-5 transition-colors
                                ${on ? 'bg-hrc-green' : 'bg-hrc-green-deep group-hover:bg-hrc-green'}`}>
                  <div className="flex items-center gap-2 text-hrc-amber">
                    <Users className="h-4 w-4" strokeWidth={2.4} />
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.18em]">Employees</span>
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-white">{t.range}</div>
                </div>

                <div className="border-b border-hrc-ink/8 px-6 py-5">
                  <div className="text-3xl font-extrabold tracking-tight text-hrc-green">{eur(t.price)}</div>
                  <div className="mt-0.5 text-[12.5px] font-semibold text-hrc-ink/45">per year</div>
                </div>

                <ul className="flex-1 space-y-2.5 px-6 py-5">
                  <li className="flex gap-2.5 text-[13.5px] font-bold text-hrc-ink/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-hrc-green" strokeWidth={3} />
                    {t.reps} representatives
                  </li>
                  <li className="flex gap-2.5 text-[13.5px] leading-snug text-hrc-ink/65">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-hrc-green/45" strokeWidth={3} />
                    {t.reps} free NEXT Summit Valletta passes
                  </li>
                  {TIER_INCLUDES.map((inc) => (
                    <li key={inc} className="flex gap-2.5 text-[13.5px] leading-snug text-hrc-ink/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-hrc-green/45" strokeWidth={3} />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className={`px-6 pb-6 text-[12.5px] font-extrabold transition-colors
                                ${on ? 'text-hrc-green' : 'text-hrc-ink/35 group-hover:text-hrc-green'}`}>
                  {on ? '✓ Selected' : 'Select this band'}
                </div>
              </button>
            )
          })}
        </div>

        <div className="animate-on-scroll mt-8 flex flex-wrap items-center justify-between gap-5
                        rounded-2xl bg-white px-7 py-6 ring-1 ring-hrc-ink/8" data-anim>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-hrc-ink/65">
            Membership runs for the calendar year and covers your whole People team through your named
            representatives. Not sure which band you fall into? We will confirm it with you.
          </p>
          <a href={buildMailto(active)}
             className="inline-flex shrink-0 items-center gap-2 rounded-full bg-hrc-green px-7 py-3.5
                        text-sm font-bold text-white transition-colors hover:bg-hrc-green-mid">
            <Mail className="h-4 w-4" />
            {active ? `Enquire — ${eur(active.price)}` : 'Enquire about membership'}
          </a>
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
        <SectionHead
          tone="dark"
          eyebrow="New for 2027"
          title="Four things members get next year that they didn’t in 2026."
          lead="The programme keeps evolving from member feedback. These formats are new for 2027."
        />
        <div className="mt-14 space-y-4">
          {NEW_2027.map((n, i) => (
            <div key={n.title}
                 className="animate-on-scroll relative overflow-hidden rounded-xl bg-hrc-green/35 p-7 pl-9
                            ring-1 ring-inset ring-white/10 sm:p-8 sm:pl-11"
                 data-anim style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="absolute inset-y-0 left-0 w-1.5 bg-hrc-amber" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-xl font-extrabold text-hrc-amber sm:text-2xl">{n.title}</h3>
                <span className="hex-clip-sm shrink-0 bg-hrc-amber px-4 py-1.5 text-[10.5px] font-extrabold
                                 uppercase tracking-[0.14em] text-hrc-green-deep">
                  {n.tag}
                </span>
              </div>
              <p className="mt-3 max-w-4xl text-[15px] leading-relaxed text-white/75">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 2027 programme calendar ─────────────────────────────────────────── */

function Programme() {
  return (
    <section id="programme" className="bg-hrc-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Programme"
          title="The 2027 member calendar."
          lead="A monthly rhythm online, three in-person moments in Malta, and benchmarking through the year."
        />

        <div className="animate-on-scroll mt-8 flex flex-wrap items-center gap-5 text-[12.5px] font-semibold
                        text-hrc-ink/55" data-anim>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-hrc-green" /> Online session
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-hrc-amber-deep" /> In-person in Malta
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CALENDAR.map((c, i) => {
            const live = c.flag === 'in-person'
            return (
              <div key={c.m}
                   className={`animate-on-scroll rounded-xl p-5 ring-1 transition-shadow
                     ${live
                       ? 'bg-hrc-amber/12 ring-hrc-amber-deep/30'
                       : 'bg-white ring-hrc-ink/8'}`}
                   data-anim style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-hrc-green">{c.m}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-hrc-ink/30">2027</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2 text-[13.5px] leading-snug text-hrc-ink/70">
                      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full
                        ${live ? 'bg-hrc-amber-deep' : 'bg-hrc-green/50'}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="animate-on-scroll mt-8 text-[13px] text-hrc-ink/45" data-anim>
          Topics and venues are confirmed with members through the year — agendas are shared quarterly.
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
          <Eyebrow>Our proud members</Eyebrow>
          <p className="text-[13.5px] text-hrc-ink/55">
            {MEMBERS.length} companies — operators, suppliers, studios, affiliates and the regulator.
          </p>
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
        <SectionHead
          tone="dark"
          eyebrow="What they say"
          title="In the members’ own words."
        />
        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name}
                    className="animate-on-scroll mb-5 break-inside-avoid rounded-2xl bg-white p-7"
                    data-anim style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <Quote className="h-6 w-6 text-hrc-amber" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-4 text-[14.5px] leading-relaxed text-hrc-ink/75">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-hrc-ink/10 pt-4">
                <div className="text-[14.5px] font-extrabold text-hrc-green">{t.name}</div>
                <div className="text-[13px] font-semibold text-hrc-ink/45">{t.org}</div>
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
        <h2 className="animate-on-scroll mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight
                       text-hrc-green sm:text-5xl" data-anim style={{ transitionDelay: '60ms' }}>
          Join the HR community<br className="hidden sm:block" /> for iGaming.
        </h2>
        <p className="animate-on-scroll mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-hrc-ink/70"
           data-anim style={{ transitionDelay: '120ms' }}>
          Tell us your company and your Malta headcount and we will confirm your band, send the membership
          details and get your representatives into the next session.
        </p>
        <div className="animate-on-scroll mt-9 flex flex-wrap justify-center gap-3"
             data-anim style={{ transitionDelay: '180ms' }}>
          <a href={buildMailto(null)}
             className="inline-flex items-center gap-2 rounded-full bg-hrc-green px-8 py-4 text-sm font-bold
                        text-white shadow-lg shadow-hrc-green/20 transition-colors hover:bg-hrc-green-mid">
            <Mail className="h-4 w-4" /> Enquire about membership
          </a>
          <a href="#membership"
             className="inline-flex items-center gap-2 rounded-full border-2 border-hrc-green/25 px-8 py-4
                        text-sm font-bold text-hrc-green transition-colors hover:border-hrc-green/60">
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
        <img src={`${base}logos/hrconnect-lockup-amber.svg`} alt="HR Connect — NEXT.io | GAMING MALTA"
             className="h-9 w-auto" />
        <div className="text-[13px] leading-relaxed text-white/45">
          A NEXT.io portfolio project, supported by GamingMalta.
          <br className="hidden md:block" />
          <a href={`mailto:${CONTACT}`} className="font-semibold text-white/70 hover:text-hrc-amber">
            {CONTACT}
          </a>
          <span className="mx-2 text-white/20">·</span>
          HR Connect 2027
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─────────────────────────────────────────────────────────────── */

export default function App() {
  useScrollAnimation()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Members />
        <About />
        <Audience />
        <Benefits />
        <Membership />
        <New2027 />
        <Programme />
        <Testimonials />
        <Join />
      </main>
      <Footer />
    </>
  )
}
