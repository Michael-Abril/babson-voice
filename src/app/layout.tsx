import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Build Babson Better',
  description: 'An anonymous platform for Babson students to share ideas, vote on campus improvements, and volunteer to make them happen.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://babson-voice.vercel.app'),
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Build Babson Better',
  },
  openGraph: {
    title: 'Build Babson Better',
    description: 'An anonymous platform for Babson students to share ideas, vote on campus improvements, and volunteer to make them happen.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Build Babson Better',
    description: 'An anonymous platform for Babson students to share ideas, vote on campus improvements, and volunteer to make them happen.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
