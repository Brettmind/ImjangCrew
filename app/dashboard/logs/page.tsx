'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getLogs } from '@/lib/inspection-logs';
import { LogCard } from '@/components/dashboard/log-card';
import { cn } from '@/lib/utils';
import type { ImjangLog, LogFilter } from '@/types/inspection-log';

const filters: { value: LogFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'buy', label: '매수' },
  { value: 'watch', label: '관망' },
  { value: 'pass', label: '패스' },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<ImjangLog[]>([]);
  const [filter, setFilter] = useState<LogFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLogs(filter).then(({ data }) => {
      setLogs(data ?? []);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div>
      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">임장로그</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Brisbane 경매 매물 임장 기록</p>
        </div>
        <Link
          href="/dashboard/logs/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 임장로그
        </Link>
      </motion.div>

      {/* 필터 */}
      <div className="flex gap-2 mb-6">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === value
                ? 'bg-primary text-white border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 목록 */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 h-44 animate-pulse">
              <div className="h-3 bg-muted rounded w-16 mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : logs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center bg-card border border-border rounded-2xl py-20 text-center"
        >
          <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-foreground font-semibold mb-1">
            {filter === 'all' ? '임장로그가 없습니다' : `${filters.find(f => f.value === filter)?.label} 항목이 없습니다`}
          </p>
          <p className="text-sm text-muted-foreground mb-5">새 임장 매물을 기록해보세요.</p>
          <Link
            href="/dashboard/logs/new"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            임장로그 작성
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: i * 0.04 }}
              >
                <LogCard log={log} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
