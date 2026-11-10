import type { SiteConfig } from "@/types";

/**
 * RaviGo Tours - Core Site Configuration
 * All contact details and start year are consolidated here.
 * Human-readable text is stored in messages/{locale}.json.
 */
const config: SiteConfig = {
  businessName: "RaviGo Tours Sri Lanka",
  // TODO: Confirm spelling with client ("Ravidra" in About text vs "Ravindra" in email)
  founderName: "Ravidra",
  tagline: "footer.tagline",

  // Start year for guide experience (2005 = 20+ years of experience)
  startYear: 2005,

  // Primary phone number for direct calls
  phone: "+94777624662",

  // WhatsApp number in international format without leading '+'
  whatsapp: "94777624662",

  // Primary customer contact email
  email: "ravindraweerasekara75@gmail.com",

  // Physical location / base of operations
  address: "Hikkaduwa, Sri Lanka",

  // Local timezone
  timezone: "Asia/Colombo", // UTC+5:30 - Sri Lanka Standard Time

  googleMapsEmbedUrl: undefined,

  // TODO: client to confirm after the domain is registered
  siteUrl: "https://yourwebsite.com",

  // TODO: set the launch date
  privacyEffectiveDate: "TODO: set the launch date",

  // Hosting provider name
  hostName: "Vercel",

  locales: ["en", "de", "fr", "ja", "it"],
  defaultLocale: "en",

  // Airport transfer service claims (only confirmed items are displayed on live site)
  airportTransfer: {
    privateAcVehicle: true,
    airportPickupDrop: true,
    flightTracking: false,
    meetAndGreet: false,
    transferPricingPlaceholder: "packages.freeQuote",
  },
};

export default config;

/**
 * Computes rounded numeric years of experience (e.g. 20) for ICU placeholders.
 */
export function computeYearsNumber(startYear: number): number {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return years >= 20 ? Math.floor(years / 5) * 5 : Math.max(1, years);
}

/**
 * Computes years of experience from startYear to the current year.
 * Returns "20+" style string when value exceeds a decade.
 */
export function computeYearsOfExperience(startYear: number): string {
  return `${computeYearsNumber(startYear)}+`;
}
