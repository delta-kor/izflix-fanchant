// @ts-nocheck

export const GA_TRACKING_ID = 'G-4MZC04K9E5';

export default class Gtag {
  public static pageview(url: string): void {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }

  public static event({ action, category, label, value }): void {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
