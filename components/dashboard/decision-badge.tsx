import { cn } from '@/lib/utils';
import type { DecisionType } from '@/types/inspection-log';

const styles: Record<DecisionType, string> = {
  buy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  watch: 'bg-amber-100 text-amber-700 border-amber-200',
  pass: 'bg-red-100 text-red-600 border-red-200',
};

const labels: Record<DecisionType, string> = {
  buy: '매수',
  watch: '관망',
  pass: '패스',
};

export function DecisionBadge({ decision }: { decision: DecisionType | null }) {
  if (!decision) return null;
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', styles[decision])}>
      {labels[decision]}
    </span>
  );
}
