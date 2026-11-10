const ALLOWED_LOCALES = new Set(["en", "de", "fr", "ja", "it"]);

export interface WhatsAppHrefOptions {
  pkg?: string;
}

/**
 * Returns the internal WhatsApp redirect path for the given locale.
 * Never exposes the phone number or message text in any link.
 */
export function getWhatsAppHref(
  locale: string = "en",
  options?: WhatsAppHrefOptions
): string {
  const safeLocale = ALLOWED_LOCALES.has(locale) ? locale : "en";
  const pkgSlug = options?.pkg?.trim();

  if (pkgSlug) {
    return `/go/wa?lang=${safeLocale}&msg=package&pkg=${encodeURIComponent(pkgSlug)}`;
  }

  return `/go/wa?lang=${safeLocale}&msg=default`;
  
}
