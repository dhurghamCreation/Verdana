import type { CSSProperties } from 'react';

export type IconName =
  | 'bell' | 'book' | 'building' | 'chart' | 'city' | 'clipboard' | 'cloud'
  | 'dollar' | 'droplet' | 'flower' | 'globe' | 'handshake' | 'health'
  | 'landmark' | 'leaf' | 'lock' | 'mail' | 'map-pin' | 'package' | 'pot' | 'recycle'
  | 'return' | 'star' | 'star-filled' | 'star-empty' | 'store' | 'sun' | 'truck' | 'wave' | 'heart' | 'search' | 'shield' | 'check' | 'check-circle' | 'stethoscope' | 'phone' | 'tag'
  | 'paw' | 'alert-triangle' | 'sparkles' | 'printer' | 'times' | 'info' | 'clock' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down';

const paths: Record<IconName, string> = {
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01',
  leaf: 'M19 3C12 3 5 7 5 14c0 3 2 5 5 5 7 0 9-9 9-16ZM5 21c2-5 6-9 12-12',
  package: 'm4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10',
  star: 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'star-filled': 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'star-empty': 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  paw: 'M12 13c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V20h2v-1.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3zm-5.5-2C5.67 11 5 11.67 5 12.5S5.67 14 6.5 14 8 13.33 8 12.5 7.33 11 6.5 11zm11 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-8-4C8.67 7 8 7.67 8 8.5S8.67 10 9.5 10 11 9.33 11 8.5 10.33 7 9.5 7zm5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z',
  'alert-triangle': 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01',
  sparkles: 'm12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3ZM19 3v4m2-2h-4',
  printer: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2m-12 0v4h12v-4',
  times: 'M18 6 6 18M6 6l12 12',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v.01M12 12v5',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  'check-circle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  'arrow-right': 'M5 12h14M12 5l7 7-7 7',
  'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
  'arrow-up': 'M12 19V5M5 12l7-7 7 7',
  'arrow-down': 'M12 5v14M19 12l-7 7-7-7',
  sun: 'M12 4V2m0 20v-2M4 12H2m20 0h-2m-2.3-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
  droplet: 'M12 3S6 10 6 15a6 6 0 0 0 12 0c0-5-6-12-6-12Z',
  pot: 'M6 10h12l-1 10H7L6 10Zm-2-3h16v3H4V7Zm8 0c0-3 2-5 5-5-1 3-2 5-5 5Zm0 0c0-3-2-4-5-4 1 3 2 4 5 4Z',
  cloud: 'M6 18h12a4 4 0 0 0 .4-8A6 6 0 0 0 7 8.5 4.8 4.8 0 0 0 6 18Z',
  recycle: 'm8 5 2-3 2 3M10 2a8 8 0 0 1 7 4m1 5 3 1-2 2m2-2a8 8 0 0 1-3 7m-5 1-1 3-2-3m2 3a8 8 0 0 1-7-4M4 14l-3-1 2-2m-2 2a8 8 0 0 1 3-7',
  handshake: 'm8 12 3 3c1 1 2 1 3 0l5-5M3 8l5-3 4 2 4-2 5 3-3 9-4 3-6-5-5-7Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c3-3 4-6 4-9s-1-6-4-9m0 18c-3-3-4-6-4-9s1-6 4-9M3 12h18',
  building: 'M5 21V4h10v17M9 8h2m-2 4h2m-2 4h2m6 5V9h3v12M3 21h19',
  health: 'M12 21S4 16 4 9a4 4 0 0 1 7-3l1 1 1-1a4 4 0 0 1 7 3c0 7-8 12-8 12Zm0-10v6m-3-3h6',
  book: 'M4 5a4 4 0 0 1 4-2h4v17H8a4 4 0 0 0-4 2V5Zm16 0a4 4 0 0 0-4-2h-4v17h4a4 4 0 0 1 4 2V5Z',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  'map-pin': 'M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  dollar: 'M16 7c-1-1-2-2-4-2-3 0-5 1-5 3s2 3 5 4 5 2 5 4-2 3-5 3c-2 0-4-1-5-2m5-16v20',
  truck: 'M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  store: 'M4 10v11h16V10M3 4h18l-2 6H5L3 4Zm6 17v-6h6v6',
  lock: 'M6 10h12v11H6V10Zm3 0V7a3 3 0 0 1 6 0v3',
  mail: 'M3 5h18v14H3V5Zm0 2 9 7 9-7',
  clipboard: 'M8 5H6v16h12V5h-2M9 3h6v4H9V3Zm1 9h4m-4 4h4',
  return: 'm9 7-5 5 5 5m-5-5h10a6 6 0 0 1 6 6',
  flower: 'M12 12c-5-1-6-5-3-7 2-1 3 1 3 3 0-2 1-4 3-3 3 2 2 6-3 7 5 1 6 5 3 7-2 1-3-1-3-3 0 2-1 4-3 3-3-2-2-6 3-7Z',
  wave: 'M3 8c3-3 6 3 9 0s6 3 9 0M3 14c3-3 6 3 9 0s6 3 9 0',
  landmark: 'm3 9 9-6 9 6H3Zm2 3v7m4-7v7m6-7v7m4-7v7M3 21h18',
  city: 'M4 21V7h7v14m0-10h9v10M7 10h1m-1 4h1m-1 4h1m7-4h1m-1 4h1M2 21h20',
  bell: 'M6 17h12l-2-3V9a4 4 0 0 0-8 0v5l-2 3Zm4 3h4',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  check: 'M20 6L9 17l-5-5',
  stethoscope: 'M4.5 3v5a3.5 3.5 0 0 0 7 0V3M18 15a4 4 0 1 1-8 0v-4m8 4v3a3 3 0 0 1-6 0',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
};

export default function Icon({
  name,
  size = 20,
  fill,
  stroke,
  style,
  className,
}: {
  name: IconName;
  size?: number;
  fill?: string;
  stroke?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const isFilledStar = name === 'star-filled';
  const resolvedFill = fill !== undefined ? fill : (isFilledStar ? 'currentColor' : 'none');
  const resolvedStroke = stroke !== undefined ? stroke : 'currentColor';

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={resolvedFill}
      stroke={resolvedStroke}
      strokeWidth={isFilledStar ? '1' : '1.8'}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={paths[name] || paths.leaf} />
    </svg>
  );
}
