'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface Comment {
  id: string;
  log_id: string;
  user_id: string;
  user_display_name: string | null;
  content: string;
  created_at: string;
}

export function CommentsSection({ logId }: { logId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('log_id', logId)
      .order('created_at', { ascending: true });
    setComments((data as Comment[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [logId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setSubmitting(true);
    await supabase.from('comments').insert({
      log_id: logId,
      user_id: user.id,
      user_display_name: user.user_metadata?.full_name ?? user.email,
      content: content.trim(),
    });
    setContent('');
    await load();
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('comments').delete().eq('id', id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        커뮤니티 댓글
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-1">
          {comments.length}
        </span>
      </h3>

      {/* 댓글 목록 */}
      {loading ? (
        <div className="space-y-3 mb-5">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-muted rounded w-24" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 mb-4">
          첫 번째 댓글을 남겨보세요 💬
        </p>
      ) : (
        <AnimatePresence initial={false}>
          <div className="space-y-4 mb-5">
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
                  {(c.user_display_name ?? 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {c.user_display_name ?? '익명'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {user?.id === c.user_id && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-foreground mt-0.5 whitespace-pre-wrap">{c.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* 댓글 입력 */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3 border-t border-border pt-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
            {((user.user_metadata?.full_name ?? user.email ?? 'U') as string)[0].toUpperCase()}
          </div>
          <div className="flex-1 flex gap-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="매물에 대한 의견을 남겨보세요..."
              rows={2}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 self-end"
            >
              {submitting ? '...' : '등록'}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-xs text-muted-foreground border-t border-border pt-4">
          댓글을 작성하려면 로그인이 필요합니다.
        </p>
      )}
    </div>
  );
}
