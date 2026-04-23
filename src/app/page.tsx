'use client';

import Image from 'next/image';
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

/** Official GSC handover to the new administration (first weekday after Graduate Commencement weekend). */
const NEW_ADMINISTRATION_HANDOVER_AT = '2026-05-18T09:00:00-04:00';
const OFFICIAL_HANDOVER_DATE = 'Monday, May 18, 2026';
const STUDENT_VOICE_DASHBOARD_URL = 'https://buildbabsonbetter.com/dashboard';
// Update with real route
const ELECTION_RESULT_DATE = 'April 10, 2026';

/** Babson's elected graduate student government — spell out on first mention in each major area; then "GSC" is fine. */
const GSC_LONG = 'Graduate Student Council (GSC)';

const HOLI_ENGAGE_URL = 'https://engage.babson.edu/rsvp?id=376170';

const DEBATE_RSVP_URL = 'https://cglink.me/22L/r376207';

const BEERS_AND_BANTER_INSTAGRAM_URL = 'https://www.instagram.com/beers.and.banter/';

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
      "Graduate Student Council presidential debate — hear candidates' platforms, ask questions, and vote informed. Food provided.",
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

const TRANSITION_UPCOMING_EVENTS: {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpHref?: string;
  ctaLabel?: string;
  imageSrc: string;
}[] = [
  {
    id: 'graduate-international-dinner',
    title: 'Graduate International Dinner',
    day: 'Wednesday',
    date: 'April 15',
    time: '5:30pm - 7:00pm',
    location: 'Knight Auditorium',
    description:
      'The Graduate International Dinner (International Dinner) is an opportunity to celebrate the cultural diversity of Babson’s graduate student population. Through this long-standing annual event, graduate students and partners come together in a display of culture through food, music, dance. Grad Student Partners are welcome!!',
    rsvpHref: 'https://engage.babson.edu/gsc/rsvp_boot?id=376123',
    imageSrc: 'https://i.imgur.com/hrIJLpM.jpeg',
  },
  {
    id: 'commencement-2026',
    title: 'End of Semester Spring Party!',
    day: 'Thursday',
    date: 'April 23, 2026',
    time: '7:00-10:00 PM EDT',
    location: 'Howl at the Moon',
    description:
      'Join us at Howl at the Moon for the LAST party of the semester — Bring your festive best Spring outfit with a little bit of personality! Expect live performances, sing-alongs, dancing, raffles, drinks, food, and a professional photographer. Guests are welcome to stay after 10 PM, when the venue opens to the public for nonstop fun! Each ticket includes: 2 drinks per person and food stations.',
    rsvpHref: 'https://engage.babson.edu/GSC/rsvp_boot?id=376200',
    imageSrc: 'https://i.imgur.com/ySjp2zk.jpeg',
  },
  {
    id: 'commencement-2026',
    title: 'Commencement 2026',
    day: 'Saturday',
    date: 'May 16, 2026',
    time: '2:45-5:30 p.m.',
    location: 'Graduate Ceremony',
    description: 'Tickets are not required for this ceremony.',
    rsvpHref: 'https://www.babson.edu/commencement/',
    ctaLabel: 'More Info',
    imageSrc: 'https://i.imgur.com/UXr2S56.jpeg',
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
      'Host alumni speaker series with clubs — sessions built around jobs and careers',
      'Graduate Student Council international student networking track for students building networks from scratch',
    ],
  },
  {
    icon: UsersRound,
    color: 'bg-emerald-50 text-emerald-600',
    kicker: '02 · One GSC',
    title: 'No silos and one connected student body across every program',
    bullets: [
      'One GSC for all graduate students: 1Y, Part-Time, and 2Y MBAs; Blended Learning & Miami MBAs; MSEL; MSBA; and MSF.',
      'Host regular cross-program socials and mixers (e.g. Biweekly Rogers Pub Mixers, council BBQs, etc.)',
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

const transitionPillars: {
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
    title: 'We connect career access to your profile',
    bullets: [
      'We\'re working with GradCCD to shift generic career events toward warm-intro, industry-specific sessions',
      'We\'re hosting alumni speaker series with clubs — sessions built around jobs and careers',
      'We\'re running a Graduate Student Council international student networking track for students building networks from scratch',
    ],
  },
  {
    icon: UsersRound,
    color: 'bg-emerald-50 text-emerald-600',
    kicker: '02 · One GSC',
    title: 'We\'re one connected student body across every program',
    bullets: [
      'We\'re one GSC for all graduate students: 1Y, Part-Time, and 2Y MBAs; Blended Learning & Miami MBAs; MSEL; MSBA; and MSF.',
      'We\'re hosting regular cross-program socials and mixers (e.g. Biweekly Rogers Pub Mixers, council BBQs, etc.)',
      (
        <>
          Cross-Cultural Events Calendar: we surface cultural events across Babson—like our annual{' '}
          <a href={HOLI_ENGAGE_URL} target="_blank" rel="noopener noreferrer" className={engageLinkClass}>
            Holi Celebration
          </a>
        </>
      ),
      'We\'re keeping WhatsApp and email channels consistent so no one misses what matters',
    ],
  },
  {
    icon: LayoutDashboard,
    color: 'bg-violet-50 text-violet-600',
    kicker: '03 · Build Babson Better',
    title: 'We\'re building a Student Voice Dashboard that tracks your feedback',
    bullets: [
      'You can submit ideas and feedback anonymously and upvote what you want to see',
      'We\'re making it easy to pledge volunteer support and see momentum on initiatives',
      'We\'re closing the gap between what Babson promises and what you experience',
    ],
  },
];

const TRANSITION_TEAM: {
  role: string;
  name: string;
  quote: string | ReactNode;
  photoSrc?: string;
  linkedinUrl?: string;
  pending?: boolean;
}[] = [
  {
    role: 'President',
    name: "Ryan Lee, MBA '27",
    quote: 'Here to build what we talked about — together.',
    photoSrc: 'https://i.imgur.com/wUwSq8F.png',
    linkedinUrl: 'https://www.linkedin.com/in/ryanchenlee/',
  },
  {
    role: 'Chief of Staff',
    name: "Delzaan Sutaria, MBA '27",
    quote: 'Structure, clarity, and follow-through — turning student voice into outcomes.',
    photoSrc: 'https://i.imgur.com/xsiB4cz.png',
    linkedinUrl: 'https://www.linkedin.com/in/delzaansutaria/',
  },
  {
    role: 'Chief of Academic Affairs',
    name: "Jake Rossetto, MBA '27",
    quote: 'Making sure your electives actually align with your goals.',
    photoSrc: 'https://i.imgur.com/IFNwl3C.png',
    linkedinUrl: 'https://www.linkedin.com/in/jakerossetto/',
  },
  {
    role: 'Chief of Graduate Student Life',
    name: "Rahul Luthra, MBA '27",
    quote: (
      <>
        Founder of{' '}
        <a
          href={BEERS_AND_BANTER_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={engageLinkClass}
        >
          Beers &amp; Banter
        </a>
        . Building the moments you&apos;ll remember.
      </>
    ),
    photoSrc: 'https://i.imgur.com/JhLnw02.png',
    linkedinUrl: 'https://www.linkedin.com/in/rluthra1',
  },
  {
    role: 'Co-VP of Events',
    name: "Alia Nizam, MBA '27",
    quote: 'From class bonding to city adventures — making council events actually fun.',
    photoSrc: 'https://i.imgur.com/cVPB1Cw.png',
    linkedinUrl: 'https://www.linkedin.com/in/alia-nizam-325a3a158/',
  },
  {
    role: 'VP of CCD Relations',
    name: "Daniel Sousa Queiroz, MBA '27",
    quote: 'Expanding recruiter reach and making career access real for every program.',
    photoSrc: 'https://i.imgur.com/nVTEUPN.png',
    linkedinUrl: 'https://www.linkedin.com/in/daniel-queiroz-mba-babson',
  },
  {
    role: 'VP of Club Management',
    name: "Ryan Schmitt, MBA '27",
    quote: 'Every club, every student — supported, structured, and connected.',
    photoSrc: 'https://i.imgur.com/51zeKVB.png',
    linkedinUrl: 'https://www.linkedin.com/in/ryan-schmitt1/',
  },
  {
    role: 'VP of Finance',
    name: "Roshni Galani, MBA '27",
    quote: 'Managing every dollar with clarity and purpose.',
    photoSrc: 'https://i.imgur.com/bXZGPFd.png',
    linkedinUrl: 'https://www.linkedin.com/in/roshni-galani-/',
  },
  {
    role: 'VP of Marketing',
    name: "Smiti Sarin, MBA '27",
    quote: 'Newsletters you\'ll actually read. A Graduate Student Council presence that feels alive.',
    photoSrc: 'https://i.imgur.com/Ewmic2V.png',
    linkedinUrl: 'https://www.linkedin.com/in/smitisarin/',
  },
  {
    role: 'VP of Partners Club',
    name: "Luis Eduardo Gordillo, MBA '27",
    quote: 'Because partners and family are part of this journey too.',
    photoSrc: 'https://i.imgur.com/1zaS8eD.png',
    linkedinUrl: 'https://www.linkedin.com/in/luis-gordillo/',
  },
  {
    role: 'Chief of DEI',
    name: "Rashmi Tripathi, MBA '27",
    quote: 'Ensuring every program and every background has a seat at the table.',
    photoSrc: 'https://i.imgur.com/JEWZI2X.png',
    linkedinUrl: 'https://www.linkedin.com/in/rashmi-tripathi1/',
  },
  {
    role: 'Chief of Operations',
    name: "Akshay Karumuri, MBA '27",
    quote: 'The connective tissue of the GSC — making sure every club and every student feels supported.',
    photoSrc: 'https://i.imgur.com/ma7TBN1.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/akshaykarumuri/',
  },
];

const GSC_CALENDAR_EMBED_SRC =
  'https://miro.com/app/live-embed/uXjVGqVPD-Q=/?focusWidget=3458764665716147808&embedMode=view_only_without_ui&embedId=514690704532';

/** YouTube Short: https://youtube.com/shorts/HTOVLXLoYgc */
const STUDENT_VOICE_DASHBOARD_DEMO_EMBED_SRC =
  'https://www.youtube.com/embed/HTOVLXLoYgc?rel=0';

const CONTACT_EMAIL = 'rlee5@babson.edu';
const CONTACT_EMAIL_SUBJECT = 'Build Babson Better Campaign: Get In Touch!';

function formatCountdownParts(ms: number): { d: number; h: number; m: number; s: number } {
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { d, h, m, s };
}

function CampaignTabBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'transition' | 'archive';
  setActiveTab: (t: 'transition' | 'archive') => void;
}) {
  return (
    <div
      className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 py-3 backdrop-blur-sm"
      role="tablist"
      aria-label="Campaign sections"
    >
      <div className="flex justify-center px-6">
        <div className="flex w-full max-w-sm items-center justify-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'transition'}
            id="tab-transition"
            aria-controls="panel-transition"
            onClick={() => setActiveTab('transition')}
            className={`min-w-0 flex-1 rounded-full px-5 py-2 text-center text-[14px] transition-colors ${
              activeTab === 'transition'
                ? 'bg-emerald-600 font-semibold text-white shadow-sm'
                : 'font-medium text-gray-500 hover:text-gray-700'
            }`}
          >
            What We&apos;re Building
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'archive'}
            id="tab-archive"
            aria-controls="panel-archive"
            onClick={() => setActiveTab('archive')}
            className={`min-w-0 flex-1 rounded-full px-5 py-2 text-center text-[14px] transition-colors ${
              activeTab === 'archive'
                ? 'bg-emerald-600 font-semibold text-white shadow-sm'
                : 'font-medium text-gray-500 hover:text-gray-700'
            }`}
          >
            Campaign Archive
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-[12px] text-gray-500">
        Campaign Archive · Results: {ELECTION_RESULT_DATE}
      </p>
    </div>
  );
}

type ArchiveSectionsProps = {
  gscCalendarOpen: boolean;
  setGscCalendarOpen: (v: boolean | ((o: boolean) => boolean)) => void;
  contactEmailOpen: boolean;
  setContactEmailOpen: (v: boolean | ((o: boolean) => boolean)) => void;
  dashboardDemoOpen: boolean;
  setDashboardDemoOpen: (v: boolean | ((o: boolean) => boolean)) => void;
  eventScheduleHydrated: boolean;
};

function ArchiveCampaignSections({
  gscCalendarOpen,
  setGscCalendarOpen,
  contactEmailOpen,
  setContactEmailOpen,
  dashboardDemoOpen,
  setDashboardDemoOpen,
  eventScheduleHydrated,
}: ArchiveSectionsProps) {
  return (
    <>
      {/* Badge */}
      <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[13px] md:text-[14px] font-semibold mb-5 mono-text uppercase tracking-wide md:tracking-wider w-fit">
        <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
        <span>Ryan Lee for Graduate Student Council President · MBA &apos;27</span>
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
        aria-label="Campaign week events, March 30 through April 3, including Graduate Student Council presidential debate and potluck"
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
                  <span>See Proposed April 2026 Graduate Student Council Calendar</span>
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
                        title="Proposed April 2026 Graduate Student Council calendar"
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
        <p className="mx-auto mt-2 max-w-lg text-center text-[12px] leading-snug text-gray-500 md:text-[13px]">
          <span className="font-semibold text-gray-600">GSC</span> stands for{' '}
          <span className="font-semibold text-gray-600">Graduate Student Council</span>
          — Babson&apos;s elected government for graduate students.
        </p>
        <div className="flex flex-col gap-3 mt-5 w-full md:grid md:grid-cols-3 md:gap-5 md:max-w-3xl md:mx-auto">
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
                        alt="One Graduate Student Council — connected Babson student community"
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
        <a
          href={STUDENT_VOICE_DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] py-3 px-6 bg-emerald-600 text-white rounded-xl text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98] shadow-lg shadow-emerald-100 w-fit max-w-xl text-center leading-snug"
        >
          Add Idea to Student Voice Dashboard <ArrowRight className="h-4 w-4 shrink-0" />
        </a>
      </div>

      <blockquote className="mt-12 md:mt-16 w-full max-w-2xl mx-auto rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-white px-6 py-7 md:px-10 md:py-8 shadow-sm ring-1 ring-emerald-900/5">
        <p className="text-center text-[#1a2e24] text-[17px] md:text-[20px] leading-snug font-medium italic tracking-tight">
          Ask not what Babson can do for you, ask what you can do for Babson.
        </p>
      </blockquote>
    </>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'transition' | 'archive'>('transition');
  const [gscCalendarOpen, setGscCalendarOpen] = useState(false);
  const [contactEmailOpen, setContactEmailOpen] = useState(false);
  const [dashboardDemoOpen, setDashboardDemoOpen] = useState(false);
  /** Past styling uses the client clock; keep false until mount so SSR and first paint match (no hydration flash). */
  const [eventScheduleHydrated, setEventScheduleHydrated] = useState(false);
  const [handoverCountdownMs, setHandoverCountdownMs] = useState<number | null>(null);

  useEffect(() => {
    setEventScheduleHydrated(true);
  }, []);

  useEffect(() => {
    if (activeTab !== 'transition') return;
    const end = new Date(NEW_ADMINISTRATION_HANDOVER_AT).getTime();
    const tick = () => {
      const diff = end - Date.now();
      setHandoverCountdownMs(diff > 0 ? diff : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeTab]);

  const handoverReached = handoverCountdownMs !== null && handoverCountdownMs <= 0;
  const countdownParts =
    handoverCountdownMs !== null && handoverCountdownMs > 0
      ? formatCountdownParts(handoverCountdownMs)
      : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(5,150,105,0.12),transparent)]" />

      <div className="relative flex min-h-screen w-full flex-col sm:max-w-[420px] sm:mx-auto md:max-w-none">

        {/* Top nav */}
        <header className="flex flex-col gap-1.5 px-6 pt-6 md:px-16 md:pt-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
                <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-emerald-800 leading-tight">Build Babson Better</span>
          </div>
          <p className="text-[12px] leading-snug text-gray-600 md:max-w-2xl">
            {GSC_LONG} — Babson&apos;s elected voice for graduate students.
          </p>
        </header>

        <CampaignTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex flex-1 flex-col px-6 pb-[120px] pt-[52px] md:items-center md:px-8 md:pb-32 md:pt-10">

          {activeTab === 'transition' ? (
            <div
              id="panel-transition"
              role="tabpanel"
              aria-labelledby="tab-transition"
              className="flex w-full flex-col md:items-center"
            >
              {/* 1. Thank you banner */}
              <div className="w-full rounded-2xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/90 px-4 py-5 shadow-sm ring-1 ring-emerald-900/5 md:max-w-3xl">
                <h2 className="text-center text-[20px] font-bold tracking-tight text-emerald-900 md:text-[22px]">
                  Thank you, Babson. Now let&apos;s build. 🙏
                </h2>
                <p className="mt-3 text-center text-[14px] leading-relaxed text-emerald-900/85 md:text-[15px]">
                  The Babson graduate community elected the Build Babson Better slate on {ELECTION_RESULT_DATE}. Official handover:{' '}
                  {OFFICIAL_HANDOVER_DATE}.
                </p>
              </div>

              {/* 2. Hero */}
              <div className="mt-10 w-full md:max-w-2xl md:text-center">
                <div className="inline-flex max-w-full flex-col items-center gap-1 rounded-2xl border border-emerald-100 bg-emerald-50 px-3.5 py-2.5 text-center md:px-4 md:py-3">
                  <span className="text-[13px] font-semibold text-emerald-800 md:text-[14px]">{GSC_LONG}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 md:text-[12px] md:tracking-wider">
                    President-Elect 2026–27 · Babson Graduate Community
                  </span>
                </div>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-widest text-emerald-600 md:text-[13px]">
                  One Babson · All In
                </p>
                <h1 className="mt-2 text-[32px] font-extrabold leading-[1.08] tracking-tight text-[#0f1f1a] md:text-[52px]">
                  Build Babson Better.
                </h1>
                <p className="mt-4 text-[16px] font-semibold leading-snug text-emerald-800 md:mx-auto md:max-w-xl md:text-xl">
                  We&apos;re here for a short time. Let&apos;s make it count — for every program, every student, and everyone who comes after us.
                </p>
                <div className="relative mx-auto mt-6 aspect-video w-full max-w-[min(100%,420px)] overflow-hidden rounded-xl border border-gray-100 shadow-sm ring-1 ring-black/5 md:max-w-xl">
                  <Image
                    src="https://i.imgur.com/1uBxjoA.jpeg"
                    alt="Build Babson Better — graduate community"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                </div>
              </div>

              {/* 3. Countdown — new GSC administration handover */}
              <section className="mt-12 w-full md:max-w-xl md:text-center" aria-label="Countdown to official GSC handover 2026">
                <p className="text-center text-[13px] font-semibold text-emerald-800">Time until official handover</p>
                {handoverReached ? (
                  <p className="mt-4 text-center text-[15px] font-medium leading-relaxed text-emerald-900">
                    The new administration is here. Thank you for your trust — now we build toward fall and beyond.
                  </p>
                ) : countdownParts ? (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    {(
                      [
                        ['Days', countdownParts.d],
                        ['Hours', countdownParts.h],
                        ['Minutes', countdownParts.m],
                        ['Seconds', countdownParts.s],
                      ] as const
                    ).map(([label, value]) => (
                      <div
                        key={label}
                        className="flex min-w-[4.5rem] flex-col items-center rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2"
                      >
                        <span className="text-[22px] font-bold tabular-nums text-emerald-800 md:text-2xl">
                          {value}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-700/90">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-center text-[14px] text-gray-500">Loading…</p>
                )}
                <p className="mt-4 text-center text-[12px] text-gray-500 md:text-[13px]">
                  {OFFICIAL_HANDOVER_DATE} · GSC handover at 9:00 a.m. Eastern
                </p>
              </section>

              {/* 4. Student Voice Dashboard CTA */}
              <section className="mt-12 w-full md:flex md:justify-center">
                <div className="mx-auto w-full max-w-lg rounded-2xl border border-violet-200 bg-violet-50 px-5 py-6 text-center shadow-lg shadow-violet-100/80 ring-1 ring-violet-900/5 md:px-8 md:py-8">
                  <h2 className="text-[20px] font-bold tracking-tight text-[#1a1c2e] md:text-[22px]">
                    Your ideas shape what we build.
                  </h2>
                  <p className="mt-3 text-left text-[14px] leading-relaxed text-gray-600 md:text-[15px]">
                    The Student Voice Dashboard is live. Drop in an idea, upvote what matters to you, and watch it move through the system. We&apos;re tracking every submission publicly — no black holes, no silence. This is how we stay accountable to you.
                  </p>
                  <a
                    href={STUDENT_VOICE_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-violet-700 active:scale-[0.98]"
                  >
                    Add Your Idea →
                  </a>
                </div>
              </section>

              {/* 5. Transition timeline */}
              <section className="mt-14 w-full md:max-w-3xl" aria-label="Transition timeline">
                <h2 className="text-center text-[22px] font-bold tracking-tight text-[#0f1f1a] md:text-2xl">
                  What changes now.
                </h2>
                <div className="relative mt-8 md:mt-10">
                  <div
                    className="absolute left-[11px] top-2 bottom-2 w-px bg-emerald-300 md:left-0 md:right-0 md:top-[18px] md:bottom-auto md:h-px md:w-full"
                    aria-hidden
                  />
                  <ol className="relative flex flex-col gap-8 md:flex-row md:gap-4 md:pt-1">
                    <li className="flex gap-4 md:flex-1 md:flex-col md:items-center md:text-center md:pt-6">
                      <span className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-white md:mt-0" />
                      <div>
                        <p className="text-[13px] font-bold text-emerald-800">Now → Mid-May 2026</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                          Transition. Meeting with the outgoing Graduate Student Council, learning the institutional ropes, and setting up the infrastructure.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4 md:flex-1 md:flex-col md:items-center md:text-center md:pt-6">
                      <span className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-white md:mt-0" />
                      <div>
                        <p className="text-[13px] font-bold text-emerald-800">Mid-May → August 2026</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                          Launch. First Graduate Student Council team meeting, student body announcement, and early platform wins before fall classes begin.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4 md:flex-1 md:flex-col md:items-center md:text-center md:pt-6">
                      <span className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-white md:mt-0" />
                      <div>
                        <p className="text-[13px] font-bold text-emerald-800">Fall 2026 onward</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                          Full term. Classes are back, programming is in full swing, and the Student Voice Dashboard is how we keep hearing from you.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </section>

              {/* 6. Upcoming GSC events */}
              <section className="mt-14 w-full md:max-w-5xl" aria-label="Upcoming Graduate Student Council events">
                <h2 className="text-center text-[22px] font-bold tracking-tight text-[#0f1f1a] md:text-2xl">
                  Upcoming GSC events
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-center text-[14px] text-gray-500">
                  Join us in person and keep building cross-program community together.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {TRANSITION_UPCOMING_EVENTS.map((ev) => (
                    <article
                      key={ev.id}
                      aria-label={`${ev.title}, ${ev.day} ${ev.date}`}
                      className="flex flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-[#fafafa] text-center shadow-sm transition-[background-color,border-color] duration-300"
                    >
                      <header className="bg-emerald-800 px-3 py-3 text-white">
                        <p className="text-[15px] font-bold leading-tight">{ev.day}</p>
                        <p className="mt-0.5 text-[13px] font-semibold text-white/95">{ev.date}</p>
                      </header>
                      <div className="relative aspect-[4/3] w-full bg-gray-100">
                        <Image
                          src={ev.imageSrc}
                          alt={`${ev.title} event`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex-1 px-4 py-4">
                        <p className="text-[16px] font-bold leading-tight text-[#0f1f1a]">{ev.title}</p>
                        <p className="mt-2 text-[13px] font-bold text-gray-900">{ev.time}</p>
                        <p className="mt-1 text-[12px] font-medium text-gray-600">{ev.location}</p>
                        <p className="mt-3 text-[12px] leading-snug text-gray-700">{ev.description}</p>
                      </div>
                      <div className="mt-auto border-t border-gray-200 bg-white px-2 py-2.5">
                        {ev.rsvpHref ? (
                          <a
                            href={ev.rsvpHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                          >
                            {ev.ctaLabel ?? 'RSVP'}
                          </a>
                        ) : (
                          <span className="text-[13px] font-semibold text-gray-600">Details above</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* 7. Meet the team */}
              <section className="mt-14 w-full md:max-w-5xl" aria-label="Graduate Student Council team">
                <h2 className="text-center text-[22px] font-bold tracking-tight text-[#0f1f1a] md:text-2xl">
                  The team stepping up.
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-center text-[14px] text-gray-500">
                  Each person ran because they care about this community. Now we build together.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  {TRANSITION_TEAM.map((m) => (
                    <div
                      key={`${m.role}-${m.name}`}
                      className={`rounded-xl border p-4 shadow-sm md:p-5 ${
                        m.pending
                          ? 'border-gray-200 bg-gray-50/90 text-gray-500'
                          : 'border-gray-100 bg-white ring-1 ring-black/[0.03]'
                      }`}
                    >
                      {m.pending ? (
                        <>
                          <span className="inline-block rounded-full bg-gray-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                            ⏳ Run-off in progress
                          </span>
                          <p className="mt-2 text-[13px] font-bold text-gray-700">{m.role}</p>
                          <p className="mt-1 text-[16px] font-bold text-gray-600">TBD</p>
                        </>
                      ) : (
                        <div className="flex gap-4">
                          {m.photoSrc && (
                            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full bg-gray-50 ring-2 ring-emerald-100">
                              <Image
                                src={m.photoSrc}
                                alt={`${m.name}, ${m.role}`}
                                fill
                                className="object-cover object-top"
                                sizes="88px"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                              {m.role}
                            </span>
                            <p className="mt-2 text-[16px] font-bold text-[#0f1f1a]">{m.name}</p>
                            {m.linkedinUrl && (
                              <a
                                href={m.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${m.name} LinkedIn profile`}
                                className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-[#0A66C2]/20 bg-[#0A66C2]/10 px-2.5 py-1 text-[12px] font-semibold text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/15"
                              >
                                <span
                                  aria-hidden
                                  className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#0A66C2] text-[10px] font-extrabold leading-none text-white"
                                >
                                  in
                                </span>
                                LinkedIn
                              </a>
                            )}
                            <p className="mt-1 text-[13px] italic leading-snug text-gray-600">{m.quote}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 8. Pillars (transition) */}
              <section className="mt-14 w-full md:max-w-5xl">
                <h2 className="text-center text-[22px] font-bold tracking-tight text-[#0f1f1a] md:text-2xl">
                  What we&apos;re building this year.
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-[12px] leading-snug text-gray-500 md:text-[13px]">
                  <span className="font-semibold text-gray-600">GSC</span> stands for{' '}
                  <span className="font-semibold text-gray-600">Graduate Student Council</span>
                  — Babson&apos;s elected government for graduate students.
                </p>
                <div className="mt-5 flex w-full flex-col gap-3 md:mx-auto md:grid md:max-w-3xl md:grid-cols-3 md:gap-5">
                  {transitionPillars.map((f) => {
                    const [bgColor, textColor] = f.color.split(' ');
                    return (
                      <div
                        key={f.kicker}
                        className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md md:p-6"
                      >
                        <div className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${bgColor}`}>
                          <f.icon className={`h-7 w-7 ${textColor}`} />
                        </div>
                        <div className="mt-4 w-full min-w-0">
                          <p className="mono-text mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-emerald-700 md:text-sm">
                            {f.kicker}
                          </p>
                          <p className="mb-2 text-center text-[14px] font-semibold leading-tight text-[#1a1c1c]">
                            {f.title}
                          </p>
                          {f.kicker === '01 · Connect the Dots' && (
                            <div className="relative mb-3 mt-1 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
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
                            <div className="relative mb-3 mt-1 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                              <Image
                                src={ONE_GSC_IMAGE_SRC}
                                alt="One Graduate Student Council — connected Babson graduate community"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 280px"
                              />
                            </div>
                          )}
                          {f.kicker === '03 · Build Babson Better' && (
                            <div className="relative mb-3 mt-1 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                              <Image
                                src={BUILD_BABSON_BETTER_IMAGE_SRC}
                                alt="Build Babson Better — Student Voice Dashboard"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 280px"
                              />
                            </div>
                          )}
                          <ul className="list-disc space-y-1.5 pl-4 text-left text-[13px] leading-snug text-gray-500 marker:text-emerald-600">
                            {f.bullets.map((line, i) => (
                              <li key={typeof line === 'string' ? line : `${f.kicker}-${i}`} className="pl-0.5">
                                {line}
                              </li>
                            ))}
                          </ul>
                          {f.kicker === '03 · Build Babson Better' && (
                            <a
                              href={STUDENT_VOICE_DASHBOARD_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-violet-800 shadow-sm transition-colors hover:bg-violet-50"
                            >
                              See the Dashboard <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 9. Blockquote */}
              <blockquote className="mt-12 w-full max-w-2xl rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-white px-6 py-7 shadow-sm ring-1 ring-emerald-900/5 md:mt-16 md:px-10 md:py-8">
                <p className="text-center text-[17px] font-medium italic leading-snug tracking-tight text-[#1a2e24] md:text-[20px]">
                  Ask not what Babson can do for you, ask what you can do for Babson.
                </p>
              </blockquote>

              {/* 10. Footer — Instagram callout */}
              <footer className="mt-10 w-full pb-2 md:mt-12">
                <div
                  className="mx-auto w-full max-w-md rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/95 to-white px-5 py-4 text-center shadow-sm ring-1 ring-emerald-900/5"
                  role="note"
                  aria-label="Follow Build Babson Better on Instagram"
                >
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-emerald-800">
                    Follow us on Instagram
                  </p>
                  <a
                    href="https://instagram.com/buildbabsonbetter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                  >
                    <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                    @buildbabsonbetter
                  </a>
                </div>
              </footer>
            </div>
          ) : (
            <div
              id="panel-archive"
              role="tabpanel"
              aria-labelledby="tab-archive"
              className="flex w-full flex-col md:items-center"
            >
              <div
                className="mx-auto mb-6 mt-4 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-[13px] text-amber-800"
                role="note"
              >
                📁 Campaign Archive · Build Babson Better · Babson Graduate Student Council (GSC) presidential campaign, March
                30–April 10, 2026. Results announced {ELECTION_RESULT_DATE}.
              </div>
              <ArchiveCampaignSections
                gscCalendarOpen={gscCalendarOpen}
                setGscCalendarOpen={setGscCalendarOpen}
                contactEmailOpen={contactEmailOpen}
                setContactEmailOpen={setContactEmailOpen}
                dashboardDemoOpen={dashboardDemoOpen}
                setDashboardDemoOpen={setDashboardDemoOpen}
                eventScheduleHydrated={eventScheduleHydrated}
              />
            </div>
          )}
        </main>

        {/* Mobile bottom CTA */}
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 bg-white/95 px-5 pb-6 pt-4 shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-sm md:hidden">
          <a
            href={STUDENT_VOICE_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 px-3 text-center text-[13px] font-semibold leading-tight text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
          >
            Add Your Idea to the Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
