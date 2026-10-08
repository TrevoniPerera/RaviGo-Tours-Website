import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind class names safely (shadcn/ui convention) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string in a locale-aware way.
 * Uses Intl.DateTimeFormat — no library needed.
 */
export function formatDate(
  isoDate: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(isoDate));
}

/**
 * Formats a number in a locale-aware way.
 */
export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Formats a USD price with the correct locale representation.
 */
export function formatUSD(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Returns the current Sri Lanka Standard Time as a formatted string.
 * Always shows UTC+5:30 for the Contact page timezone display.
 */
export function getSLSTTime(locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Colombo",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

/**
 * Generates hreflang alternate URLs for SEO.
 * @param pathname - the path without locale prefix e.g. "/destinations/sigiriya"
 * @param siteUrl - production site URL e.g. "https://ravigo.lk"
 */
export function buildHreflangAlternates(
  pathname: string,
  siteUrl: string,
): Record<string, string> {
  const locales = ["en", "de", "fr", "ja", "it"] as const;
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = `${siteUrl}/${locale}${pathname}`;
  }
  alternates["x-default"] = `${siteUrl}/en${pathname}`;
  return alternates;
}
