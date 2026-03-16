export type DecisionType = 'buy' | 'watch' | 'pass';
export type PropertyType = 'House' | 'Unit' | 'Townhouse' | 'Duplex' | 'Villa' | 'Other';
export type LogFilter = 'all' | DecisionType;

export interface ImjangLog {
  id: string;
  user_id: string;
  // 매물 기본정보
  address: string;
  suburb: string;
  property_type: PropertyType;
  bedrooms: number | null;
  bathrooms: number | null;
  car_spaces: number | null;
  land_size_sqm: number | null;
  price_guide: string | null;
  auction_date: string | null;
  agent_name: string | null;
  agency_name: string | null;
  listing_url: string | null;
  // 임장 평가
  overall_score: number | null;
  location_score: number | null;
  condition_score: number | null;
  investment_score: number | null;
  pros: string | null;
  cons: string | null;
  estimated_rent_pw: number | null;
  max_budget: number | null;
  memo: string | null;
  // 최종 결정
  decision: DecisionType | null;
  // 메타
  created_at: string;
  updated_at: string;
}

export type ImjangLogInsert = Omit<ImjangLog, 'id' | 'created_at' | 'updated_at'>;
export type ImjangLogUpdate = Partial<Omit<ImjangLogInsert, 'user_id'>>;

export interface DashboardStats {
  total: number;
  buy: number;
  watch: number;
  pass: number;
}

export const PROPERTY_TYPES: PropertyType[] = ['House', 'Unit', 'Townhouse', 'Duplex', 'Villa', 'Other'];

export const DECISION_LABELS: Record<DecisionType, string> = {
  buy: '매수',
  watch: '관망',
  pass: '패스',
};
