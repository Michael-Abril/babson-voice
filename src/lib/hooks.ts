'use client';

import { useState, useEffect, useCallback } from 'react';
import { ideas, volunteers } from './database';
import { supabase } from './supabase';
import type { Idea, Volunteer } from '../types';

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1500): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error('Unexpected');
}

export function useCurrentUser() {
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('babson-voice-email') || '';
    setEmail(stored);
    setLoaded(true);
  }, []);

  return {
    id: email || 'anon',
    email,
    name: email ? email.split('@')[0] : '',
    authenticated: !!email,
    loaded,
    logout: async () => {
      localStorage.removeItem('babson-voice-email');
    },
  };
}

// --- Ideas ---

export function useIdeas() {
  const [data, setData] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchWithRetry(() => ideas().get());
      setData(result as Idea[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ideas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const create = async (input: Pick<Idea, 'title' | 'body' | 'category'>) => {
    const newIdea: Omit<Idea, 'id'> = {
      ...input,
      upvotes: 0,
      downvotes: 0,
      volunteerCount: 0,
      createdAt: new Date().toISOString(),
    };
    try {
      await ideas().add(newIdea as any);
      await refresh();
    } catch (err) {
      throw err;
    }
  };

  return { data, loading, error, create, refresh };
}

// --- Votes ---

export function useVotes(userId: string) {
  const [data, setData] = useState<{ id: string; ideaId: string; voteType: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId || userId === 'anon') { setLoading(false); return; }
    try {
      setLoading(true);
      const { data: rows } = await supabase
        .from('votes')
        .select('id, ideaId, voteType, createdAt')
        .eq('voterId', userId);
      setData(rows ?? []);
    } catch {
      // non-critical
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

export function useAllVotes() {
  const [data, setData] = useState<{ id: string; ideaId: string; voterId: string; voteType: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { data: rows } = await supabase
        .from('votes')
        .select('id, ideaId, voterId, voteType');
      setData(rows ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

// Delete any existing vote this user has on this idea (server-side), then insert fresh.
export async function castVote(userId: string, ideaId: string, voteType: 'up' | 'down') {
  const { error: delErr } = await supabase
    .from('votes')
    .delete()
    .eq('ideaId', ideaId)
    .eq('voterId', userId);
  if (delErr) throw new Error(delErr.message);

  const { error: insErr } = await supabase
    .from('votes')
    .insert({ ideaId, voterId: userId, voteType, createdAt: new Date().toISOString() });
  if (insErr) throw new Error(insErr.message);
}

// Remove a specific vote by id.
export async function removeVote(userId: string, ideaId: string) {
  const { error } = await supabase
    .from('votes')
    .delete()
    .eq('ideaId', ideaId)
    .eq('voterId', userId);
  if (error) throw new Error(error.message);
}

// --- Recalculate idea vote counts (server-side count — never stale) ---

export async function recalculateIdeaVotes(ideaId: string) {
  const { data: rows, error } = await supabase
    .from('votes')
    .select('voteType')
    .eq('ideaId', ideaId);
  if (error) throw new Error(error.message);

  const upvotes   = (rows ?? []).filter((v) => v.voteType === 'up').length;
  const downvotes = (rows ?? []).filter((v) => v.voteType === 'down').length;
  await ideas().update(ideaId, { upvotes, downvotes } as any);
}

// --- Volunteers ---

export function useVolunteers(ideaId?: string) {
  const [data, setData] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchWithRetry(() => volunteers().get());
      const all = result as Volunteer[];
      setData(ideaId ? all.filter((v) => v.ideaId === ideaId) : all);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

export async function signUpVolunteer(ideaId: string, userId: string, email: string) {
  await volunteers().add({
    ideaId,
    userId,
    email,
    signedUpAt: new Date().toISOString(),
  } as any);
  // Recount from DB after insert (new row is already included)
  const allVols = await volunteers().get() as Volunteer[];
  const count = allVols.filter((v) => v.ideaId === ideaId).length;
  await ideas().update(ideaId, { volunteerCount: count } as any);
}
