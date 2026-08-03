import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export const Auth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const signInWithGithub = async () => {
    setIsOpen(false);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const signInWithGoogle = async () => {
    setIsOpen(false);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const signOut = async () => {
    setIsOpen(false);
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="w-[180px] flex justify-end">
        <div className="auth-skeleton"></div>
      </div>
    );
  }

  return (
    <div className={`dropdown ${isOpen ? 'dropdown--open' : ''}`} ref={dropdownRef}>
      <div className="w-[180px] flex justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-medium bg-[var(--color-surface-raised)] border border-[var(--color-border-default)] hover:border-[var(--color-text-tertiary)] transition-all cursor-pointer truncate max-w-full"
        >
          {user ? (
            <>
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-muted)] flex items-center justify-center text-[10px] text-[var(--color-accent)] font-bold shrink-0">
                {user.email?.[0].toUpperCase() ?? 'U'}
              </div>
              <span className="truncate">{user.email?.split('@')[0]}</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Sign In</span>
            </>
          )}
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className="dropdown__menu">
        {user ? (
          <>
            <div className="px-3 py-2 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Signed in as</p>
              <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">{user.email}</p>
            </div>
            <div className="menu-divider"></div>
            <a href="/bookmarks" className="menu-item" onClick={() => setIsOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
              Bookmarks
            </a>
            <div className="menu-divider"></div>
            <button onClick={signOut} className="menu-item menu-item--danger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <div className="px-3 py-2 mb-1">
              <p className="text-xs font-semibold text-[var(--color-text-primary)]">Choose a provider</p>
            </div>
            <button onClick={signInWithGithub} className="menu-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            <button onClick={signInWithGoogle} className="menu-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-1.95 5.4-7.84 5.4-5.05 0-9.17-4.18-9.17-9.32s4.12-9.32 9.17-9.32c2.87 0 4.8 1.22 5.9 2.27l2.58-2.49C19.14 1.89 16.14 0 12.48 0 5.58 0 0 5.58 0 12.5s5.58 12.5 12.48 12.5c7.21 0 12-5.07 12-12.21 0-.82-.09-1.45-.19-2.07h-11.81z"/>
              </svg>
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};
