import { NextResponse } from 'next/server';

export interface Listing {
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
  auctionDate: string | null;
  auctionTime: string | null;
  agentName: string | null;
  agencyName: string | null;
  listingUrl: string;
  photos: string[];
}

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-AU,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Referer': 'https://www.google.com/',
};

// realestate.com.au 내부 Search API
async function fetchFromSearchApi(): Promise<Listing[]> {
  const query = {
    channel: 'buy',
    localities: [{ searchLocation: 'Brisbane City, QLD 4000' }],
    filters: { saleMethod: 'auction' },
    pageSize: 20,
    sortType: 'auction-date-ascending',
  };

  const url = `https://services.realestate.com.au/services/listings/search?query=${encodeURIComponent(JSON.stringify(query))}`;
  const res = await fetch(url, { headers: HEADERS, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Search API ${res.status}`);

  const json = await res.json();
  const items = json?.tieredResults?.[0]?.results ?? json?.results ?? [];
  return items.map((item: Record<string, unknown>) => parseSearchResult(item));
}

function parseSearchResult(item: Record<string, unknown>): Listing {
  const listing = (item.listing ?? item) as Record<string, unknown>;
  const addr = (listing.address ?? {}) as Record<string, unknown>;
  const features = (listing.features ?? listing.landDetails ?? {}) as Record<string, unknown>;
  const media = (listing.media ?? listing.images ?? []) as Array<Record<string, unknown>>;
  const price = (listing.price ?? listing.priceDetails ?? {}) as Record<string, unknown>;
  const inspection = (listing.inspectionSchedule ?? {}) as Record<string, unknown>;
  const advertiser = (listing.advertiser ?? (listing.advertisers as Record<string, unknown>[])?.[0] ?? {}) as Record<string, unknown>;

  const photos = media
    .filter((m) => m.type === 'photo' || m.category === 'image' || m.url)
    .map((m) => (m.templatedUrl ?? m.url ?? '') as string)
    .filter(Boolean)
    .map((u: string) => u.replace('{size}', '800x600').replace('{ratio}', '4-3'))
    .slice(0, 5);

  const auctions = (inspection.upcoming ?? []) as Array<Record<string, unknown>>;
  const nextAuction = auctions.find((a) => a.type === 'auction') ?? auctions[0];

  return {
    id: (listing.id ?? listing.listingId ?? Math.random().toString(36)) as string,
    address: [addr.streetAddress, addr.displayAddress].find(Boolean) as string ?? '',
    suburb: (addr.suburb ?? addr.locality ?? '') as string,
    state: (addr.state ?? 'QLD') as string,
    postcode: (addr.postcode ?? '') as string,
    propertyType: (listing.propertyType ?? listing.channel ?? 'House') as string,
    bedrooms: (features.bedrooms ?? features.beds ?? null) as number | null,
    bathrooms: (features.bathrooms ?? features.baths ?? null) as number | null,
    carSpaces: (features.carSpaces ?? features.cars ?? null) as number | null,
    landSize: features.landArea ? `${features.landArea}㎡` : null,
    priceGuide: (price.display ?? price.displayPrice ?? null) as string | null,
    auctionDate: nextAuction?.startTime ? new Date(nextAuction.startTime as string).toISOString().split('T')[0] : null,
    auctionTime: nextAuction?.startTime ? new Date(nextAuction.startTime as string).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }) : null,
    agentName: (advertiser.name ?? null) as string | null,
    agencyName: (advertiser.name ?? null) as string | null,
    listingUrl: `https://www.realestate.com.au${listing.listingUrl ?? ''}`,
    photos,
  };
}

// __NEXT_DATA__ HTML 파싱 폴백
async function fetchFromHtml(): Promise<Listing[]> {
  const urls = [
    'https://www.realestate.com.au/auction/brisbane/list-1',
    'https://www.realestate.com.au/buy/auction-in-greater+brisbane,+qld/list-1',
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: HEADERS, next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const html = await res.text();

      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (!match) continue;

      const data = JSON.parse(match[1]);
      const results =
        data?.props?.pageProps?.listingsMap ??
        data?.props?.pageProps?.listings ??
        data?.props?.pageProps?.searchResults?.results ?? [];

      const items: Record<string, unknown>[] = Array.isArray(results) ? results : Object.values(results);
      if (items.length > 0) return items.map(parseSearchResult).slice(0, 20);
    } catch { continue; }
  }
  return [];
}

export async function GET() {
  try {
    let listings = await fetchFromSearchApi().catch(() => []);
    if (listings.length === 0) {
      listings = await fetchFromHtml().catch(() => []);
    }
    if (listings.length === 0) {
      return NextResponse.json({ listings: [], source: 'unavailable' });
    }
    return NextResponse.json({ listings, source: 'live' });
  } catch {
    return NextResponse.json({ listings: [], source: 'error' });
  }
}
