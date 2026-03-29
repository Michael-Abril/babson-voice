'use client';

import { useMemo } from 'react';
import { useIdeas, useVotes, useVolunteers, useCurrentUser } from '@/lib/hooks';
import { CATEGORY_OPTIONS, CATEGORY_COLORS } from '@/lib/constants';
import { formatRelativeDate } from '@/lib/utils';
import { ChevronUp, ChevronDown, Hand, Inbox } from 'lucide-react';

export default function MyActivityPage() {
  const { id: userId } = useCurrentUser();
  const { data: allIdeas, loading: loadingIdeas } = useIdeas();
  const { data: myVotes, loading: loadingVotes } = useVotes(userId);
  const { data: allVolunteers, loading: loadingVols } = useVolunteers();

  const myVolunteers = useMemo(
    () => allVolunteers.filter((v) => v.userId === userId),
    [allVolunteers, userId],
  );

  const ideasMap = useMemo(() => {
    const m: Record<string, typeof allIdeas[0]> = {};
    for (const idea of allIdeas) m[idea.id] = idea;
    return m;
  }, [allIdeas]);

  const loading = loadingIdeas || loadingVotes || loadingVols;

  if (loading) {
    return <div className="flex items-center justify-center py-32"><div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-600" /></div>;
  }

  const hasActivity = myVotes.length > 0 || myVolunteers.length > 0;

  return (
    <div className="max-w-[640px] mx-auto animate-fade-in-up">
      {/* Header */}
      <section className="mb-12">
        <span className="mono-text text-[10px] uppercase tracking-widest text-emerald-600 font-semibold mb-1 block">Your history</span>
        <h1 className="text-4xl font-extrabold tracking-tighter text-[#1a1c1c] mb-2">Activity</h1>
        <p className="text-gray-500 text-sm">Your votes and volunteer signups, tied to your session.</p>
      </section>

      {!hasActivity && (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <Inbox className="h-10 w-10 text-gray-300 mb-4" />
          <p className="text-[#1a1c1c] font-medium">No activity yet</p>
          <p className="text-xs text-gray-400 mono-text mt-1">Explore the feed to start contributing</p>
        </div>
      )}

      {/* Votes */}
      {myVotes.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mono-text">Votes ({myVotes.length})</h2>
          </div>
          <div className="space-y-0">
            {myVotes.map((vote) => {
              const idea = ideasMap[vote.ideaId];
              if (!idea) return null;
              const cat = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.other;
              return (
                <div key={vote.id} className="group flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={vote.voteType === 'up' ? 'text-emerald-600' : 'text-red-500'}>
                      {vote.voteType === 'up' ? <ChevronUp className="h-5 w-5" strokeWidth={2.5} /> : <ChevronDown className="h-5 w-5" strokeWidth={2.5} />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                        <span className="mono-text text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {CATEGORY_OPTIONS.find((c) => c.value === idea.category)?.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#1a1c1c]">{idea.title}</span>
                    </div>
                  </div>
                  <span className="mono-text text-[11px] text-gray-400 shrink-0">{formatRelativeDate(vote.createdAt)}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Volunteered */}
      {myVolunteers.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mono-text">Volunteered ({myVolunteers.length})</h2>
          </div>
          <div className="space-y-0">
            {myVolunteers.map((vol) => {
              const idea = ideasMap[vol.ideaId];
              if (!idea) return null;
              const cat = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.other;
              return (
                <div key={vol.id} className="group flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Hand className="h-5 w-5 text-emerald-600" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                        <span className="mono-text text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {CATEGORY_OPTIONS.find((c) => c.value === idea.category)?.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#1a1c1c]">{idea.title}</span>
                    </div>
                  </div>
                  <span className="mono-text text-[11px] text-gray-400 shrink-0">{formatRelativeDate(vol.signedUpAt)}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
