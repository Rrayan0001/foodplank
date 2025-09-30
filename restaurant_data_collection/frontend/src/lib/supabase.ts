import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://lumcvhvtkeozvjzopmgr.supabase.co'

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bWN2aHZ0a2VvenZqem9wbWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjkyOTksImV4cCI6MjA3NDgwNTI5OX0.wcaoF8xQtDLqNkpR8rqI9DONflvTRmPLur_w5oZb0Gc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


