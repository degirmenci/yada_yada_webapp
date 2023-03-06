import { createClient } from '@supabase/supabase-js'

const supabaseClientUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClientKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
export const supabase = createClient(supabaseClientUrl, supabaseClientKey);

