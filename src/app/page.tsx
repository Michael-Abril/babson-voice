'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Link2,
  UsersRound,
  LayoutDashboard,
  ShieldCheck,
  Instagram,
  Mic,
  ChevronDown,
  Mail,
} from 'lucide-react';

const HOLI_ENGAGE_URL = 'https://engage.babson.edu/rsvp?id=376170';

const DEBATE_RSVP_URL = 'https://cglink.me/22L/r376207';

const CONNECT_THE_DOTS_IMAGE_SRC = 'https://i.imgur.com/YliOPwp.jpeg';
const ONE_GSC_IMAGE_SRC = 'https://i.imgur.com/da14xjC.jpeg';
const BUILD_BABSON_BETTER_IMAGE_SRC = 'https://i.imgur.com/vKFuTRA.jpeg';

const engageLinkClass =
  'text-emerald-700 underline underline-offset-2 font-medium hover:text-emerald-800 break-words';

/**
 * Event end instant on the Babson calendar (US Eastern). Used so "passed" reflects real end time
 * in absolute terms; comparison uses the viewer's local clock (Date) against that instant.
 */
const CAMPAIGN_WEEK_EVENTS: {
  id: string;
  day: string;
  date: string;
  time: string;
  /** ISO 8601 end time (America/New_York, EDT in late March–April 2026) */
  eventEndAt: string;
  description: string;
  rsvpHref: string;
  imageSrc: string;
  /** Shown under RSVP when set (e.g. room) */
  footerNote?: string;
}[] = [
  {
    id: 'mon-listening',
    day: 'Monday',
    date: 'March 30',
    time: '10am-1pm',
    eventEndAt: '2026-03-30T13:00:00-04:00',
    description: 'Stop by a listening session and share about what you want!',
    rsvpHref: '#rsvp-mon',
    imageSrc: 'https://i.imgur.com/HCj0tS3.jpeg',
  },
  {
    id: 'tue-hidden-place',
    day: 'Tuesday',
    date: 'March 31',
    time: '4-5pm',
    eventEndAt: '2026-03-31T17:00:00-04:00',
    description: 'Join us for a curated tour of a "Hidden Place" at Babson!',
    rsvpHref: 'https://luma.com/g974ye0g',
    imageSrc: 'https://i.imgur.com/Lui7k8F.jpeg',
  },
  {
    id: 'wed-bbb-drinks',
    day: 'Wednesday',
    date: 'April 1',
    time: '4:30pm-6pm',
    eventEndAt: '2026-04-01T18:00:00-04:00',
    description: 'Learn about our Build Babson Better platform over drinks & food!',
    rsvpHref: 'https://luma.com/3azm7dqc',
    imageSrc: 'https://i.imgur.com/CVY1odr.jpeg',
  },
  {
    id: 'thu-gsc-debate',
    day: 'Thursday',
    date: 'April 2',
    time: '12-1pm',
    eventEndAt: '2026-04-02T13:00:00-04:00',
    description:
      "GSC Presidential Debate by Graduate Student Council—hear candidates' platforms, ask questions, and vote informed. Food provided.",
    rsvpHref: DEBATE_RSVP_URL,
    imageSrc: 'https://i.imgur.com/uqXWZ4w.jpeg',
    footerNote: 'Winn Auditorium',
  },
  {
    id: 'thu-ventures',
    day: 'Thursday',
    date: 'April 2',
    time: '4-6pm',
    eventEndAt: '2026-04-02T18:00:00-04:00',
    description: "Come check out student ventures and stop by my startup's booth!",
    rsvpHref: 'https://cvent.me/W3XG4k',
    imageSrc: 'https://i.imgur.com/7Eu1th5.jpeg',
  },
  {
    id: 'fri-potluck',
    day: 'Friday',
    date: 'April 3',
    time: '4:30pm-8pm',
    eventEndAt: '2026-04-03T20:00:00-04:00',
    description: 'Build Babson Better Potluck—bring a dish or yourself!',
    rsvpHref: 'https://luma.com/x28qsi1g',
    imageSrc: 'https://i.imgur.com/mpujAan.jpeg',
    footerNote: 'Weissman Foundry Social Kitchen',
  },
];

function isCampaignEventPast(eventEndAt: string, now: Date): boolean {
  return now.getTime() > new Date(eventEndAt).getTime();
}

const features: {
  icon: typeof Link2;
  color: string;
  kicker: string;
  title: string;
  bullets: (string | ReactNode)[];
}[] = [
  {
    icon: Link2,
    color: 'bg-amber-50 text-amber-500',
    kicker: '01 · Connect the Dots',
    title: 'Career access that fits your profile',
    bullets: [
      'Work with GradCCD to shift generic career events toward warm-intro, industry-specific sessions',
      'Host Babson Bridge alumni speaker series with various clubs that are job and career focused',
      'GSC International Student Networking Track for students building networks from scratch',
    ],
  },
  {
    icon: UsersRound,
    color: 'bg-emerald-50 text-emerald-600',
    kicker: '02 · One GSC',
    title: 'No silos and one connected student body across every program',
    bullets: [
      'One GSC for all graduate students: 1Y, Part-Time, and 2Y MBAs; Blended Learning & Miami MBAs; MSEL; MSBA; and MSF.',
      'Host regular cross-program socials and mixers (e.g. Biweekly Rogers Pub Mixers, GSC BBQs, etc.)',
      (
        <>
          Cross-Cultural Events Calendar: See upcoming cultural events hosted by the greater Babson community like our annual{' '}
          <a href={HOLI_ENGAGE_URL} target="_blank" rel="noopener noreferrer" className={engageLinkClass}>
            Holi Celebration
          </a>
        </>
      ),
      'Consistent WhatsApp + email channels so no one misses what matters',
    ],
  },
  {
    icon: LayoutDashboard,
    color: 'bg-violet-50 text-violet-600',
    kicker: '03 · Build Babson Better',
    title: 'A Student Voice Dashboard that tracks your feedback',
    bullets: [
      'Submit your ideas and feedback anonymously and upvote what you want to see',
      'Pledge to volunteer for an idea and see how many people want to support an initiative',
      'Close the gap between what Babson promises and what you experience',
    ],
  },
];

const GSC_CALENDAR_EMBED_SRC =
  'https://miro.com/app/live-embed/uXjVGqVPD-Q=/?focusWidget=3458764665716147808&embedMode=view_only_without_ui&embedId=514690704532';

/** YouTube Short: https://youtube.com/shorts/HTOVLXLoYgc */
const STUDENT_VOICE_DASHBOARD_DEMO_EMBED_SRC =
  'https://www.youtube.com/embed/HTOVLXLoYgc?rel=0';

const CONTACT_EMAIL = 'rlee5@babson.edu';
const CONTACT_EMAIL_SUBJECT = 'Build Babson Better Campaign: Get In Touch!';

export default function HomePage() {
  const [gscCalendarOpen, setGscCalendarOpen] = useState(false);
  const [contactEmailOpen, setContactEmailOpen] = useState(false);
  const [dashboardDemoOpen, setDashboardDemoOpen] = useState(false);
  /** Past styling uses the client clock; keep false until mount so SSR and first paint match (no hydration flash). */
  const [eventScheduleHydrated, setEventScheduleHydrated] = useState(false);
  useEffect(() => {
    setEventScheduleHydrated(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(5,150,105,0.12),transparent)]" />

      <div className="relative flex min-h-screen w-full flex-col sm:max-w-[420px] sm:mx-auto md:max-w-none">

        {/* Top nav */}
        <header className="flex flex-col gap-0.5 px-6 pt-6 md:px-16 md:pt-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
                <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-emerald-800 leading-tight">Build Babson Better</span>
          </div>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col px-6 pt-10 pb-[120px] md:items-center md:pt-20 md:pb-32 md:px-8">

          {/* Badge */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[13px] md:text-[14px] font-semibold mb-5 mono-text uppercase tracking-wide md:tracking-wider w-fit">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
            <span>Ryan Lee for GSC President · MBA &apos;27</span>
          </div>

          {/* Headline */}
          <div className="md:text-center md:max-w-2xl">
            <p className="text-emerald-700 text-[13px] font-semibold tracking-wide uppercase mb-3 md:mb-4">
              Done with the talking. Here to build.
            </p>
            <h1 className="text-[#0f1f1a] tracking-tight text-[32px] font-extrabold leading-[1.08] md:text-[52px]">
              Build Babson Better.
            </h1>
            <p className="mt-4 text-emerald-700 text-[17px] md:text-xl font-semibold leading-snug md:max-w-xl md:mx-auto">
              Bringing Everyone to the Table<span className="text-emerald-600/90"> & </span>
              <span className="block sm:inline">Cooking up a Babson Experience for YOU.</span>
            </p>
            <div className="relative mt-6 w-full max-w-[min(100%,420px)] md:max-w-xl md:mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-md ring-1 ring-black/5">
              <Image
                src="https://i.imgur.com/1uBxjoA.jpeg"
                alt="Ryan Lee, Build Babson Better campaign"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
            <p className="mt-5 text-gray-500 text-[15px] leading-relaxed md:text-lg md:max-w-xl md:mx-auto">
              We&apos;re at Babson for a short time—whether you&apos;re full-time, part-time, blended, or in a specialized master&apos;s. Let&apos;s make our time here count and{' '}
              <span className="font-bold text-emerald-600">Build a Better Babson</span>
              {' '}
              together—something we can be proud of looking back on at Commencement and beyond 🎉
            </p>
            <h2 className="text-[#0f1f1a] text-[22px] font-bold tracking-tight md:text-2xl text-center mt-5 md:max-w-xl md:mx-auto">
              Join my upcoming events to learn more!
            </h2>
          </div>

          {/* Campaign week calendar */}
          <section
            className="w-full max-w-6xl mt-6 md:mt-8 md:mx-auto"
            aria-label="Campaign week events, March 30 through April 3, including GSC Presidential Debate and potluck"
          >
            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-2">
              {CAMPAIGN_WEEK_EVENTS.map((ev) => {
                const isPast =
                  eventScheduleHydrated && isCampaignEventPast(ev.eventEndAt, new Date());
                return (
                  <article
                    key={ev.id}
                    aria-label={
                      isPast
                        ? `${ev.day} ${ev.date}, past campaign event`
                        : `${ev.day} ${ev.date}, campaign event`
                    }
                    className={`flex flex-col overflow-hidden rounded-lg border text-center shadow-sm transition-[background-color,border-color] duration-300 ${
                      isPast ? 'border-gray-300 bg-gray-100' : 'border-gray-200/80 bg-[#fafafa]'
                    }`}
                  >
                    <header
                      className={`px-3 py-3 text-white ${isPast ? 'bg-gray-500' : 'bg-emerald-800'}`}
                    >
                      <p className="text-[15px] font-bold leading-tight">{ev.day}</p>
                      <p className="text-[13px] font-semibold text-white/95 mt-0.5">{ev.date}</p>
                    </header>
                    <div
                      className={`relative aspect-[4/3] w-full bg-gray-100 ${isPast ? 'opacity-95' : ''}`}
                    >
                      <Image
                        src={ev.imageSrc}
                        alt={`${ev.day} ${ev.date}: campaign event`}
                        fill
                        className={`object-cover ${isPast ? 'grayscale-[0.35]' : ''}`}
                        sizes="(max-width: 520px) 100vw, (max-width: 1280px) 33vw, 16vw"
                      />
                      {isPast && (
                        <div
                          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25"
                          aria-hidden
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-4 ring-white/90">
                            <Check
                              className="h-8 w-8"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-[13px] font-bold px-2 pt-3 pb-1 ${isPast ? 'text-gray-600' : 'text-gray-900'}`}
                    >
                      {ev.time}
                    </p>
                    <p
                      className={`text-[12px] leading-snug px-3 pb-3 flex-1 ${isPast ? 'text-gray-500' : 'text-gray-700'}`}
                    >
                      {ev.description}
                    </p>
                    <div
                      className={`mt-auto border-t py-2.5 px-2 ${isPast ? 'border-gray-300 bg-gray-50/90' : 'border-gray-200 bg-white'}`}
                    >
                      {ev.day === 'Monday' ? (
                        <span
                          className={`text-[13px] font-semibold ${isPast ? 'text-gray-600' : 'text-emerald-800'}`}
                        >
                          In Olin Lobby
                        </span>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <a
                            href={ev.rsvpHref}
                            className={`text-[13px] font-semibold underline underline-offset-2 ${
                              isPast
                                ? 'text-emerald-800/90 hover:text-emerald-900'
                                : 'text-emerald-700 hover:text-emerald-800'
                            }`}
                            {...(ev.rsvpHref.startsWith('http')
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            RSVP
                          </a>
                          {ev.footerNote && (
                            <span
                              className={`text-[12px] font-medium leading-snug ${isPast ? 'text-gray-500' : 'text-gray-600'}`}
                            >
                              {ev.footerNote}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="md:text-center md:max-w-2xl md:mx-auto w-full mt-4">
            <div className="flex flex-col gap-3 text-[13px] md:items-center md:max-w-lg md:mx-auto">
              <div
                className="w-full max-w-md md:mx-auto rounded-xl border border-red-200 bg-gradient-to-br from-red-50/95 to-white px-4 py-3.5 text-center shadow-sm ring-1 ring-red-900/5"
                role="note"
              >
                <p className="text-[12px] font-bold uppercase tracking-wide text-red-800 mb-3">
                  Key Dates:
                </p>
                <div className="flex flex-col gap-2 text-[13px] text-gray-800">
                  <p className="flex flex-wrap items-center justify-center gap-2">
                    <Mic className="h-3.5 w-3.5 text-red-600 shrink-0" aria-hidden />
                    <span className="font-medium leading-snug text-center">
                      Debate Thu Apr 2 · 12-1pm · Winn Auditorium
                      {' · '}
                      <a
                        href={DEBATE_RSVP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-800 underline underline-offset-2 hover:text-red-900"
                      >
                        RSVP
                      </a>
                    </span>
                  </p>
                  <p className="text-center">
                    Voting{' '}
                    <span className="font-semibold text-gray-900">Mon Apr 6 to Wed Apr 8</span>
                  </p>
                  <div className="w-full">
                    <button
                      type="button"
                      id="gsc-calendar-toggle"
                      aria-expanded={gscCalendarOpen}
                      aria-controls="gsc-calendar-embed"
                      onClick={() => setGscCalendarOpen((o) => !o)}
                      className="mt-2 inline-flex w-full max-w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-red-800 hover:text-red-900"
                    >
                      <span>See Proposed April 2026 GSC Calendar</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${gscCalendarOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {gscCalendarOpen && (
                      <div
                        id="gsc-calendar-embed"
                        className="mt-3 w-full overflow-hidden rounded-lg border border-red-200/80 bg-white shadow-sm"
                      >
                        <div className="relative w-full" style={{ paddingBottom: '64.58%' }}>
                          <iframe
                            title="Proposed April 2026 GSC Calendar"
                            src={GSC_CALENDAR_EMBED_SRC}
                            className="absolute left-0 top-0 h-full w-full"
                            width={768}
                            height={496}
                            frameBorder={0}
                            scrolling="no"
                            allow="fullscreen; clipboard-read; clipboard-write"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="w-full max-w-md md:mx-auto mt-1 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/95 to-white px-4 py-3.5 text-center shadow-sm ring-1 ring-emerald-900/5"
                role="note"
              >
                <p className="text-[12px] font-bold uppercase tracking-wide text-emerald-800 mb-2">
                  Follow me on Instagram
                </p>
                <a
                  href="https://instagram.com/buildbabsonbetter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-[13px] md:text-[14px] font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                  @buildbabsonbetter
                </a>
                <div className="mt-4 w-full border-t border-emerald-200/80 pt-4">
                  <p className="text-[12px] font-bold uppercase tracking-wide text-emerald-800 mb-2">
                    Get In Touch With Me
                  </p>
                  <button
                    type="button"
                    aria-expanded={contactEmailOpen}
                    aria-controls="contact-email-reveal"
                    onClick={() => setContactEmailOpen((o) => !o)}
                    className="inline-flex w-full max-w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-emerald-800 hover:text-emerald-900"
                  >
                    <span>rlee5[at]babson.edu</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${contactEmailOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  {contactEmailOpen && (
                    <div
                      id="contact-email-reveal"
                      className="mt-3 flex justify-center"
                    >
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_EMAIL_SUBJECT)}`}
                        className="inline-flex items-center justify-center gap-2 break-all rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[13px] font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50/80"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Campaign promises */}
          <section className="w-full mt-10 md:mt-14 md:max-w-5xl md:mx-auto">
            <h2 className="text-[#0f1f1a] text-[22px] font-bold tracking-tight md:text-2xl md:text-center">
              Three Campaign Promises
            </h2>
            <div className="flex flex-col gap-3 mt-6 w-full md:grid md:grid-cols-3 md:gap-5 md:max-w-3xl md:mx-auto">
              {features.map((f) => {
                const [bgColor, textColor] = f.color.split(' ');
                return (
                  <div
                    key={f.kicker}
                    className="flex flex-col items-center bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6 hover:shadow-md hover:border-gray-200 transition-all"
                  >
                    <div className={`flex items-center justify-center rounded-xl shrink-0 size-14 ${bgColor}`}>
                      <f.icon className={`h-7 w-7 ${textColor}`} />
                    </div>
                    <div className="mt-4 w-full min-w-0">
                      <p className="mono-text text-[13px] md:text-sm font-bold uppercase tracking-wider text-emerald-700 text-center mb-2">
                        {f.kicker}
                      </p>
                      <p className="text-[#1a1c1c] text-[14px] font-semibold leading-tight mb-2 text-center">
                        {f.title}
                      </p>
                      {f.kicker === '01 · Connect the Dots' && (
                        <div className="relative mt-1 mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                          <Image
                            src={CONNECT_THE_DOTS_IMAGE_SRC}
                            alt="Connect the Dots — career access at Babson"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 280px"
                          />
                        </div>
                      )}
                      {f.kicker === '02 · One GSC' && (
                        <div className="relative mt-1 mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                          <Image
                            src={ONE_GSC_IMAGE_SRC}
                            alt="One GSC — connected Babson student community"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 280px"
                          />
                        </div>
                      )}
                      {f.kicker === '03 · Build Babson Better' && (
                        <div className="relative mt-1 mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                          <Image
                            src={BUILD_BABSON_BETTER_IMAGE_SRC}
                            alt="Build Babson Better — Student Voice Dashboard"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 280px"
                          />
                        </div>
                      )}
                      <ul className="text-gray-500 text-[13px] leading-snug space-y-1.5 list-disc pl-4 marker:text-emerald-600 text-left">
                        {f.bullets.map((line, i) => (
                          <li key={typeof line === 'string' ? line : `${f.kicker}-${i}`} className="pl-0.5">
                            {line}
                          </li>
                        ))}
                      </ul>
                      {f.kicker === '03 · Build Babson Better' && (
                        <div className="mt-4 w-full border-t border-gray-100 pt-4">
                          <button
                            type="button"
                            aria-expanded={dashboardDemoOpen}
                            aria-controls="student-voice-dashboard-demo"
                            onClick={() => setDashboardDemoOpen((o) => !o)}
                            className="inline-flex w-full max-w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-violet-800 hover:text-violet-900"
                          >
                            <span>See Student Voice Dashboard in action</span>
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 transition-transform ${dashboardDemoOpen ? 'rotate-180' : ''}`}
                              aria-hidden
                            />
                          </button>
                          {dashboardDemoOpen && (
                            <div
                              id="student-voice-dashboard-demo"
                              className="mt-3 w-full overflow-hidden rounded-lg border border-gray-200 bg-black shadow-sm"
                            >
                              <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px]">
                                <iframe
                                  title="Student Voice Dashboard in action"
                                  src={STUDENT_VOICE_DASHBOARD_DEMO_EMBED_SRC}
                                  className="absolute inset-0 h-full w-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Desktop CTA */}
          <div className="hidden md:flex mt-12 flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="/login/"
              className="min-h-[48px] py-3 px-6 bg-emerald-600 text-white rounded-xl text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98] shadow-lg shadow-emerald-100 w-fit max-w-xl text-center leading-snug"
            >
              Add Idea to Student Voice Dashboard <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          <blockquote className="mt-12 md:mt-16 w-full max-w-2xl mx-auto rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-white px-6 py-7 md:px-10 md:py-8 shadow-sm ring-1 ring-emerald-900/5">
            <p className="text-center text-[#1a2e24] text-[17px] md:text-[20px] leading-snug font-medium italic tracking-tight">
              Ask not what Babson can do for you, ask what you can do for Babson.
            </p>
          </blockquote>
        </main>

        {/* Mobile bottom CTA */}
        <div className="fixed bottom-0 left-0 w-full px-5 pt-4 pb-6 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden z-50 shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.06)]">
          <Link
            href="/login/"
            className="w-full min-h-[52px] py-3 px-3 bg-emerald-600 text-white rounded-xl text-[13px] font-semibold leading-tight flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98] text-center"
          >
            Add Idea to Student Voice Dashboard <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
