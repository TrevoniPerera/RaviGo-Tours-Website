import type { Place } from "@/types";

/**
 * Top 10 destinations for Sri Lanka.
 * Count is data-driven — add or remove items here to update the whole site.
 *
 * Human-readable content (name, descriptions, season labels) lives in:
 *   messages/*.json  →  destinations.<id>.*
 */
const destinations: Place[] = [
  {
    id: "sigiriya",
    region: "Cultural Triangle",
    featured: true, // spans 2 columns in grid
    coordinates: { lat: 7.9572, lng: 80.7602 },
    heroImage: "/images/destinations/sigiriya-hero.jpg",
    galleryImages: [
      "/images/destinations/sigiriya-01.jpg",
      "/images/destinations/sigiriya-02.jpg",
      "/images/destinations/sigiriya-03.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["cultural-triangle", "custom-island-tour"],
  },
  {
    id: "temple-of-the-tooth",
    region: "Cultural Triangle",
    featured: false,
    coordinates: { lat: 7.2936, lng: 80.6413 },
    heroImage: "/images/destinations/kandy-tooth-hero.jpg",
    galleryImages: [
      "/images/destinations/kandy-tooth-01.jpg",
      "/images/destinations/kandy-tooth-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 2,
    relatedPackageSlugs: ["cultural-triangle", "hill-country-train"],
  },
  {
    id: "galle-fort",
    region: "South Coast",
    featured: true,
    coordinates: { lat: 6.0267, lng: 80.2169 },
    heroImage: "/images/destinations/galle-fort-hero.jpg",
    galleryImages: [
      "/images/destinations/galle-fort-01.jpg",
      "/images/destinations/galle-fort-02.jpg",
      "/images/destinations/galle-fort-03.jpg",
    ],
    bestSeasons: ["Jan–Mar"],
    suggestedVisitHours: 3,
    relatedPackageSlugs: ["south-coast-galle", "custom-island-tour"],
  },
  {
    id: "ella-nine-arches",
    region: "Hill Country",
    featured: false,
    coordinates: { lat: 6.8667, lng: 81.0464 },
    heroImage: "/images/destinations/ella-hero.jpg",
    galleryImages: [
      "/images/destinations/ella-01.jpg",
      "/images/destinations/ella-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 3,
    relatedPackageSlugs: ["hill-country-train"],
  },
  {
    id: "yala-national-park",
    region: "Wildlife",
    featured: true,
    coordinates: { lat: 6.3728, lng: 81.5197 },
    heroImage: "/images/destinations/yala-hero.jpg",
    galleryImages: [
      "/images/destinations/yala-01.jpg",
      "/images/destinations/yala-02.jpg",
      "/images/destinations/yala-03.jpg",
    ],
    bestSeasons: ["Apr–Jun", "Jul–Sep"],
    suggestedVisitHours: 6,
    relatedPackageSlugs: ["wildlife-safari", "custom-island-tour"],
  },
  {
    id: "nuwara-eliya",
    region: "Hill Country",
    featured: false,
    coordinates: { lat: 6.9497, lng: 80.7891 },
    heroImage: "/images/destinations/nuwara-eliya-hero.jpg",
    galleryImages: [
      "/images/destinations/nuwara-eliya-01.jpg",
      "/images/destinations/nuwara-eliya-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["hill-country-train"],
  },
  {
    id: "mirissa",
    region: "South Coast",
    featured: false,
    coordinates: { lat: 5.9483, lng: 80.4716 },
    heroImage: "/images/destinations/mirissa-hero.jpg",
    galleryImages: [
      "/images/destinations/mirissa-01.jpg",
      "/images/destinations/mirissa-02.jpg",
    ],
    bestSeasons: ["Jan–Mar"],
    suggestedVisitHours: 5,
    relatedPackageSlugs: ["south-coast-galle"],
  },
  {
    id: "dambulla-cave-temple",
    region: "Cultural Triangle",
    featured: false,
    coordinates: { lat: 7.8567, lng: 80.6488 },
    heroImage: "/images/destinations/dambulla-hero.jpg",
    galleryImages: [
      "/images/destinations/dambulla-01.jpg",
      "/images/destinations/dambulla-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 2,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "anuradhapura",
    region: "Ancient Cities",
    featured: false,
    coordinates: { lat: 8.3114, lng: 80.4037 },
    heroImage: "/images/destinations/anuradhapura-hero.jpg",
    galleryImages: [
      "/images/destinations/anuradhapura-01.jpg",
      "/images/destinations/anuradhapura-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 5,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "polonnaruwa",
    region: "Ancient Cities",
    featured: false,
    coordinates: { lat: 7.9403, lng: 81.0188 },
    heroImage: "/images/destinations/polonnaruwa-hero.jpg",
    galleryImages: [
      "/images/destinations/polonnaruwa-01.jpg",
      "/images/destinations/polonnaruwa-02.jpg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["cultural-triangle"],
  },
];

export default destinations;

/** Helper: get featured destinations (for the larger card slots on Home) */
export const featuredDestinations = destinations.filter((d) => d.featured);

/** Helper: get a destination by slug */
export function getDestinationById(id: string): Place | undefined {
  return destinations.find((d) => d.id === id);
}
