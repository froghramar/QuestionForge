import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface QuestionData {
  id: string;
  title: string;
  difficulty: string;
  topicTitle: string;
}

export const BookmarksList: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('question_id')
          .eq('user_id', currentUser.id);

        if (data && !error) {
          // Since content is static, we'll need to fetch the details from the client-side
          // or pass them in. A better way for a static site is to fetch all questions
          // and filter them, or just store minimal data in Supabase.
          // For now, we assume a simple listing strategy.
          
          // In QuestionForge, we can fetch the manifest or just link by ID.
          // For this implementation, we will fetch the metadata we need.
          const bookmarkedIds = data.map(b => b.question_id);
          
          // Note: In a real Astro app, you'd usually have a client-side search index 
          // or a JSON manifest of all questions to resolve these IDs to titles.
          // For now, we'll just show the IDs and allow clicking to the page.
          setBookmarks(bookmarkedIds.map(id => ({
            id,
            title: id.replace('question.', '').replace(/-/g, ' '),
            difficulty: 'Unknown',
            topicTitle: 'Topic'
          })));
        }
      }
      setLoading(false);
    };

    fetchBookmarks();
  }, []);

  if (loading) return <div className="p-8 text-center text-[var(--color-text-tertiary)]">Loading your bookmarks...</div>;

  if (!user) {
    return (
      <div className="p-12 text-center border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-lg)]">
        <h2 className="text-xl font-bold mb-2">Sign in to see your bookmarks</h2>
        <p className="text-[var(--color-text-secondary)]">Your progress and saved questions are synced across devices.</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-lg)]">
        <h2 className="text-xl font-bold mb-2">No bookmarks yet</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">Start exploring questions and save the ones you want to master.</p>
        <a href="/questions" className="filter-btn filter-btn--active py-2 px-6 text-decoration-none inline-block">Browse Questions</a>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {bookmarks.map(bookmark => (
        <a 
          key={bookmark.id} 
          href={`/questions/${bookmark.id}`}
          className="card card--interactive p-4 flex justify-between items-center no-underline"
        >
          <div>
            <h3 className="card__title capitalize">{bookmark.title}</h3>
            <span className="text-xs text-[var(--color-text-tertiary)]">{bookmark.id}</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-tertiary)]">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      ))}
    </div>
  );
};
