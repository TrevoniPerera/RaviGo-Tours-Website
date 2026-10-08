import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v3: validate the incoming locale
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "de" | "fr" | "ja" | "it")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
