-- Run this in your Supabase SQL Editor AFTER the table creation
-- This disables RLS on quiz_attempts (same as your other tables like 'users')
-- This is needed because the app uses the anon key directly from frontend

ALTER TABLE quiz_attempts DISABLE ROW LEVEL SECURITY;
