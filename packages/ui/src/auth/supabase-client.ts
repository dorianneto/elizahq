import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://xcvpvezhgfaoyzqopttp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdnB2ZXpoZ2Zhb3l6cW9wdHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDI3MjksImV4cCI6MjA1ODkxODcyOX0.oP3_4wQwYcYalzv7Zr98-lEgO-P3TraS_508vAtcLtQ',
)
