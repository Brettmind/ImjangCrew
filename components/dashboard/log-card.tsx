'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { DecisionBadge } from './decision-badge';
import { StarRating } from '@/components/ui/star-rating';
import type { ImjangLog } from '@/types/inspection-log';

export function LogCard({ log }: { log: ImjangLog }) {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('imjang_media')
      .select('public_url')
      .eq('log_id', log.id)
      .eq('is_cover', true)
      .single()
      .then(({ data }) => { if (data) setCoverUrl((data as { public_url: string }).public_url); });
  }, [log.id]);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.15 }}
      onClick={() => router.push(`/dashboard/logs/${log.id}`)}
      className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* 커버 이미지 */}
      {coverUrl && (
        <div className="relative h-36 overflow-hidden">
          <Image
            src={coverUrl}
            alt={log.address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      <div className="p-5">
      {/* 상단: 결정 배지 + 날짜 */}
      <div className="flex items-start justify-between mb-3">
        <DecisionBadge decision={log.decision} />
        <span className="text-xs text-muted-foreground">
          {log.auction_date
            ? new Date(log.auction_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) + ' 경매'
            : log.created_at
              ? new Date(log.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
              : ''}
        </span>
      </div>

      {/* 주소 */}
      <h3 className="font-semibold text-foreground text-sm leading-tight mb-0.5 group-hover:text-primary transition-colors line-clamp-2">
        {log.address}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">{log.suburb} · {log.property_type}</p>

      {/* 매물 스펙 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
        {log.bedrooms != null && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
            </svg>
            {log.bedrooms}
          </span>
        )}
        {log.bathrooms != null && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 19h16M4 15h16M4 4h6v8H4V4z" />
            </svg>
            {log.bathrooms}
          </span>
        )}
        {log.car_spaces != null && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 17h8m-9-5h10l-1.5-5H5.5L4 12zm0 0H4m12 0h4" />
            </svg>
            {log.car_spaces}
          </span>
        )}
        {log.price_guide && (
          <span className="ml-auto font-medium text-foreground">{log.price_guide}</span>
        )}
      </div>

      {/* 평점 */}
      {log.overall_score && (
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">종합 평점</span>
          <StarRating value={log.overall_score} readonly size="sm" />
        </div>
      )}
      </div>
    </motion.div>
  );
}
