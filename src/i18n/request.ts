import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "de" | "fr" | "ja" | "it")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[next-intl][${locale}] ${error.message}`);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const fullKey = [namespace, key].filter(Boolean).join(".");
      if (process.env.NODE_ENV !== "production") {
        console.error(
          `[next-intl][${locale}] Missing translation for "${fullKey}": ${error.message}`
        );
      }
      return `[MISSING: ${fullKey}]`;
    },
  };
});
