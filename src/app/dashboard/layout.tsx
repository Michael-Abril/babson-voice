'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { hardNavigate } from '@/lib/utils';
import { Rss, PlusCircle, Bell, User, LogOut } from 'lucide-react';

let PrivyProtectedRoute: any = null;
let PrivyStackComponent: any = null;
let usePrivyHook: any = null;

try {
  const uiKit = require('@varity-labs/ui-kit');
  PrivyProtectedRoute = uiKit.PrivyProtectedRoute;
  PrivyStackComponent = uiKit.PrivyStack;
  usePrivyHook = uiKit.usePrivy;
} catch {}

const NAV_ITEMS = [
  { label: 'Feed', icon: Rss, path: '/dashboard', mobileLabel: 'Feed' },
  { label: 'Submit', icon: PlusCircle, path: '/dashboard/submit', mobileLabel: 'Submit' },
  { label: 'Activity', icon: Bell, path: '/dashboard/activity', mobileLabel: 'Activity' },
];

function RedirectToLogin() {
  const router = useRouter();
  useEffect(() => { router.push('/login/'); }, [router]);
  return null;
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const privy = usePrivyHook ? usePrivyHook() : { user: null, logout: async () => {} };
  const { user, logout } = privy;
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);

  const userEmail = user?.email?.address || user?.google?.email || '';
  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    await logout();
    hardNavigate('/');
  };

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    active: item.path === '/dashboard'
      ? pathname === '/dashboard' || pathname === '/dashboard/'
      : pathname === item.path || pathname === item.path + '/' || pathname.startsWith(item.path + '/'),
  }));

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full h-[56px] z-50 bg-white/90 backdrop-blur-xl shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
                <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tighter text-emerald-800">Babson Voice</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 h-[56px]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path + '/'}
                className={`px-4 h-full flex items-center transition-colors text-sm ${
                  item.active
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'text-zinc-500 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700"
            >
              {initials}
            </button>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 top-10 z-50 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-2 animate-slide-up">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 truncate">{userEmail || 'Not signed in'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20 pb-24 md:pb-8 max-w-4xl mx-auto px-4">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white flex justify-around items-center px-4 z-50 border-t border-zinc-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path + '/'}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-transform active:translate-y-0.5 ${
              item.active
                ? 'text-emerald-700 bg-emerald-50/50'
                : 'text-zinc-500 hover:bg-zinc-50'
            }`}
          >
            <item.icon className="h-5 w-5" strokeWidth={item.active ? 2.5 : 1.75} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-0.5">{item.mobileLabel}</span>
          </Link>
        ))}
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 px-3 py-1 rounded-xl active:translate-y-0.5 transition-transform"
        >
          <User className="h-5 w-5" strokeWidth={1.75} />
          <span className="font-mono text-[10px] uppercase tracking-widest mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  if (!PrivyProtectedRoute || !PrivyStackComponent) {
    return <DashboardShell>{children}</DashboardShell>;
  }

  return (
    <PrivyStackComponent
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      thirdwebClientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      loginMethods={['email', 'google']}
      appearance={{ theme: 'light', accentColor: '#059669', logo: '/logo.svg' }}
    >
      <PrivyProtectedRoute fallback={<RedirectToLogin />}>
        <DashboardShell>{children}</DashboardShell>
      </PrivyProtectedRoute>
    </PrivyStackComponent>
  );
}
