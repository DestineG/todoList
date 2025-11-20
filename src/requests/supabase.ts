import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrubnvxdyukxcropazhy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydWJudnhkeXVreGNyb3Bhemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTI5NzMsImV4cCI6MjA3OTE2ODk3M30.gYnvf7fbIUhN8NytG2o99A9CZpvHJhHOtcbuviIftjA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
