'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already signed in — go straight to dashboard
  useEffect(() => {
    const stored = localStorage.getItem('babson-voice-email');
    if (stored) router.push('/dashboard/');
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.endsWith('@babson.edu')) {
      setError('Please use your Babson email address (@babson.edu).');
      return;
    }
    setLoading(true);
    localStorage.setItem('babson-voice-email', trimmed);
    router.push('/dashboard/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
              <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-emerald-800">Babson Voice</span>
        </div>

        <h1 className="text-[22px] font-semibold tracking-tight text-[#111827] mb-1">
          Sign in
        </h1>
        <p className="text-sm text-gray-500 mb-7">
          Use your Babson email. Your posts and votes are completely anonymous.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="you@babson.edu"
              required
              autoFocus
              className="w-full h-[44px] px-3.5 rounded-lg border border-gray-200 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
            />
            {error && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full h-[44px] bg-emerald-600 text-white rounded-lg text-[14px] font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-[0.98]"
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <p className="mt-6 text-[11px] text-center text-gray-400 leading-relaxed">
          Your email identifies your session only. It is never displayed publicly or attached to any post.
        </p>
      </div>
    </div>
  );
}
