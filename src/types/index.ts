// ============================================================
// RaviGo Tours — Shared TypeScript Types
// ============================================================

// ----------------------------------------------------------
// Site Configuration
// ----------------------------------------------------------
export interface SiteConfig {
  businessName: string;
  tagline: string;
  startYear: number; // ✅ 2005 — auto-computes "20+ years of experience"
  phone: string; // [PLACEHOLDER] e.g. "+94 XX XXX XXXX"
  whatsapp: string; // [PLACEHOLDER] international format, no spaces, no "+"
  email: string; // [PLACEHOLDER] e.g. "info@ravigo.lk"
  address: string; // [PLACEHOLDER]
  timezone: string; // "Asia/Colombo"
  googleMapsEmbedUrl?: string; // [PLACEHOLDER]
  siteUrl: string; // production URL e.g. "https://ravigo.lk"
  socials: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tripadvisor?: string;
  };
  locales: readonly ["en", "de", "fr", "ja", "it"];
  defaultLocale: "en";
}

// ----------------------------------------------------------
// Place / Destination
// ----------------------------------------------------------
export type Region =
  | "Cultural Triangle"
  | "Hill Country"
  | "South Coast"
  | "Wildlife"
  | "Ancient Cities"
  | "East Coast";

export type Season = "Jan–Mar" | "Apr–Jun" | "Jul–Sep" | "Oct–Dec";

export interface Place {
  id: string; // URL slug e.g. "sigiriya"
  region: Region;
  featured: boolean; // featured cards span 2 columns in grid
  coordinates?: { lat: number; lng: number };
  heroImage: string; // path relative to /public e.g. "/images/destinations/sigiriya-hero.jpg"
  galleryImages: string[]; // 3–4 additional image paths
  bestSeasons: Season[];
  suggestedVisitHours: number;
  relatedPackageSlugs: string[];
  // ℹ️  All human-readable text (name, descriptions, season labels)
  //     lives in messages/*.json under the key "destinations.<id>.*"
}

// ----------------------------------------------------------
// Tour Package
// ----------------------------------------------------------
export type PriceModel =
  | { type: "from"; amountUSD: number }
  | { type: "on_request" };

export interface ItineraryDay {
  day: number;
  overnight: string; // city name (not translated — used as key)
  // Human-readable text lives in messages/*.json:
  //   packages.<id>.itinerary.day<N>.title
  //   packages.<id>.itinerary.day<N>.description
}

export interface TourPackage {
  id: string; // URL slug e.g. "cultural-triangle"
  durationDays: number;
  destinationSlugs: string[];
  heroImage: string;
  price: PriceModel;
  itinerary: ItineraryDay[];
  isCustom?: boolean; // marks the "Custom Island Tour" package
  // ℹ️  All human-readable text (title, tagline, highlights, included,
  //     excluded, itinerary descriptions) lives in messages/*.json
  //     under the key "packages.<id>.*"
}

// ----------------------------------------------------------
// Gallery
// ----------------------------------------------------------
export interface GalleryItem {
  id: string;
  src: string; // path relative to /public e.g. "/images/gallery/anna-cultural-001.jpg"
  /**
   * ⚠️  MUST be true before any image is published.
   * Written consent from the tourist is legally required.
   */
  consentObtained: boolean;
  consent?: boolean;
  consentDate?: string; // ISO 8601, e.g. "2024-06-15"
  photographer?: string; // optional photo credit
  // Caption text lives in messages/*.json under "gallery.<id>"
  captionKey: string; // e.g. "gallery.img-001" → "Anna, Germany – Cultural Triangle"
}

// ----------------------------------------------------------
// Enquiry Form (React Hook Form + Zod)
// ----------------------------------------------------------
export interface EnquiryFormValues {
  name: string;
  email: string;
  preferredPackage?: string;
  travelDates?: string;
  groupSize?: number;
  message: string;
  honeypot?: string; // must be empty — bot trap
}
