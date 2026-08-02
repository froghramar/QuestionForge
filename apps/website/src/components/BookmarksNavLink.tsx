import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  isActive: boolean;
}

export const BookmarksNavLink: React.FC<Props> = ({ isActive }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <a 
      href="/bookmarks" 
      className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
    >
      Bookmarks
    </a>
  );
};
