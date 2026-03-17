/**
 * Domain.com.au API v1 클라이언트
 * 공식 문서: https://developer.domain.com.au/docs/apis/pkg_agents_listings
 *
 * API 키 발급: https://developer.domain.com.au → 프로젝트 생성 → Client Credentials 복사
 * .env.local에 DOMAIN_API_KEY=your_key_here 추가
 */

const DOMAIN_BASE = 'https://api.domain.com.au/v1';

export interface DomainListing {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  carSpaces: number | null;
  landSize: string | null;
  priceGuide: string | null;
  auctionDate: string | null;    // YYYY-MM-DD
  auctionTime: string | null;    // HH:MM
  auctionLocation: string | null;
  agentName: string | null;
  agencyName: string | null;
  listingUrl: string;
  photos: string[];
}

/** 이번 주말 금~일 날짜 범위 반환 */
export function getWeekendRange(): { from: string; to: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon ... 5=Fri, 6=Sat

  let daysUntilFri: number;
  if (day === 0) daysUntilFri = -2;      // 일요일 → 이번 주말은 지난 금요일부터
  else if (day === 5) daysUntilFri = 0;  // 금요일
  else if (day === 6) daysUntilFri = -1; // 토요일 → 금요일은 어제
  else daysUntilFri = 5 - day;           // 월~목 → 다음 금요일

  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFri);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { from: fmt(friday), to: fmt(sunday) };
}

function parseListing(item: Record<string, unknown>): DomainListing {
  // Domain API 응답: item 자체가 listing 객체
  // propertyDetails 안에 주소/스펙 정보가 있음
  const pd = (item.propertyDetails ?? {}) as Record<string, unknown>;
  const auction = (item.auctionSchedule ?? {}) as Record<string, unknown>;
  const advertiser = (
    (item.advertiserIdentifiers ?? {}) as Record<string, unknown>
  );
  const media = (item.media ?? []) as Array<Record<string, unknown>>;

  const auctionDt = auction.auctionScheduleDateTime as string | undefined;
  let auctionDate: string | null = null;
  let auctionTime: string | null = null;
  if (auctionDt) {
    const d = new Date(auctionDt);
    auctionDate = d.toISOString().split('T')[0];
    auctionTime = d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  const photos = media
    .filter((m) => m.category === 'Image' || m.type === 'photo')
    .map((m) => (m.url ?? m.imageUrl ?? '') as string)
    .filter(Boolean)
    .slice(0, 5);

  const id = String(item.id ?? item.listingId ?? Math.random().toString(36));

  return {
    id,
    address: (pd.displayableAddress ?? pd.streetAddress ?? '') as string,
    suburb: (pd.suburb ?? '') as string,
    state: (pd.state ?? 'QLD') as string,
    postcode: (pd.postCode ?? pd.postcode ?? '') as string,
    propertyType: (pd.propertyType ?? 'House') as string,
    bedrooms: (pd.bedrooms ?? null) as number | null,
    bathrooms: (pd.bathrooms ?? null) as number | null,
    carSpaces: (pd.carspaces ?? pd.carSpaces ?? null) as number | null,
    landSize: pd.landArea ? `${pd.landArea}㎡` : null,
    priceGuide: (item.displayPrice ?? item.priceDetails ?? null) as string | null,
    auctionDate,
    auctionTime,
    auctionLocation: (auction.auctionLocation ?? null) as string | null,
    agentName: null,
    agencyName: (advertiser.agencyName ?? null) as string | null,
    listingUrl: `https://www.domain.com.au/${id}`,
    photos,
  };
}

export async function fetchWeekendAuctions(suburb = 'Brisbane', state = 'QLD'): Promise<DomainListing[]> {
  const apiKey = process.env.DOMAIN_API_KEY;
  if (!apiKey) throw new Error('DOMAIN_API_KEY is not set');

  const { from, to } = getWeekendRange();

  const body = {
    listingType: 'Sale',
    propertyTypes: ['House', 'Apartment', 'Townhouse', 'Villa', 'Duplex', 'Terrace'],
    saleMode: 'Auction',
    auction: {
      dateFrom: from,
      dateTo: to,
    },
    locations: [
      {
        state,
        suburb,
        postCode: '',
        includeSurroundingSuburbs: true,
      },
    ],
    pageSize: 100,
    page: 1,
    sort: {
      sortKey: 'AuctionDate',
      direction: 'Ascending',
    },
  };

  const res = await fetch(`${DOMAIN_BASE}/listings/search`, {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Domain API ${res.status}: ${text}`);
  }

  const data = (await res.json()) as Array<Record<string, unknown>>;

  return data
    .map((item) => {
      // Domain API 응답은 { type, listing } 또는 직접 listing 객체 형태
      const listing = (item.listing ?? item) as Record<string, unknown>;
      return parseListing(listing);
    })
    .filter((l) => l.auctionDate !== null);
}
