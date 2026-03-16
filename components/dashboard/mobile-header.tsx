'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export function MobileHeader() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/" className="text-lg font-bold text-foreground">
          임장<span className="text-primary">연구소</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/logs/new"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            작성
          </Link>
          <button
            onClick={async () => { await signOut(); router.push('/'); }}
            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
