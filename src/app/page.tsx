'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Link2, UsersRound, LayoutDashboard, ShieldCheck, Instagram, Mic } from 'lucide-react';

const HOLI_ENGAGE_URL = 'https://engage.babson.edu/web/rsvp_boot?id=376170';

const engageLinkClass =
  'text-emerald-700 underline underline-offset-2 font-medium hover:text-emerald-800 break-words';

const CAMPAIGN_WEEK_EVENTS: {
  day: string;
  date: string;
  time: string;
  description: string;
  rsvpHref: string;
  imageSrc: string;
}[] = [
  {
    day: 'Monday',
    date: 'March 30',
    time: '10am-1pm',
    description: 'Stop by a listening session and share about what you want!',
    rsvpHref: '#rsvp-mon',
    imageSrc: 'https://i.imgur.com/HCj0tS3.jpeg',
  },
  {
    day: 'Tuesday',
    date: 'March 31',
    time: '4-5pm',
    description: 'Join us for a curated tour of a "Hidden Place" at Babson!',
    rsvpHref: 'https://luma.com/g974ye0g',
    imageSrc: 'https://i.imgur.com/Lui7k8F.jpeg',
  },
  {
    day: 'Wednesday',
    date: 'April 1',
    time: '4-6pm',
    description: 'Learn about our Build Babson Better platform over drinks & food!',
    rsvpHref: 'https://luma.com/3azm7dqc',
    imageSrc: 'https://i.imgur.com/CVY1odr.jpeg',
  },
  {
    day: 'Thursday',
    date: 'April 2',
    time: '4-6pm',
    description: "Come check out student ventures and stop by my startup's booth!",
    rsvpHref: 'https://cvent.me/W3XG4k',
    imageSrc: 'https://i.imgur.com/7Eu1th5.jpeg',
  },
  {
    day: 'Friday',
    date: 'April 3',
    time: '6-9pm',
    description:
      'Come over for a Build Babson Better BBQ after the annual Holi festivities.',
    rsvpHref: 'https://luma.com/x28qsi1g',
    imageSrc: 'https://i.imgur.com/mpujAan.jpeg',
  },
];

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
    title: 'No silos and one connected student body',
    bullets: [
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

export default function HomePage() {
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
              We&apos;re at Babson for a short time. One moment to make this year count. Let&apos;s Build a Better Babson together that we can be proud of looking back at our time here.
            </p>
            <h2 className="text-[#0f1f1a] text-[22px] font-bold tracking-tight md:text-2xl text-center mt-5 md:max-w-xl md:mx-auto">
              Join my upcoming events to learn more!
            </h2>
          </div>

          {/* Campaign week calendar */}
          <section
            className="w-full max-w-6xl mt-6 md:mt-8 md:mx-auto"
            aria-label="Campaign week events, March 30 to April 3"
          >
            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-2">
              {CAMPAIGN_WEEK_EVENTS.map((ev) => (
                <article
                  key={ev.day}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-[#fafafa] shadow-sm text-center"
                >
                  <header className="bg-emerald-800 text-white px-3 py-3">
                    <p className="text-[15px] font-bold leading-tight">{ev.day}</p>
                    <p className="text-[13px] font-semibold text-white/95 mt-0.5">{ev.date}</p>
                  </header>
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={ev.imageSrc}
                      alt={`${ev.day} campaign event`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>
                  <p className="text-[13px] font-bold text-gray-900 px-2 pt-3 pb-1">{ev.time}</p>
                  <p className="text-[12px] leading-snug text-gray-700 px-3 pb-3 flex-1">
                    {ev.day === 'Friday' ? (
                      <>
                        Come over for a Build Babson Better BBQ after{' '}
                        <a href={HOLI_ENGAGE_URL} target="_blank" rel="noopener noreferrer" className={engageLinkClass}>
                          the annual Holi festivities
                        </a>
                        .
                      </>
                    ) : (
                      ev.description
                    )}
                  </p>
                  <div className="mt-auto border-t border-gray-200 bg-white py-2.5 px-2">
                    {ev.day === 'Monday' ? (
                      <span className="text-[13px] font-semibold text-emerald-800">In Olin Lobby</span>
                    ) : (
                      <a
                        href={ev.rsvpHref}
                        className="text-[13px] font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                        {...(ev.rsvpHref.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        RSVP
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="md:text-center md:max-w-2xl md:mx-auto w-full mt-4">
            <div className="flex flex-col gap-2 text-[13px] text-gray-500 md:items-center md:max-w-lg md:mx-auto">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 md:justify-center">
                <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                  <Mic className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden />
                  Debate Wed Apr 1 · 12-1 PM · Winn Auditorium
                </span>
              </p>
              <p>
                Voting <span className="text-gray-700 font-medium">Mon Apr 6 to Wed Apr 8</span>
              </p>
              <p className="text-[13px] md:text-[14px]">
                <a
                  href="https://instagram.com/buildbabsonbetter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 underline underline-offset-2"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                  @buildbabsonbetter
                </a>
              </p>
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
                      <ul className="text-gray-500 text-[13px] leading-snug space-y-1.5 list-disc pl-4 marker:text-emerald-600 text-left">
                        {f.bullets.map((line, i) => (
                          <li key={typeof line === 'string' ? line : `${f.kicker}-${i}`} className="pl-0.5">
                            {line}
                          </li>
                        ))}
                      </ul>
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
            <p className="text-xs text-gray-400 mono-text">@babson.edu · no password · posts stay anonymous</p>
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
          <p className="text-center text-xs text-gray-400 mono-text mt-2">@babson.edu · no password · posts stay anonymous</p>
        </div>
      </div>
    </div>
  );
}
