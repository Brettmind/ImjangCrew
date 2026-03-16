'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

const links = [
  { label: '서비스', href: '#features' },
  { label: '이용방법', href: '#how' },
  { label: '후기', href: '#testimonials' },
  { label: '가격', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          임장<span className="text-primary">연구소</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {(user.displayName ?? user.email ?? '?')[0].toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.displayName ?? user.email}</span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-44 bg-card rounded-xl border border-border shadow-lg overflow-hidden"
                    >
                      <Link href="/dashboard" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                        대시보드
                      </Link>
                      <button
                        onClick={() => { signOut(); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        로그아웃
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  로그인
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="rounded-full px-5">무료 시작</Button>
                </Link>
              </>
            )
          )}
        </div>

        <button className="md:hidden p-2 text-muted-foreground" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground py-1" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              {user ? (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="mt-2 text-sm text-red-500 text-left"
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-muted-foreground py-1" onClick={() => setOpen(false)}>로그인</Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button size="sm" className="rounded-full w-full">무료 시작</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
