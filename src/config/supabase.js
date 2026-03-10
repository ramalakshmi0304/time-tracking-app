import { createClient } from "@supabase/supabase-js";

// Note: In a Vite project, 'dotenv' is handled automatically by Vite. 
// You don't need to import or call dotenv.config() manually.

// Use the exact variable names you defined
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use the variable names you just defined above
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};