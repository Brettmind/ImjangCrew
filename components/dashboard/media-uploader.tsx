'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface UploadedMedia {
  id?: string;
  storage_path: string;
  public_url: string;
  file_name: string;
  file_type: string;
  is_cover: boolean;
  display_order: number;
  preview?: string; // local blob URL for preview
}

interface MediaUploaderProps {
  logId: string;
  existingMedia?: UploadedMedia[];
  onChange?: (media: UploadedMedia[]) => void;
}

export function MediaUploader({ logId, existingMedia = [], onChange }: MediaUploaderProps) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<UploadedMedia[]>(existingMedia);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const upload = async (files: FileList | File[]) => {
    if (!user) return;
    setUploading(true);
    const newMedia: UploadedMedia[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${logId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const preview = URL.createObjectURL(file);

      setProgress((p) => ({ ...p, [file.name]: 0 }));

      const { error } = await supabase.storage.from('imjang-media').upload(path, file, { upsert: true });
      if (error) { console.error(error); continue; }

      const { data: { publicUrl } } = supabase.storage.from('imjang-media').getPublicUrl(path);

      const item: UploadedMedia = {
        storage_path: path,
        public_url: publicUrl,
        file_name: file.name,
        file_type: file.type,
        is_cover: media.length === 0 && newMedia.length === 0,
        display_order: media.length + newMedia.length,
        preview,
      };

      // DB에 저장
      const { data } = await supabase.from('imjang_media').insert({
        log_id: logId,
        user_id: user.id,
        storage_path: path,
        public_url: publicUrl,
        file_name: file.name,
        file_type: file.type,
        is_cover: item.is_cover,
        display_order: item.display_order,
      }).select().single();

      if (data) item.id = (data as { id: string }).id;
      newMedia.push(item);
      setProgress((p) => ({ ...p, [file.name]: 100 }));
    }

    const updated = [...media, ...newMedia];
    setMedia(updated);
    onChange?.(updated);
    setUploading(false);
    setProgress({});
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    upload(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const setCover = async (index: number) => {
    const updated = media.map((m, i) => ({ ...m, is_cover: i === index }));
    setMedia(updated);
    onChange?.(updated);
    // DB 업데이트
    for (const [i, m] of updated.entries()) {
      if (m.id) await supabase.from('imjang_media').update({ is_cover: i === index }).eq('id', m.id);
    }
  };

  const removeMedia = async (index: number) => {
    const item = media[index];
    if (item.id) await supabase.from('imjang_media').delete().eq('id', item.id);
    await supabase.storage.from('imjang-media').remove([item.storage_path]);
    const updated = media.filter((_, i) => i !== index);
    // 커버가 없으면 첫 번째를 커버로
    if (updated.length > 0 && !updated.some((m) => m.is_cover)) updated[0].is_cover = true;
    setMedia(updated);
    onChange?.(updated);
  };

  return (
    <div>
      {/* 업로드 영역 */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          <p className="text-sm font-medium text-foreground">
            {uploading ? '업로드 중...' : '사진·동영상 업로드'}
          </p>
          <p className="text-xs text-muted-foreground">드래그 앤 드롭 또는 클릭 · 최대 50MB</p>
        </div>
      </div>

      {/* 미디어 그리드 */}
      <AnimatePresence>
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3"
          >
            {media.map((m, i) => (
              <motion.div
                key={m.storage_path}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group aspect-square rounded-xl overflow-hidden bg-muted"
              >
                {m.file_type.startsWith('video') ? (
                  <video src={m.preview ?? m.public_url} className="w-full h-full object-cover" muted />
                ) : (
                  <Image
                    src={m.preview ?? m.public_url}
                    alt={m.file_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}

                {/* 커버 배지 */}
                {m.is_cover && (
                  <div className="absolute top-1 left-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    대표
                  </div>
                )}

                {/* 오버레이 버튼 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                  {!m.is_cover && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCover(i); }}
                      className="bg-white text-foreground text-[10px] font-semibold px-2 py-1 rounded-lg"
                    >
                      대표
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeMedia(i); }}
                    className="bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-lg"
                  >
                    삭제
                  </button>
                </div>

                {/* 비디오 아이콘 */}
                {m.file_type.startsWith('video') && (
                  <div className="absolute bottom-1 right-1">
                    <svg className="w-4 h-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
