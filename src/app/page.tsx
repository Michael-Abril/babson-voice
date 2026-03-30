'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Link2, UsersRound, LayoutDashboard, ShieldCheck, Instagram, Mic } from 'lucide-react';

const features: {
  icon: typeof Link2;
  color: string;
  kicker: string;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: Link2,
    color: 'bg-amber-50 text-amber-500',
    kicker: '01 · Connect the Dots',
    title: 'Career access that fits how you work',
    bullets: [
      'Sector-specific alumni intros and startup-oriented programming, not another generic panel',
      'Babson Bridge alumni speaker series (entrepreneurship-first, intros built in)',
      'Shared Alumni Warm-Intro Directory: searchable by industry, open to all grad students',
      'GSC International Student Networking Track for students building networks from scratch',
      'Work with GradCCD to shift generic career events toward warm-intro, industry-specific sessions',
    ],
  },
  {
    icon: UsersRound,
    color: 'bg-emerald-50 text-emerald-600',
    kicker: '02 · One GSC',
    title: 'No silos: communicate, connect, include',
    bullets: [
      'One cross-program social per semester (BBQ model, already proven)',
      'GSC Open Hours: any student, any program, no appointment',
      'Communication Charter: advance notice on events, dietary accommodations proactively included',
      'Consistent WhatsApp + email channels so no one misses what matters',
    ],
  },
  {
    icon: LayoutDashboard,
    color: 'bg-violet-50 text-violet-600',
    kicker: '03 · Build Babson Better',
    title: 'Student Voice Dashboard: accountability, not silence',
    bullets: [
      'Close the gap between what Babson promises and what you experience. This feed carries that same energy',
      'Launch a live Student Voice Dashboard: class-rep issues logged with owner + resolution status',
      '48-hour advance-notice standard for Canvas pre-work, pushed through GSC channels',
      'Monthly Venture Meetups: informal pitch nights, GSC-backed, open to all programs',
      'Advocate for a GSC-backed student venture seed fund',
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
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-emerald-800 leading-tight">Build Babson Better</span>
              <span className="text-[11px] font-medium text-gray-500 tracking-tight">Babson Voice · grad student ideas</span>
            </div>
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
              We&apos;re at Babson for a short time. One moment to make this year count. Every program connected, every student seen, feedback that turns into action. Pitch ideas anonymously, vote, and volunteer here; it&apos;s the same energy as the{' '}
              <span className="text-gray-700 font-medium">GSC Student Voice Dashboard</span> Ryan&apos;s committed to launching Day 1.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-[13px] text-gray-500 md:items-center md:max-w-lg md:mx-auto">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 md:justify-center">
                <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                  <Mic className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden />
                  Debate Wed Apr 1 · 12-1 PM · Winn Auditorium
                </span>
              </p>
              <p>
                Voting <span className="text-gray-700 font-medium">Mon Apr 6 to Wed Apr 8</span>
                <span className="text-gray-400"> · </span>
                No campaigning Sun Apr 5
              </p>
              <p>
                <a
                  href="https://instagram.com/buildbabsonbetter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 font-medium hover:text-emerald-800 underline underline-offset-2"
                >
                  <Instagram className="h-3.5 w-3.5" aria-hidden />
                  @buildbabsonbetter
                </a>
                <span className="text-gray-400"> · </span>
                Campaign week Mar 30 to Apr 3 · RSVP &amp; stops via posts
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
                        {f.bullets.map((line) => (
                          <li key={line} className="pl-0.5">
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
