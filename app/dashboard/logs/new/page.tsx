'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogForm } from '@/components/dashboard/log-form';
import type { ImjangLog } from '@/types/inspection-log';

export default function NewLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const preData = (() => {
    try {
      const pre = searchParams.get('pre');
      return pre ? JSON.parse(decodeURIComponent(pre)) : undefined;
    } catch { return undefined; }
  })();

  const handleSuccess = (log: ImjangLog) => {
    router.push(`/dashboard/logs/${log.id}`);
  };

  return (
    <div>
      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/dashboard/logs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          임장로그 목록
        </Link>
        <h1 className="text-2xl font-bold text-foreground">새 임장로그</h1>
        <p className="text-sm text-muted-foreground mt-1">Brisbane 경매 매물의 임장 내용을 기록하세요.</p>
      </motion.div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <LogForm mode="create" initialData={preData} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
