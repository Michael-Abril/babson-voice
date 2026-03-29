'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIdeas } from '@/lib/hooks';
import { CATEGORY_OPTIONS, CATEGORY_COLORS } from '@/lib/constants';
import { X } from 'lucide-react';
import type { IdeaCategory } from '@/types';

export default function SubmitIdeaPage() {
  const router = useRouter();
  const { create } = useIdeas();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<IdeaCategory>('other');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = title.trim().length >= 3 && body.trim().length >= 10;

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
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard/" className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-[#1a1c1c]">New Idea</h1>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Posting...' : 'Submit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title..."
            maxLength={120}
            className="w-full text-xl font-semibold text-[#1a1c1c] placeholder-gray-300 border-0 border-b border-gray-200 pb-3 focus:border-emerald-600 focus:outline-none focus:ring-0 bg-transparent transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((c) => {
            const colors = CATEGORY_COLORS[c.value];
            const isSelected = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value as IdeaCategory)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs mono-text font-medium rounded-full border transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.text} border-transparent`
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            placeholder="Describe the issue and your proposed solution..."
            maxLength={2000}
            className="w-full text-sm text-[#1a1c1c] placeholder-gray-300 border border-gray-200 rounded-lg p-4 focus:border-emerald-600 focus:outline-none focus:ring-0 bg-white resize-none transition-colors leading-relaxed"
          />
          <p className="mt-1 text-right mono-text text-[10px] text-gray-400">{body.length}/2000</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Mobile submit button */}
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full h-[44px] bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] md:hidden"
        >
          {submitting ? 'Posting...' : 'Post anonymously'}
        </button>
      </form>
    </div>
  );
}
