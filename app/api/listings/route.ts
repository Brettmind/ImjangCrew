import { NextResponse } from 'next/server';
import { fetchWeekendAuctions, type DomainListing } from '@/lib/domain';

export type Listing = DomainListing;

export async function GET() {
  try {
    const listings = await fetchWeekendAuctions('Brisbane', 'QLD');
    if (listings.length === 0) {
      return NextResponse.json({ listings: [], source: 'unavailable' });
    }
    return NextResponse.json({ listings, source: 'live' });
  } catch (err) {
    console.error('[listings] Domain API error:', err);
    return NextResponse.json({ listings: [], source: 'error' });
  }
}
