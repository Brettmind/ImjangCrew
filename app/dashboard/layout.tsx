'use client';

import { AuthGuard } from '@/components/dashboard/auth-guard';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { MobileTabBar } from '@/components/dashboard/mobile-tab-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        <Sidebar />
        <MobileHeader />
        <main className="md:pl-60 pt-14 md:pt-0 pb-16 md:pb-0 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
        <MobileTabBar />
      </div>
    </AuthGuard>
  );
}
