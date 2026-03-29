import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Babson Voice',
    short_name: 'Babson Voice',
    description: 'Anonymous campus feedback for Babson College students.',
    start_url: '/dashboard/',
    scope: '/',
    display: 'standalone',
    background_color: '#059669',
    theme_color: '#059669',
    orientation: 'portrait',
    categories: ['education', 'social'],
    icons: [
      {
        src: '/api/pwa-icon?size=192',
        sizes: '192x192',
        type: 'image/png',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — 'purpose' is valid in the Web App Manifest spec
        purpose: 'any',
      },
      {
        src: '/api/pwa-icon?size=512&maskable=1',
        sizes: '512x512',
        type: 'image/png',
        // @ts-ignore
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
