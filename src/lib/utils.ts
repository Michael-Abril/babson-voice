export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeDate(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getAppBase(): string {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname;
  const routes = ['/login', '/dashboard/submit', '/dashboard/activity', '/dashboard'];
  for (const route of routes) {
    const idx = path.indexOf(route);
    if (idx === 0) return '';
    if (idx > 0) return path.substring(0, idx);
  }
  return path.replace(/\/+$/, '');
}

/** Full page reload -- only use for logout or external redirects */
export function hardNavigate(absolutePath: string): void {
  window.location.href = getAppBase() + absolutePath;
}
