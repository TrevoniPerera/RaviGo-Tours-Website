import { defineRouting } from "next-intl/routing";

export const locales = ["en", "de", "fr", "ja", "it"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // Browser Accept-Language is used for initial detection.
  // NEXT_LOCALE cookie (set by LocaleSwitcher) overrides it on subsequent visits.
  localeDetection: true,
});
