export { supabase } from "@/integrations/supabase/client";

export interface UserAttempt {
  id?: string;
  user_id: string;
  question_id: string;
  domain: string;
  selected_index: number;
  is_correct: boolean;
  created_at?: string;
}
