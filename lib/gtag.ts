// @ts-nocheck

export const GA_TRACKING_ID = 'G-4MZC04K9E5';

export function isTrackable() {
  if (typeof window === 'undefined') return false;
  if (window.location.host !== 'fanchant.izflix.net') return false;
  return true;
}

export default class Gtag {
  public static pageview(url: string): void {
    if (!isTrackable()) return;
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }

  public static event({ action, category, label, value }): void {
    if (!isTrackable()) return;
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
