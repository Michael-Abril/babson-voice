import { collection } from './supabase';
import type { Idea, Vote, Volunteer } from '../types';

export const ideas = () => collection<Idea>('ideas');
export const votes = () => collection<Vote>('votes');
export const volunteers = () => collection<Volunteer>('volunteers');
