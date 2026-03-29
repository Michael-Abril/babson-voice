import { createClient } from '@supabase/supabase-js';

// The Vercel-Supabase integration injects NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// automatically. NEXT_PUBLIC_SUPABASE_URL must be added manually (1 var).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type WithId = { id: string };

/**
 * Drop-in replacement for the Varity SDK collection API.
 * Exposes the same .get() / .add() / .update() / .delete() surface
 * so hooks.ts and database.ts need zero changes.
 */
export function collection<T extends WithId>(name: string) {
  return {
    async get(): Promise<T[]> {
      const { data, error } = await supabase
        .from(name)
        .select('*')
        .order('createdAt', { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as T[];
    },

    async add(item: Omit<T, 'id'>): Promise<T> {
      const { data, error } = await supabase
        .from(name)
        .insert(item as object)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data as T;
    },

    async update(id: string, patch: Partial<Omit<T, 'id'>>): Promise<void> {
      const { error } = await supabase
        .from(name)
        .update(patch as object)
        .eq('id', id);
      if (error) throw new Error(error.message);
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from(name)
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
    },
  };
}
