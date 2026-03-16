'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(() => {
        router.replace('/dashboard');
      });
    } else {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">로그인 처리 중...</p>
    </div>
  );
}
