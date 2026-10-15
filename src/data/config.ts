import type { SiteConfig } from "@/types";

/**
 * RaviGo Tours - Core Site Configuration
 * All contact details, start year, and social links are consolidated here.
 * Replace items marked with "TODO" as real data becomes available.
 */
const config: SiteConfig = {
  businessName: "RaviGo Tours",
  tagline: "Sri Lanka Designed Around You",

  // TODO: Start year for guide experience (2005 = 20+ years of experience)
  startYear: 2005,

  // TODO: Primary phone number for direct calls
  phone: "+94777624662",

  // TODO: WhatsApp number in international format without leading '+' (for wa.me links)
  whatsapp: "94777624662",

  // TODO: Primary customer contact email
  email: "ravindraweerasekara75@gmail.com",

  // TODO: Physical location / base of operations
  address: "Hikkaduwa, Sri Lanka",

  // Local timezone
  timezone: "Asia/Colombo", // UTC+5:30 - Sri Lanka Standard Time

  // TODO: Google Maps Embed URL (leave undefined or provide embed URL if desired)
  googleMapsEmbedUrl: undefined,

  // Canonical production URL
  siteUrl: "https://ravigo.lk",

  // TODO: Social media links (replace undefined with official profiles when created)
  socials: {
    facebook: undefined, // TODO: e.g. "https://facebook.com/ravigotours"
    instagram: undefined, // TODO: e.g. "https://instagram.com/ravigotours"
    youtube: undefined, // TODO: e.g. "https://youtube.com/@ravigotours"
    tripadvisor: undefined, // TODO: e.g. "https://tripadvisor.com/..."
  },

  locales: ["en", "de", "fr", "ja", "it"],
  defaultLocale: "en",

  // Airport transfer service claims (only confirmed items are displayed on live site)
  airportTransfer: {
    privateAcVehicle: true, // Confirmed
    airportPickupDrop: true, // Confirmed
    // TODO: Client to confirm before displaying flight tracking & meet and greet on live site:
    flightTracking: false,
    meetAndGreet: false,
    transferPricingPlaceholder: "[TODO: Transfer pricing placeholder - custom quote per route]",
  },
};

export default config;

/**
 * Computes years of experience from startYear to the current year.
 * Returns "20+" style string when value exceeds a decade.
 */
export function computeYearsOfExperience(startYear: number): string {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  return years >= 20 ? `${Math.floor(years / 5) * 5}+` : `${Math.max(1, years)}+`;
}
