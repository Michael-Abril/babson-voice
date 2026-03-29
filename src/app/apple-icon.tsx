import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: '#059669',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '40px',
      }}
    >
      <svg
        width="110"
        height="110"
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
    </div>,
    { ...size },
  );
}
