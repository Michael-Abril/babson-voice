'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIdeas, useCurrentUser } from '@/lib/hooks';
import { CATEGORY_OPTIONS, CATEGORY_COLORS } from '@/lib/constants';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { IdeaCategory } from '@/types';

const BODY_MAX = 2000;
const TITLE_MAX = 120;

export default function SubmitIdeaPage() {
  const router = useRouter();
  const { create } = useIdeas();
  const { name } = useCurrentUser();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<IdeaCategory>('other');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = title.trim().length >= 3 && body.trim().length >= 10;
  const bodyProgress = Math.min((body.length / BODY_MAX) * 100, 100);
  const bodyColor =
    bodyProgress > 90 ? 'bg-red-500' : bodyProgress > 70 ? 'bg-amber-500' : 'bg-emerald-500';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await create({ title: title.trim(), body: body.trim(), category });
      router.push('/dashboard/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard/" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-base font-semibold text-[#1a1c1c]">New Idea</h1>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Posting…' : 'Post'}
        </button>
      </div>

      {/* Anonymous context */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50 border border-emerald-100 rounded-lg mb-7">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-700">
          Posting anonymously{name ? ` as <strong>${name.charAt(0).toUpperCase() + name.slice(1)}</strong>` : ''} — your identity is never attached to this idea.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What should Babson improve?"
            maxLength={TITLE_MAX}
            autoFocus
            className="w-full text-xl font-semibold text-[#1a1c1c] placeholder-gray-300 border-0 border-b-2 border-gray-100 pb-3 focus:border-emerald-500 focus:outline-none focus:ring-0 bg-transparent transition-colors"
          />
          <p className="mt-1.5 text-right mono-text text-[10px] text-gray-300">{title.length}/{TITLE_MAX}</p>
        </div>

        {/* Category chips */}
        <div>
          <p className="mono-text text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2.5">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => {
              const colors = CATEGORY_COLORS[c.value];
              const isSelected = category === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value as IdeaCategory)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs mono-text font-semibold rounded-full border transition-all ${
                    isSelected
                      ? `${colors.bg} ${colors.text} border-transparent shadow-sm`
                      : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div>
          <p className="mono-text text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2.5">Details</p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            placeholder="Describe the problem and your proposed solution. Be specific — the more context, the more actionable your idea."
            maxLength={BODY_MAX}
            className="w-full text-sm text-[#1a1c1c] placeholder-gray-300 border border-gray-200 rounded-xl p-4 focus:border-emerald-500 focus:outline-none focus:ring-0 bg-white resize-none transition-colors leading-relaxed"
          />
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${bodyColor}`}
                style={{ width: `${bodyProgress}%` }}
              />
            </div>
            <span className="mono-text text-[10px] text-gray-400 shrink-0">{body.length}/{BODY_MAX}</span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Mobile submit */}
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full h-[50px] bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl text-[15px] font-semibold shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] md:hidden"
        >
          {submitting ? 'Posting…' : 'Post anonymously'}
        </button>
      </form>
    </div>
  );
}
