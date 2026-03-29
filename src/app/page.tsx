'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Pitch campus improvements',
    description: 'Submit your ideas for better facilities, academics, or events.',
  },
  {
    title: 'Vote on top ideas',
    description: 'Upvote initiatives you care about to increase their visibility.',
  },
  {
    title: 'Drive tangible action',
    description: 'Turn popular feedback into trackable, actionable results.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
      <div className="relative flex min-h-screen w-full flex-col bg-white sm:max-w-[400px] sm:border-x sm:border-gray-200 sm:shadow-sm mx-auto overflow-hidden md:max-w-none md:border-none md:shadow-none">
        <main className="flex-1 flex flex-col px-6 pt-12 pb-[100px] md:items-center md:pt-24 md:pb-32 md:px-8">
          <div className="mb-12 md:mb-16 md:text-center">
            <span className="text-[#1a1c1c] text-2xl font-bold tracking-tight">Babson Voice</span>
          </div>

          <div className="flex flex-col gap-4 mb-10 md:mb-14 md:items-center md:text-center md:max-w-xl">
            <h1 className="text-[#1a1c1c] tracking-tight text-[32px] font-semibold leading-[1.1] md:text-[48px]">
              Shape Babson.<br />Anonymously.
            </h1>
            <p className="text-gray-500 text-base font-normal leading-relaxed md:text-lg md:max-w-md">
              The structured feedback platform for Babson College.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4 md:grid md:grid-cols-3 md:gap-8 md:max-w-3xl">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 md:flex-col md:items-start">
                <div className="flex items-center justify-center rounded-md bg-emerald-50 shrink-0 size-8 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-emerald-600" fill="currentColor" stroke="white" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1a1c1c] text-[15px] font-medium leading-tight mb-1">{f.title}</span>
                  <span className="text-gray-500 text-sm font-normal leading-snug">{f.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex mt-14 gap-3">
            <Link
              href="/login/"
              className="h-[44px] bg-[#1a1c1c] text-white rounded-md px-8 text-[15px] font-medium flex items-center justify-center transition-colors hover:bg-[#1a1c1c]/90 active:scale-[0.98]"
            >
              Continue with Babson SSO
            </Link>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/95 backdrop-blur-sm border-t border-gray-200 md:hidden z-50">
          <Link
            href="/login/"
            className="w-full h-[44px] bg-[#1a1c1c] text-white rounded-md text-[15px] font-medium flex items-center justify-center transition-colors hover:bg-[#1a1c1c]/90 active:scale-[0.98]"
          >
            Continue with Babson SSO
          </Link>
        </div>
      </div>
    </div>
  );
}
