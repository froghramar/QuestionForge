import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface BookmarkButtonProps {
  questionId: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ questionId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and check bookmark status
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data } = await supabase
          .from('bookmarks')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('question_id', questionId)
          .maybeSingle();
        
        setIsBookmarked(!!data);
      }
      setLoading(false);
    };

    init();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setIsBookmarked(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [questionId]);

  const toggleBookmark = async () => {
    if (!user) {
      alert('Please sign in to bookmark questions.');
      return;
    }

    setLoading(true);
    if (isBookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('question_id', questionId);
      
      if (!error) setIsBookmarked(false);
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .insert([{ user_id: user.id, question_id: questionId }]);
      
      if (!error) setIsBookmarked(true);
    }
    setLoading(false);
  };

  if (!user && !loading) return null;

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-medium transition-all cursor-pointer border ${
        isBookmarked 
          ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] border-[var(--color-accent)]' 
          : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
      }`}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill={isBookmarked ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
      </svg>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};
