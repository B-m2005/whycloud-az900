import { createClient } from "@supabase/supabase-js";

// Publishable (anon) key — safe for browser use. Fallbacks keep the app working if .env is missing.
const url = import.meta.env.VITE_SUPABASE_URL ?? "https://iykjdvdeuqnqaaxgkpc.supabase.co";
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "sb_publishable_0YcWy3gg9SOgUjhqgxutzA_Efp2U";

export const supabase = createClient(url, key);

export interface UserAttempt {
  id?: string;
  user_id: string;
  question_id: string;
  domain: string;
  selected_index: number;
  is_correct: boolean;
  created_at?: string;
}
