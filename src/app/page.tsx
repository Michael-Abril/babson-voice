'use client';

import Link from 'next/link';
import { ArrowRight, Lightbulb, ThumbsUp, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    color: 'bg-amber-50 text-amber-500',
    title: 'Pitch improvements',
    description: 'Submit ideas for facilities, academics, dining, clubs, or anything on campus.',
  },
  {
    icon: ThumbsUp,
    color: 'bg-emerald-50 text-emerald-600',
    title: 'Vote on what matters',
    description: 'Upvote or downvote ideas to surface what Babson actually needs most.',
  },
  {
    icon: Users,
    color: 'bg-violet-50 text-violet-600',
    title: 'Volunteer to act',
    description: "Sign up to help make your favorite ideas real — not just talk about them.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(5,150,105,0.12),transparent)]" />

      <div className="relative flex min-h-screen w-full flex-col sm:max-w-[420px] sm:mx-auto md:max-w-none">

        {/* Top nav */}
        <header className="flex items-center gap-2.5 px-6 pt-6 md:px-16 md:pt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
              <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-emerald-800">Babson Voice</span>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col px-6 pt-14 pb-[110px] md:items-center md:pt-24 md:pb-32 md:px-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[11px] font-semibold mb-6 mono-text uppercase tracking-widest w-fit">
            <ShieldCheck className="h-3 w-3" /> Babson College &middot; 100% Anonymous
          </div>

          {/* Headline */}
          <div className="md:text-center md:max-w-2xl">
            <h1 className="text-[#0f1f1a] tracking-tight text-[40px] font-extrabold leading-[1.05] md:text-[66px]">
              Shape Babson.<br />
              <span className="text-emerald-600">Speak freely.</span>
            </h1>
            <p className="mt-5 text-gray-500 text-[15px] leading-relaxed md:text-lg md:max-w-md">
              The anonymous feedback platform where students pitch ideas, vote on what matters, and volunteer to make it happen.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3 mt-12 w-full md:grid md:grid-cols-3 md:gap-5 md:max-w-3xl">
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
                    <p className="text-[#1a1c1c] text-[14px] font-semibold leading-tight mb-1">{f.title}</p>
                    <p className="text-gray-500 text-[13px] leading-snug">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex mt-12 items-center gap-4">
            <Link
              href="/login/"
              className="h-[48px] bg-emerald-600 text-white rounded-xl px-8 text-[15px] font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98] shadow-lg shadow-emerald-100"
            >
              Sign in with Babson Email <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-gray-400 mono-text">@babson.edu required &middot; no password</p>
          </div>
        </main>

        {/* Mobile bottom CTA */}
        <div className="fixed bottom-0 left-0 w-full px-5 pt-4 pb-6 bg-white/95 backdrop-blur-sm border-t border-gray-100 md:hidden z-50 shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.06)]">
          <Link
            href="/login/"
            className="w-full h-[50px] bg-emerald-600 text-white rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors active:scale-[0.98]"
          >
            Sign in with Babson Email <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-[11px] text-gray-400 mono-text mt-2">@babson.edu required &middot; 100% anonymous</p>
        </div>
      </div>
    </div>
  );
}
