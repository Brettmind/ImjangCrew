'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getLogById, deleteLog } from '@/lib/inspection-logs';
import { LogForm } from '@/components/dashboard/log-form';
import { DecisionBadge } from '@/components/dashboard/decision-badge';
import { StarRating } from '@/components/ui/star-rating';
import { CommentsSection } from '@/components/dashboard/comments-section';
import { MediaGallery } from '@/components/dashboard/media-gallery';
import { MediaUploader } from '@/components/dashboard/media-uploader';
import { supabase } from '@/lib/supabase';
import type { ImjangLog } from '@/types/inspection-log';

interface MediaItem {
  id: string;
  public_url: string;
  file_name: string;
  file_type: string;
  is_cover: boolean;
  display_order: number;
}

export default function LogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [log, setLog] = useState<ImjangLog | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    Promise.all([
      getLogById(id),
      supabase.from('imjang_media').select('*').eq('log_id', id).order('display_order'),
    ]).then(([logRes, mediaRes]) => {
      setLog(logRes.data);
      setMedia((mediaRes.data as MediaItem[]) ?? []);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteLog(id);
    router.push('/dashboard/logs');
  };

  const handleEditSuccess = (updated: ImjangLog) => {
    setLog(updated);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!log) {
    return (
      <div className="text-center py-32">
        <p className="text-muted-foreground mb-4">임장로그를 찾을 수 없습니다.</p>
        <Link href="/dashboard/logs" className="text-primary hover:underline text-sm">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-6 gap-4">
        <div>
          <Link href="/dashboard/logs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임장로그 목록
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">{log.address}</h1>
            <DecisionBadge decision={log.decision} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {log.suburb} · {log.property_type}
            {log.auction_date && ` · 경매 ${new Date(log.auction_date).toLocaleDateString('ko-KR')}`}
          </p>
        </div>
        {!isEditing && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              수정
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              삭제
            </button>
          </div>
        )}
      </motion.div>

      {isEditing ? (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-foreground">임장로그 수정</h2>
            <button onClick={() => setIsEditing(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              취소
            </button>
          </div>
          <LogForm mode="edit" initialData={log} onSuccess={handleEditSuccess} />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* 매물 정보 */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 pb-3 border-b border-border">매물 기본정보</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: '침실', value: log.bedrooms != null ? `${log.bedrooms}개` : '-' },
                { label: '욕실', value: log.bathrooms != null ? `${log.bathrooms}개` : '-' },
                { label: '주차', value: log.car_spaces != null ? `${log.car_spaces}대` : '-' },
                { label: '토지면적', value: log.land_size_sqm != null ? `${log.land_size_sqm}㎡` : '-' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {log.price_guide && <InfoRow label="가격 가이드" value={log.price_guide} />}
              {log.agent_name && <InfoRow label="에이전트" value={log.agent_name} />}
              {log.agency_name && <InfoRow label="부동산사" value={log.agency_name} />}
              {log.listing_url && (
                <InfoRow label="매물 링크" value={
                  <a href={log.listing_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block max-w-[200px]">
                    realestate.com.au ↗
                  </a>
                } />
              )}
            </div>
          </div>

          {/* 임장 평가 */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 pb-3 border-b border-border">임장 평가</h3>
            <div className="mb-5">
              <p className="text-xs text-muted-foreground mb-1.5">종합 평점</p>
              <StarRating value={log.overall_score} readonly />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: '위치', value: log.location_score },
                { label: '매물 상태', value: log.condition_score },
                { label: '투자 가치', value: log.investment_score },
              ].map(({ label, value }) => (
                <div key={label} className="border border-border rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-2">{label}</p>
                  <StarRating value={value} readonly size="sm" />
                </div>
              ))}
            </div>
            {(log.pros || log.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {log.pros && (
                  <div>
                    <p className="text-xs font-medium text-emerald-600 mb-2">장점</p>
                    <ul className="space-y-1">
                      {log.pros.split('\n').filter(Boolean).map((p, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">✓</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {log.cons && (
                  <div>
                    <p className="text-xs font-medium text-red-500 mb-2">단점</p>
                    <ul className="space-y-1">
                      {log.cons.split('\n').filter(Boolean).map((c, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-1.5">
                          <span className="text-red-400 mt-0.5">✗</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {(log.estimated_rent_pw || log.max_budget) && (
              <div className="grid grid-cols-2 gap-4 bg-muted/50 rounded-xl p-4">
                {log.estimated_rent_pw && (
                  <div>
                    <p className="text-xs text-muted-foreground">예상 임대료 (주)</p>
                    <p className="text-base font-bold text-foreground mt-0.5">
                      ${log.estimated_rent_pw.toLocaleString()}/wk
                    </p>
                  </div>
                )}
                {log.max_budget && (
                  <div>
                    <p className="text-xs text-muted-foreground">최대 구매 예산</p>
                    <p className="text-base font-bold text-foreground mt-0.5">
                      ${log.max_budget.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            )}
            {log.memo && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1.5">메모</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{log.memo}</p>
              </div>
            )}
          </div>

          {/* 미디어 갤러리 */}
          {media.length > 0 ? (
            <MediaGallery media={media} />
          ) : (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                미디어 업로드
              </h3>
              <MediaUploader logId={id} onChange={(updated) => {
                setMedia(updated.map((m) => ({
                  id: m.id ?? '',
                  public_url: m.public_url,
                  file_name: m.file_name,
                  file_type: m.file_type,
                  is_cover: m.is_cover,
                  display_order: m.display_order,
                })));
              }} />
            </div>
          )}

          {/* 댓글 */}
          <CommentsSection logId={id} />

          {/* 작성일 */}
          <p className="text-xs text-muted-foreground text-right px-1">
            작성: {new Date(log.created_at).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </motion.div>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="font-semibold text-foreground mb-2">임장로그 삭제</h3>
            <p className="text-sm text-muted-foreground mb-5">
              <span className="font-medium text-foreground">{log.address}</span>의 임장로그를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground flex-shrink-0 w-24">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
