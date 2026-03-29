'use client';

import { useState, useEffect, useCallback } from 'react';
import { ideas, votes, volunteers } from './database';
import type { Idea, Vote, Volunteer } from '../types';

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

  useEffect(() => {
    const stored = localStorage.getItem('babson-voice-email') || '';
    setEmail(stored);
  }, []);

  return {
    id: email || 'anon',
    email,
    name: email ? email.split('@')[0] : '',
    authenticated: !!email,
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
  const [data, setData] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchWithRetry(() => votes().get());
      setData((result as Vote[]).filter((v) => v.voterId === userId));
    } catch {
      // Silently fail — votes are non-critical for display
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

export function useAllVotes() {
  const [data, setData] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchWithRetry(() => votes().get());
      setData(result as Vote[]);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

export async function castVote(
  userId: string,
  ideaId: string,
  voteType: 'up' | 'down',
  existingVoteId?: string,
) {
  if (existingVoteId) {
    await votes().delete(existingVoteId);
  }
  await votes().add({
    ideaId,
    voterId: userId,
    voteType,
    createdAt: new Date().toISOString(),
  } as any);
}

export async function removeVote(voteId: string) {
  await votes().delete(voteId);
}

// --- Recalculate idea vote counts ---

export async function recalculateIdeaVotes(ideaId: string) {
  const allVotes = await votes().get() as Vote[];
  const ideaVotes = allVotes.filter((v) => v.ideaId === ideaId);
  const upvotes = ideaVotes.filter((v) => v.voteType === 'up').length;
  const downvotes = ideaVotes.filter((v) => v.voteType === 'down').length;
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
  // Bump the volunteer count on the idea
  const allVols = await volunteers().get() as Volunteer[];
  const count = allVols.filter((v) => v.ideaId === ideaId).length + 1;
  await ideas().update(ideaId, { volunteerCount: count } as any);
}
