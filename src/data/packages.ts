import type { TourPackage } from "@/types";

/**
 * Tour packages for RaviGo Tours Sri Lanka.
 * Uses real destination images representing the tours, falling back to /images/packages/placeholder-package.webp.
 * Human-readable text is retrieved from messages/{locale}.json under "packages.{id}.*"
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
    heroImage: "/images/destinations/Sigiriya.jpeg",
    price: { type: "on_request" }, // [TODO: Update when client sets fixed USD amount, e.g. { type: "from", amountUSD: 850 }]
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
    destinationSlugs: ["temple-of-the-tooth", "nuwara-eliya", "ella-nine-arches"],
    heroImage: "/images/destinations/Ella & Nine Arches.jpeg",
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
    heroImage: "/images/destinations/Yala National Park.jpeg",
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
    heroImage: "/images/destinations/Galle Fort.jpeg",
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
    destinationSlugs: ["dambulla-cave-temple"],
    heroImage: "/images/destinations/Dambulla Cave Temple.jpeg",
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
    durationDays: 14,
    destinationSlugs: ["sigiriya", "ella-nine-arches", "yala-national-park", "galle-fort"],
    heroImage: "/images/destinations/Mirissa.jpeg",
    price: { type: "on_request" },
    itinerary: [],
    isCustom: true,
  },
];

export default packages;

/** Helper: get package by slug */
export function getPackageById(id: string): TourPackage | undefined {
  return packages.find((p) => p.id === id);
}

/** Helper: get non-custom packages */
export const standardPackages = packages.filter((p) => !p.isCustom);
