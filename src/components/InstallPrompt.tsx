'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  // deferredPrompt is for Android/Chrome install API
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Don't show if already installed (running in standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Don't show if dismissed before
    if (localStorage.getItem('bv-install-dismissed')) return;

    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua);
    setIsIOS(ios);

    if (ios) {
      // iOS Safari: show manual instructions banner
      setShow(true);
    } else {
      // Android Chrome: listen for the beforeinstallprompt event
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShow(true);
      };
      window.addEventListener('beforeinstallprompt', handler as any);
      return () => window.removeEventListener('beforeinstallprompt', handler as any);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('bv-install-dismissed', '1');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="bg-[#0f1f1a] text-white rounded-2xl shadow-2xl px-4 py-3 flex items-start gap-3 max-w-sm w-full pointer-events-auto animate-slide-up">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 8.5V5.5C2 4.95 2.45 4.5 3 4.5H4.5L7 2.5V11.5L4.5 9.5H3C2.45 9.5 2 9.05 2 8.5Z" fill="white"/>
            <path d="M9 5C9.8 5.5 10.3 6.3 10.3 7.2C10.3 8.1 9.8 8.9 9 9.4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-tight">Add Babson Voice to your Home Screen</p>
          {isIOS ? (
            <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
              Tap the <strong className="text-white/80">Share</strong> button below, then <strong className="text-white/80">&ldquo;Add to Home Screen&rdquo;</strong>
            </p>
          ) : (
            <button
              onClick={handleInstall}
              className="mt-1.5 flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded-lg transition-colors"
            >
              <Download className="h-3 w-3" /> Install app
            </button>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors mt-0.5"
        >
          <X className="h-4 w-4 text-white/60" />
        </button>
      </div>
    </div>
  );
}
