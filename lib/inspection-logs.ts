import { supabase } from './supabase';
import type { ImjangLog, ImjangLogInsert, ImjangLogUpdate, LogFilter, DashboardStats } from '@/types/inspection-log';

type Result<T> = { data: T | null; error: string | null };

export async function getLogs(filter?: LogFilter): Promise<Result<ImjangLog[]>> {
  let query = supabase
    .from('imjang_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (filter && filter !== 'all') {
    query = query.eq('decision', filter);
  }

  const { data, error } = await query;
  return { data: data as ImjangLog[] | null, error: error?.message ?? null };
}

export async function getRecentLogs(limit = 5): Promise<Result<ImjangLog[]>> {
  const { data, error } = await supabase
    .from('imjang_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data as ImjangLog[] | null, error: error?.message ?? null };
}

export async function getLogById(id: string): Promise<Result<ImjangLog>> {
  const { data, error } = await supabase
    .from('imjang_logs')
    .select('*')
    .eq('id', id)
    .single();

  return { data: data as ImjangLog | null, error: error?.message ?? null };
}

export async function createLog(payload: ImjangLogInsert): Promise<Result<ImjangLog>> {
  const { data, error } = await supabase
    .from('imjang_logs')
    .insert(payload)
    .select()
    .single();

  return { data: data as ImjangLog | null, error: error?.message ?? null };
}

export async function updateLog(id: string, payload: ImjangLogUpdate): Promise<Result<ImjangLog>> {
  const { data, error } = await supabase
    .from('imjang_logs')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  return { data: data as ImjangLog | null, error: error?.message ?? null };
}

export async function deleteLog(id: string): Promise<Result<null>> {
  const { error } = await supabase
    .from('imjang_logs')
    .delete()
    .eq('id', id);

  return { data: null, error: error?.message ?? null };
}

export async function getDashboardStats(): Promise<Result<DashboardStats>> {
  const { data, error } = await supabase
    .from('imjang_logs')
    .select('decision');

  if (error) return { data: null, error: error.message };

  const logs = data ?? [];
  return {
    data: {
      total: logs.length,
      buy: logs.filter((l) => l.decision === 'buy').length,
      watch: logs.filter((l) => l.decision === 'watch').length,
      pass: logs.filter((l) => l.decision === 'pass').length,
    },
    error: null,
  };
}
