-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL, -- The Stable ID of the question (e.g. 'question.async-await')
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, question_id)
);

-- Enable RLS
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can view their own bookmarks'
    ) THEN
        CREATE POLICY "Users can view their own bookmarks"
          ON public.bookmarks FOR SELECT
          USING ( auth.uid() = user_id );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can insert their own bookmarks'
    ) THEN
        CREATE POLICY "Users can insert their own bookmarks"
          ON public.bookmarks FOR INSERT
          WITH CHECK ( auth.uid() = user_id );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bookmarks' AND policyname = 'Users can delete their own bookmarks'
    ) THEN
        CREATE POLICY "Users can delete their own bookmarks"
          ON public.bookmarks FOR DELETE
          USING ( auth.uid() = user_id );
    END IF;
END
$$;
