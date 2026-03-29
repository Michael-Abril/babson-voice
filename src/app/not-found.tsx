'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto space-y-6">
        <div className="text-gray-200 mb-2">
          <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827] font-mono">404</h1>
          <p className="text-[14px] text-gray-500">This page doesn&apos;t exist.</p>
        </div>
        <Link
          href="/"
          className="mt-4 px-4 h-[36px] inline-flex items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] font-medium text-[#111827] shadow-sm hover:bg-gray-50 hover:text-emerald-600 transition-colors min-w-[100px]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
