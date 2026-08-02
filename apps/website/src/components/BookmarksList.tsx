import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface QuestionMetadata {
  id: string;
  title: string;
  difficulty: string;
  topicTitle: string;
}

interface BookmarksListProps {
  questionsMetadata: QuestionMetadata[];
}

export const BookmarksList: React.FC<BookmarksListProps> = ({ questionsMetadata }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
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
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (data && !error) {
          setBookmarkedIds(data.map(b => b.question_id));
        }
      }
      setLoading(false);
    };

    fetchBookmarks();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const bookmarkedQuestions = bookmarkedIds
    .map(id => questionsMetadata.find(q => q.id === id))
    .filter((q): q is QuestionMetadata => !!q);

  if (loading) return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-24 w-full bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] animate-pulse" />
      ))}
    </div>
  );

  if (!user) {
    return (
      <div className="p-12 text-center border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)]">
        <h2 className="text-xl font-bold mb-2">Sign in to see your bookmarks</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">Your progress and saved questions are synced across devices.</p>
        <div className="flex justify-center gap-4">
          <span className="text-sm text-[var(--color-text-tertiary)] italic">Use the sign-in options in the header above</span>
        </div>
      </div>
    );
  }

  if (bookmarkedQuestions.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)]">
        <div className="w-16 h-16 bg-[var(--color-surface-overlay)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--color-border-default)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-tertiary)]">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">No bookmarks yet</h2>
        <p className="text-[var(--color-text-secondary)] mb-8">Start exploring questions and save the ones you want to master.</p>
        <a href="/questions" className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-text-inverse)] rounded-[var(--radius-md)] font-bold hover:opacity-90 transition-opacity no-underline inline-block">
          Explore Catalog
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookmarkedQuestions.map(question => (
        <a 
          key={question.id} 
          href={`/questions/${question.id}`}
          className="card card--interactive group relative overflow-hidden flex flex-col justify-between no-underline p-5"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className={`badge badge--${question.difficulty.toLowerCase()} text-[10px]`}>
                {question.difficulty}
              </span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {question.id}
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
              {question.title}
            </h3>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {question.topicTitle}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)] flex justify-between items-center">
             <span className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider">Practice →</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-tertiary)] group-hover:translate-x-1 transition-transform">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
};
