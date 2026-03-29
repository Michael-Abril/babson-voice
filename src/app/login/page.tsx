'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

let PrivyStackComponent: any = null;
let usePrivyHook: (() => { authenticated: boolean; ready: boolean; login: () => void }) | null = null;

try {
  const uiKit = require('@varity-labs/ui-kit');
  PrivyStackComponent = uiKit.PrivyStack;
  usePrivyHook = uiKit.usePrivy;
} catch {}

function LoginContent() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const privy = usePrivyHook ? usePrivyHook() : null;

  useEffect(() => {
    if (privy?.authenticated) {
      router.push('/dashboard/');
    }
  }, [privy?.authenticated, router]);

  const handleLogin = () => {
    if (privy?.login) {
      privy.login();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-[360px] bg-white rounded-md border border-gray-200 shadow-sm p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-[20px] font-semibold tracking-tight text-[#111827]">Sign in</h1>
        </div>

        <div className="space-y-4">
          <div className="pt-2">
            {privy ? (
              <button
                onClick={handleLogin}
                disabled={!privy.ready || privy.authenticated}
                className="flex w-full h-[44px] items-center justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-[13px] font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {!privy.ready
                  ? 'Loading...'
                  : privy.authenticated
                  ? 'Redirecting...'
                  : 'Continue'}
              </button>
            ) : (
              <div className="flex w-full h-[44px] items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-600" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <button
            onClick={handleLogin}
            className="font-medium text-[#111827] hover:underline"
          >
            Request access
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  if (PrivyStackComponent) {
    return (
      <PrivyStackComponent
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        thirdwebClientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        loginMethods={['email', 'google']}
        appearance={{ theme: 'light', accentColor: '#059669', logo: '/logo.svg' }}
      >
        <LoginContent />
      </PrivyStackComponent>
    );
  }

  return <LoginContent />;
}
