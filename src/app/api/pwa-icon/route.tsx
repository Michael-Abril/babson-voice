import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = Math.min(Math.max(parseInt(searchParams.get('size') ?? '192'), 32), 1024);
  const maskable = searchParams.get('maskable') === '1';
  // Maskable icons: no border radius, icon slightly smaller (safe zone = 80% of canvas)
  const radius = maskable ? 0 : Math.round(size * 0.2);
  const iconScale = maskable ? 0.5 : 0.65;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#059669',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: `${radius}px`,
        }}
      >
        <svg
          width={size * iconScale}
          height={size * iconScale}
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M10 18.5V13.5C10 12.4 10.9 11.5 12 11.5H14L18 8.5V23.5L14 20.5H12C10.9 20.5 10 19.6 10 18.5Z"
            fill="white"
          />
          <path
            d="M21 12.5C22.2 13.4 23 14.8 23 16.5C23 18.2 22.2 19.6 21 20.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M23 10C25 11.5 26 13.8 26 16.5C26 19.2 25 21.5 23 23"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
