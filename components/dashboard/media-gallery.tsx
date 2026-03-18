'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MediaItem {
  id: string;
  public_url: string;
  file_name: string;
  file_type: string;
  is_cover: boolean;
  display_order: number;
}

export function MediaGallery({ media }: { media: MediaItem[] }) {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (media.length === 0) return null;

  const sorted = [...media].sort((a, b) => {
    if (a.is_cover) return -1;
    if (b.is_cover) return 1;
    return a.display_order - b.display_order;
  });

  const cover = sorted[0];
  const rest = sorted.slice(1);

  const openLightbox = (item: MediaItem, index: number) => {
    setLightbox(item);
    setActiveIndex(index);
  };

  const navigate = (dir: 1 | -1) => {
    const next = (activeIndex + dir + sorted.length) % sorted.length;
    setActiveIndex(next);
    setLightbox(sorted[next]);
  };

  return (
    <>
      {/* 갤러리 레이아웃 */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-4 pb-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            미디어
          </h3>
          <span className="text-xs text-muted-foreground">{media.length}개</span>
        </div>

        <div className="p-4">
          {/* 커버 이미지 (크게) */}
          <div
            className="relative rounded-xl overflow-hidden cursor-pointer group mb-3"
            style={{ aspectRatio: '16/9' }}
            onClick={() => openLightbox(cover, 0)}
          >
            {cover.file_type.startsWith('video') ? (
              <video src={cover.public_url} className="w-full h-full object-cover" muted playsInline />
            ) : (
              <Image src={cover.public_url} alt={cover.file_name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
            <div className="absolute top-2 left-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">대표</span>
            </div>
            {cover.file_type.startsWith('video') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            )}
          </div>

          {/* 나머지 썸네일 */}
          {rest.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {rest.slice(0, 7).map((item, i) => {
                const isLast = i === 6 && rest.length > 7;
                return (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(item, i + 1)}
                  >
                    {item.file_type.startsWith('video') ? (
                      <video src={item.public_url} className="w-full h-full object-cover" muted />
                    ) : (
                      <Image src={item.public_url} alt={item.file_name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                    )}
                    {isLast && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">+{rest.length - 7}</span>
                      </div>
                    )}
                    {item.file_type.startsWith('video') && !isLast && (
                      <div className="absolute bottom-1 right-1">
                        <svg className="w-3.5 h-3.5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* 닫기 */}
            <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 이전/다음 */}
            {sorted.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                  className="absolute left-4 text-white/70 hover:text-white z-10 p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                  className="absolute right-16 text-white/70 hover:text-white z-10 p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* 미디어 */}
            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] w-full mx-8"
            >
              {lightbox.file_type.startsWith('video') ? (
                <video src={lightbox.public_url} controls className="w-full max-h-[80vh] rounded-xl" />
              ) : (
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image src={lightbox.public_url} alt={lightbox.file_name} fill className="object-contain rounded-xl" unoptimized />
                </div>
              )}
              <p className="text-white/50 text-xs text-center mt-3">{activeIndex + 1} / {sorted.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
