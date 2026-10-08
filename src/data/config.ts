import type { SiteConfig } from "@/types";

const config: SiteConfig = {
  businessName: "RaviGo Tours",
  tagline: "Sri Lanka Designed Around You",
  startYear: 2005, // ✅ CONFIRMED — auto-computes years of experience
  phone: "+94777624662",
  whatsapp: "94777624662", // no "+" — used in wa.me URL; formatted +94777624662 for display
  email: "ravindraweerasekara75@gmail.com",
  address: "Hikkaduwa, Sri Lanka",
  timezone: "Asia/Colombo", // UTC+5:30 — Sri Lanka Standard Time
  googleMapsEmbedUrl: undefined, // Explicitly omitted per client instruction
  siteUrl: "https://ravigo.lk",
  socials: {
    facebook: undefined,
    instagram: undefined,
    youtube: undefined,
    tripadvisor: undefined,
  },
  locales: ["en", "de", "fr", "ja", "it"],
  defaultLocale: "en",
};

export default config;

/**
 * Computes years of experience from the start year to the current year.
 * Returns "20+" style string when value exceeds a decade.
 * Called in ExperienceBadge component so it updates automatically each year.
 */
export function computeYearsOfExperience(startYear: number): string {
  const years = new Date().getFullYear() - startYear;
  return years >= 20 ? `${Math.floor(years / 5) * 5}+` : `${years}`;
}
