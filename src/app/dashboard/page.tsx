'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIdeas, useAllVotes, useCurrentUser, castVote, removeVote, recalculateIdeaVotes, useVolunteers, signUpVolunteer } from '@/lib/hooks';
import { CATEGORY_OPTIONS, CATEGORY_COLORS } from '@/lib/constants';
import { formatRelativeDate } from '@/lib/utils';
import { ChevronUp, ChevronDown, Plus, Hand, X, Flame, Clock, TrendingUp, MessageSquare } from 'lucide-react';
import type { Idea, Vote } from '@/types';

type SortMode = 'hot' | 'new' | 'top';

function IdeaDetailModal({
  idea, userVote, userId, userEmail, onVote, onClose,
}: {
  idea: Idea; userVote: Vote | undefined; userId: string; userEmail: string;
  onVote: (ideaId: string, type: 'up' | 'down') => void; onClose: () => void;
}) {
  const { data: vols, refresh: refreshVols } = useVolunteers(idea.id);
  const [volunteering, setVolunteering] = useState(false);
  const [volError, setVolError] = useState('');
  const alreadyVolunteered = vols.some((v) => v.userId === userId);

  const handleVolunteer = async () => {
    if (alreadyVolunteered || volunteering) return;
    setVolunteering(true);
    setVolError('');
    try {
      await signUpVolunteer(idea.id, userId, userEmail);
      await refreshVols();
    } catch (err) {
      setVolError(err instanceof Error ? err.message : 'Could not sign up. Please try again.');
    } finally {
      setVolunteering(false);
    }
  };
  const net = idea.upvotes - idea.downvotes;
  const cat = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.other;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-slide-up relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
            <span className="mono-text text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {CATEGORY_OPTIONS.find((c) => c.value === idea.category)?.label}
            </span>
            <span className="text-gray-300 mx-1">&middot;</span>
            <span className="mono-text text-[10px] text-gray-400">{formatRelativeDate(idea.createdAt)}</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors">
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#1a1c1c] leading-tight">{idea.title}</h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">{idea.body}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <button onClick={() => onVote(idea.id, 'up')} className={`flex items-center gap-1 px-3 py-2 text-xs font-bold transition-colors ${userVote?.voteType === 'up' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                <ChevronUp className="h-4 w-4" /> {idea.upvotes}
              </button>
              <div className="h-5 w-px bg-gray-200" />
              <button onClick={() => onVote(idea.id, 'down')} className={`flex items-center gap-1 px-3 py-2 text-xs font-bold transition-colors ${userVote?.voteType === 'down' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                <ChevronDown className="h-4 w-4" /> {idea.downvotes}
              </button>
            </div>
            <span className={`mono-text text-sm font-bold ${net > 0 ? 'text-emerald-700' : net < 0 ? 'text-red-500' : 'text-gray-400'}`}>
              {net > 0 ? '+' : ''}{net} net
            </span>
          </div>
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-1.5 mono-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <Hand className="h-3.5 w-3.5" /> Volunteers
              </h3>
              <span className="mono-text text-[11px] text-gray-400">{vols.length} signed up</span>
            </div>
            {!alreadyVolunteered ? (
              <>
                <button onClick={handleVolunteer} disabled={volunteering}
                  className="w-full h-[44px] bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]">
                  {volunteering ? 'Signing up…' : 'I want to help make this happen'}
                </button>
                {volError && (
                  <p className="mt-2 text-xs text-red-600 text-center">{volError}</p>
                )}
              </>
            ) : (
              <div className="w-full h-[44px] bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <Hand className="h-4 w-4" /> You&apos;re signed up to help
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { data: allIdeas, loading, refresh: refreshIdeas } = useIdeas();
  const { data: allVotes, refresh: refreshVotes } = useAllVotes();
  const { id: userId, email: userEmail, loaded: userLoaded } = useCurrentUser();
  const [sort, setSort] = useState<SortMode>('hot');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [voting, setVoting] = useState(false);

  const userVotesMap = useMemo(() => {
    const map: Record<string, Vote> = {};
    for (const v of allVotes) { if (v.voterId === userId) map[v.ideaId] = v; }
    return map;
  }, [allVotes, userId]);

  const filtered = useMemo(() => {
    let items = categoryFilter === 'all' ? allIdeas : allIdeas.filter((i) => i.category === categoryFilter);
    switch (sort) {
      case 'hot': {
        const now = Date.now();
        items = [...items].sort((a, b) => {
          const sa = (a.upvotes - a.downvotes) / Math.max(1, (now - new Date(a.createdAt).getTime()) / 3600000);
          const sb = (b.upvotes - b.downvotes) / Math.max(1, (now - new Date(b.createdAt).getTime()) / 3600000);
          return sb - sa;
        });
        break;
      }
      case 'new': items = [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'top': items = [...items].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)); break;
    }
    return items;
  }, [allIdeas, sort, categoryFilter]);

  const handleVote = async (ideaId: string, type: 'up' | 'down') => {
    if (voting || !userLoaded || userId === 'anon') return;
    setVoting(true);
    try {
      const existing = userVotesMap[ideaId];
      if (existing && existing.voteType === type) await removeVote(existing.id);
      else await castVote(userId, ideaId, type, existing?.id);
      await recalculateIdeaVotes(ideaId);
      await Promise.all([refreshIdeas(), refreshVotes()]);
    } catch {} finally { setVoting(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-32"><div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-600" /></div>;
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="mono-text text-[10px] uppercase tracking-widest text-emerald-600 font-semibold mb-1 block">Campus Governance</span>
          <h2 className="text-4xl font-extrabold tracking-tighter text-[#1a1c1c]">Ideas</h2>
        </div>
        <Link href="/dashboard/submit/"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold shadow-md active:scale-95 transition-transform text-sm">
          <Plus className="h-4 w-4" /> New idea
        </Link>
      </section>

      <section className="flex flex-col gap-6 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex p-1 bg-gray-100 rounded-lg">
            {(['hot', 'new', 'top'] as SortMode[]).map((s) => (
              <button key={s} onClick={() => setSort(s)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
                  sort === s ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <button onClick={() => setCategoryFilter('all')}
              className={`whitespace-nowrap px-3 py-1 text-xs mono-text font-medium rounded-full transition-colors ${
                categoryFilter === 'all' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}>All</button>
            {CATEGORY_OPTIONS.map((c) => {
              const colors = CATEGORY_COLORS[c.value];
              return (
                <button key={c.value} onClick={() => setCategoryFilter(c.value)}
                  className={`whitespace-nowrap px-3 py-1 text-xs mono-text font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                    categoryFilter === c.value ? `${colors.bg} ${colors.text}` : 'text-gray-500 border border-gray-200 hover:bg-gray-50'
                  }`}>
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} /> {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <MessageSquare className="h-10 w-10 text-gray-300 mb-4" />
          <p className="text-[#1a1c1c] font-medium">No ideas yet</p>
          <p className="text-xs text-gray-400 mono-text mt-1">Be the first to share what Babson should improve</p>
          <Link href="/dashboard/submit/"
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold text-sm active:scale-95 transition-transform">
            <Plus className="h-4 w-4" /> Submit the first idea
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((idea) => {
            const uv = userVotesMap[idea.id];
            const net = idea.upvotes - idea.downvotes;
            const cat = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.other;
            return (
              <article key={idea.id} onClick={() => setSelectedIdea(idea)}
                className="flex bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden cursor-pointer">
                <div className="flex flex-col items-center justify-center w-14 bg-gray-50/50 py-4 group-hover:bg-gray-50 transition-colors"
                  onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleVote(idea.id, 'up')}
                    disabled={!userLoaded || userId === 'anon'}
                    className={`transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${uv?.voteType === 'up' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`}>
                    <ChevronUp className="h-6 w-6" />
                  </button>
                  <span className={`mono-text text-sm font-bold my-1 ${net > 0 ? 'text-emerald-700' : net < 0 ? 'text-red-500' : 'text-gray-500'}`}>{net}</span>
                  <button
                    onClick={() => handleVote(idea.id, 'down')}
                    disabled={!userLoaded || userId === 'anon'}
                    className={`transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${uv?.voteType === 'down' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                      <span className="text-[10px] mono-text font-semibold uppercase tracking-wider text-gray-500">
                        {CATEGORY_OPTIONS.find((c) => c.value === idea.category)?.label}
                      </span>
                    </div>
                    <span className="text-[10px] mono-text text-gray-400">&middot;</span>
                    <span className="text-[10px] mono-text text-gray-400">{formatRelativeDate(idea.createdAt)}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[#1a1c1c] mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{idea.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">{idea.body}</p>
                  {idea.volunteerCount > 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md w-fit">
                      <Hand className="h-4 w-4" />
                      <span className="text-[10px] mono-text font-bold">{idea.volunteerCount} Volunteer{idea.volunteerCount !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Link href="/dashboard/submit/"
        className="md:hidden fixed right-6 bottom-20 w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus className="h-6 w-6" />
      </Link>

      {selectedIdea && (
        <IdeaDetailModal idea={selectedIdea} userVote={userVotesMap[selectedIdea.id]}
          userId={userId} userEmail={userEmail} onVote={handleVote} onClose={() => setSelectedIdea(null)} />
      )}
    </div>
  );
}
