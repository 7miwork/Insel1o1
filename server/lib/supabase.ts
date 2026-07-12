/**
 * Supabase client initialization (Server-side)
 *
 * Initializes the Supabase admin client for server-side operations.
 * Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from environment variables.
 * The service role key bypasses RLS and should ONLY be used on the server.
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl) {
  throw new Error(
    "Missing SUPABASE_URL environment variable. Please set it in your .env file.",
  );
}

// Use service role key if available (admin operations), otherwise fall back to anon key
const supabaseKey =
  supabaseServiceKey || (process.env.VITE_SUPABASE_ANON_KEY as string);

if (!supabaseKey) {
  throw new Error(
    "Missing Supabase key. Please set SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});