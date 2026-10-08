import type { TourPackage } from "@/types";

/**
 * Tour packages for RaviGo Tours.
 * Human-readable content (title, tagline, highlights, included, excluded,
 * itinerary descriptions) lives in messages/*.json  →  packages.<id>.*
 */
const packages: TourPackage[] = [
  {
    id: "cultural-triangle",
    durationDays: 7,
    destinationSlugs: [
      "sigiriya",
      "dambulla-cave-temple",
      "anuradhapura",
      "polonnaruwa",
      "temple-of-the-tooth",
    ],
    heroImage: "/images/packages/cultural-triangle-hero.jpg",
    price: { type: "on_request" }, // [PLACEHOLDER: set amountUSD when price confirmed]
    itinerary: [
      { day: 1, overnight: "Colombo" },
      { day: 2, overnight: "Anuradhapura" },
      { day: 3, overnight: "Polonnaruwa" },
      { day: 4, overnight: "Sigiriya" },
      { day: 5, overnight: "Dambulla" },
      { day: 6, overnight: "Kandy" },
      { day: 7, overnight: "Colombo" },
    ],
  },
  {
    id: "hill-country-train",
    durationDays: 6,
    destinationSlugs: ["kandy", "nuwara-eliya", "ella-nine-arches"],
    heroImage: "/images/packages/hill-country-hero.jpg",
    price: { type: "on_request" },
    itinerary: [
      { day: 1, overnight: "Colombo" },
      { day: 2, overnight: "Kandy" },
      { day: 3, overnight: "Nuwara Eliya" },
      { day: 4, overnight: "Ella" },
      { day: 5, overnight: "Ella" },
      { day: 6, overnight: "Colombo" },
    ],
  },
  {
    id: "wildlife-safari",
    durationDays: 5,
    destinationSlugs: ["yala-national-park"],
    heroImage: "/images/packages/wildlife-safari-hero.jpg",
    price: { type: "on_request" },
    itinerary: [
      { day: 1, overnight: "Colombo" },
      { day: 2, overnight: "Tissamaharama" },
      { day: 3, overnight: "Tissamaharama" },
      { day: 4, overnight: "Tissamaharama" },
      { day: 5, overnight: "Colombo" },
    ],
  },
  {
    id: "south-coast-galle",
    durationDays: 6,
    destinationSlugs: ["galle-fort", "mirissa"],
    heroImage: "/images/packages/south-coast-hero.jpg",
    price: { type: "on_request" },
    itinerary: [
      { day: 1, overnight: "Colombo" },
      { day: 2, overnight: "Galle" },
      { day: 3, overnight: "Galle" },
      { day: 4, overnight: "Mirissa" },
      { day: 5, overnight: "Mirissa" },
      { day: 6, overnight: "Colombo" },
    ],
  },
  {
    id: "food-village-experience",
    durationDays: 5,
    destinationSlugs: [], // village stays — no fixed destination slug
    heroImage: "/images/packages/food-village-hero.jpg",
    price: { type: "on_request" },
    itinerary: [
      { day: 1, overnight: "Colombo" },
      { day: 2, overnight: "Village Homestay" },
      { day: 3, overnight: "Village Homestay" },
      { day: 4, overnight: "Kandy" },
      { day: 5, overnight: "Colombo" },
    ],
  },
  {
    id: "custom-island-tour",
    durationDays: 14, // typical — fully customisable
    destinationSlugs: [], // chosen by traveller
    heroImage: "/images/packages/custom-tour-hero.jpg",
    price: { type: "on_request" },
    itinerary: [], // itinerary is built together with the client
    isCustom: true,
  },
];

export default packages;

/** Helper: get a package by slug */
export function getPackageById(id: string): TourPackage | undefined {
  return packages.find((p) => p.id === id);
}

/** Helper: get all non-custom packages (for the standard listing page) */
export const standardPackages = packages.filter((p) => !p.isCustom);
