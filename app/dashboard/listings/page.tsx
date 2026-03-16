'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Listing } from '@/app/api/listings/route';

function encodeLogDefaults(l: Listing) {
  return encodeURIComponent(JSON.stringify({
    address: l.address,
    suburb: l.suburb,
    property_type: l.propertyType,
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    car_spaces: l.carSpaces,
    price_guide: l.priceGuide,
    auction_date: l.auctionDate,
    agent_name: l.agentName,
    agency_name: l.agencyName,
    listing_url: l.listingUrl,
  }));
}

function PropertyTypeIcon({ type }: { type: string }) {
  return (
    <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
      {type}
    </span>
  );
}

function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const photo = listing.photos[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* 사진 */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {photo && !imgError ? (
          <Image
            src={photo}
            alt={listing.address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <svg className="w-12 h-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
        {/* 경매 배지 */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
            🔨 경매
          </span>
        </div>
        {listing.photos.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            +{listing.photos.length - 1}장
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1">
            {listing.address || '주소 정보 없음'}
          </h3>
          <PropertyTypeIcon type={listing.propertyType} />
        </div>
        <p className="text-xs text-muted-foreground mb-3">{listing.suburb}, {listing.state} {listing.postcode}</p>

        {/* 스펙 */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {listing.bedrooms != null && <span>🛏 {listing.bedrooms}</span>}
          {listing.bathrooms != null && <span>🚿 {listing.bathrooms}</span>}
          {listing.carSpaces != null && <span>🚗 {listing.carSpaces}</span>}
          {listing.landSize && <span>📐 {listing.landSize}</span>}
          {listing.priceGuide && (
            <span className="ml-auto font-semibold text-foreground">{listing.priceGuide}</span>
          )}
        </div>

        {/* 경매일 */}
        {listing.auctionDate && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium bg-amber-50 px-2.5 py-1.5 rounded-lg mb-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            경매 {new Date(listing.auctionDate + 'T00:00:00').toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
            {listing.auctionTime && ` ${listing.auctionTime}`}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/logs/new?pre=${encodeLogDefaults(listing)}`)}
            className="flex-1 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            임장로그 작성
          </button>
          <a
            href={listing.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border border-border text-xs font-medium text-muted-foreground rounded-xl hover:text-foreground hover:border-primary/50 transition-colors"
          >
            원문 ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'live' | 'unavailable' | 'error' | null>(null);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.json())
      .then(({ listings, source }) => {
        setListings(listings);
        setSource(source);
        setLoading(false);
      })
      .catch(() => { setSource('error'); setLoading(false); });
  }, []);

  return (
    <div>
      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">이주의 Brisbane 경매</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              realestate.com.au 실시간 경매 매물
            </p>
          </div>
          <a
            href="https://www.realestate.com.au/auction/brisbane/list-1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            realestate.com.au
          </a>
        </div>
      </motion.div>

      {/* 상태 배너 */}
      <AnimatePresence>
        {!loading && source !== 'live' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5"
          >
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">실시간 데이터 연결 불가</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  realestate.com.au가 자동 접근을 차단하고 있어요.{' '}
                  <a href="https://www.realestate.com.au/auction/brisbane/list-1" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    직접 방문해서 매물을 확인하고
                  </a>
                  {' '}아래 "임장로그 직접 작성"으로 기록하세요.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-8 bg-muted rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
        </div>
      ) : (
        /* 폴백 UI */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏠</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Brisbane 이주의 경매 매물</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              아래 버튼으로 realestate.com.au에서 매물을 확인한 뒤, 직접 임장로그를 작성하세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.realestate.com.au/auction/brisbane/list-1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              realestate.com.au에서 매물 보기
            </a>
            <Link
              href="/dashboard/logs/new"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
            >
              임장로그 직접 작성
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
