import config from "@/data/config";

/**
 * Builds a WhatsApp deep-link with a pre-filled message in the active locale.
 *
 * @param message  - The pre-translated message string (from messages/<locale>.json → contact.whatsappMessage)
 * @param packageTitle - Optional package name to append to the message
 * @returns  wa.me URL ready for use in <a href>
 */
export function buildWALink(message: string, packageTitle?: string): string {
  const suffix = packageTitle ? ` (${packageTitle})` : "";
  const text = encodeURIComponent(message + suffix);
  // Strip any leading "+" from the number — wa.me expects plain digits
  const number = config.whatsapp.replace(/^\+/, "");
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Builds a tel: link from the configured phone number.
 */
export function buildTelLink(): string {
  return `tel:${config.phone.replace(/\s/g, "")}`;
}

/**
 * Builds a mailto: link.
 * @param subject - Optional pre-filled subject line
 */
export function buildMailtoLink(subject?: string): string {
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${config.email}${s}`;
}
