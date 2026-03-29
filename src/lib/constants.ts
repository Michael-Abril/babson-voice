export const APP_NAME = 'Babson Voice';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Feed', icon: 'message-square', path: '/dashboard' },
  { label: 'Submit', icon: 'plus-circle', path: '/dashboard/submit' },
  { label: 'Activity', icon: 'activity', path: '/dashboard/activity' },
];

export const CATEGORY_OPTIONS = [
  { value: 'academics', label: 'Academics' },
  { value: 'campus-life', label: 'Campus Life' },
  { value: 'dining', label: 'Dining' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'clubs', label: 'Clubs' },
  { value: 'other', label: 'Other' },
] as const;

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  academics: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'campus-life': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  dining: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  facilities: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  clubs: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
  other: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' },
};
