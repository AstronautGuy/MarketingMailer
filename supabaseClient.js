// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Accessing the environment variable
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Accessing the environment variable

export const supabase = createClient(supabaseUrl, supabaseAnonKey);