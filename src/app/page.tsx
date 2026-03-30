'use client';

import Link from 'next/link';
import { ArrowRight, Link2, UsersRound, Hammer, ShieldCheck, Instagram } from 'lucide-react';

const features = [
  {
    icon: Link2,
    color: 'bg-amber-50 text-amber-500',
    kicker: 'Connect the dots',
    title: 'Put ideas on the record',
    description:
      'Career access, cross-program community, academics, dining, facilities — say what you need. Anonymous posts; real signal for GSC and class reps.',
  },
  {
    icon: UsersRound,
    color: 'bg-emerald-50 text-emerald-600',
    kicker: 'One GSC',
    title: 'Every program, one table',
    description:
      'FY, EY, Miami, MSBA, MSF, MSEL, part-time — if you are a Babson grad student, this is your lane. No silos in the feed.',
  },
  {
    icon: Hammer,
    color: 'bg-violet-50 text-violet-600',
    kicker: 'Build Babson Better',
    title: 'Vote, volunteer, follow through',
    description:
      'Upvote what matters, pass on what does not, and raise your hand to help execute. Student voice that turns into action — not another survey.',
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
        <main className="flex-1 flex flex-col px-6 pt-10 pb-[110px] md:items-center md:pt-20 md:pb-32 md:px-8">

          {/* Badge */}
          <div className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[11px] font-semibold mb-5 mono-text uppercase tracking-widest w-fit">
            <ShieldCheck className="h-3 w-3 shrink-0" />
            <span>Ryan Lee for GSC President · MBA &apos;27</span>
          </div>

          {/* Headline */}
          <div className="md:text-center md:max-w-2xl">
            <p className="text-emerald-700 text-[13px] font-semibold tracking-wide uppercase mb-3 md:mb-4">
              Already at work — and already listening.
            </p>
            <h1 className="text-[#0f1f1a] tracking-tight text-[34px] font-extrabold leading-[1.08] md:text-[56px]">
              Build Babson Better.<br />
              <span className="text-emerald-600">Brings People to the Table.</span>
            </h1>
            <p className="mt-5 text-gray-500 text-[15px] leading-relaxed md:text-lg md:max-w-xl md:mx-auto">
              Enough with the talking — let&apos;s put graduate student ideas where they can&apos;t be ignored. Pitch anonymously, vote on what matters, and volunteer to help make it real.
            </p>
            <p className="mt-3 text-gray-400 text-[13px] leading-snug md:max-w-lg md:mx-auto">
              GSC election voting <span className="text-gray-600 font-medium">April 4–6</span>
              {' · '}
              <a
                href="https://instagram.com/buildbabsonbetter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 font-medium hover:text-emerald-800 underline underline-offset-2"
              >
                <Instagram className="h-3.5 w-3.5" aria-hidden />
                @buildbabsonbetter
              </a>
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3 mt-10 w-full md:grid md:grid-cols-3 md:gap-5 md:max-w-3xl md:mt-14">
            {features.map((f) => {
              const [bgColor, textColor] = f.color.split(' ');
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:flex-col hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <div className={`flex items-center justify-center rounded-xl shrink-0 size-10 ${bgColor}`}>
                    <f.icon className={`h-5 w-5 ${textColor}`} />
                  </div>
                  <div>
                    <p className="mono-text text-[10px] font-bold uppercase tracking-wider text-emerald-700/90 mb-1">{f.kicker}</p>
                    <p className="text-[#1a1c1c] text-[14px] font-semibold leading-tight mb-1">{f.title}</p>
                    <p className="text-gray-500 text-[13px] leading-snug">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex mt-12 flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="/login/"
              className="h-[48px] bg-emerald-600 text-white rounded-xl px-8 text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98] shadow-lg shadow-emerald-100 w-fit"
            >
              Join with Babson Email <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-gray-400 mono-text">@babson.edu · no password · posts stay anonymous</p>
          </div>
        </main>

        {/* Mobile bottom CTA */}
        <div className="fixed bottom-0 left-0 w-full px-5 pt-4 pb-6 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden z-50 shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.06)]">
          <Link
            href="/login/"
            className="w-full h-[50px] bg-emerald-600 text-white rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98]"
          >
            Join with Babson Email <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-[11px] text-gray-400 mono-text mt-2">@babson.edu · anonymous · vote Apr 4–6</p>
        </div>
      </div>
    </div>
  );
}
