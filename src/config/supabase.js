import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config;

// Use Vite's environment variable syntax
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Add 'export' before the function name
export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};