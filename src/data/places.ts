import type { Place } from "@/types";

/**
 * Top 10 destinations in Sri Lanka.
 * Stores slugs and translation keys only — all human-readable text
 * is resolved from messages/{locale}.json under "destinations.{id}.*"
 */
const places: Place[] = [
  {
    id: "sigiriya",
    region: "cultural-triangle",
    featured: true,
    coordinates: { lat: 7.9572, lng: 80.7602 },
    heroImage: "/images/destinations/Sigiriya.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "temple-of-the-tooth",
    region: "cultural-triangle",
    featured: false,
    coordinates: { lat: 7.2936, lng: 80.6413 },
    heroImage: "/images/destinations/Temple of the Tooth.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 2,
    relatedPackageSlugs: ["cultural-triangle", "hill-country-train"],
  },
  {
    id: "galle-fort",
    region: "south-coast",
    featured: true,
    coordinates: { lat: 6.0267, lng: 80.2169 },
    heroImage: "/images/destinations/Galle Fort.jpeg",
    bestSeasons: ["jan-mar"],
    suggestedVisitHours: 3,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "ella-nine-arches",
    region: "hill-country",
    featured: false,
    coordinates: { lat: 6.8667, lng: 81.0464 },
    heroImage: "/images/destinations/Ella & Nine Arches.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 3,
    relatedPackageSlugs: ["hill-country-train"],
  },
  {
    id: "yala-national-park",
    region: "wildlife",
    featured: true,
    coordinates: { lat: 6.3728, lng: 81.5197 },
    heroImage: "/images/destinations/Yala National Park.jpeg",
    bestSeasons: ["apr-jun", "jul-sep"],
    suggestedVisitHours: 6,
    relatedPackageSlugs: ["wildlife-safari"],
  },
  {
    id: "nuwara-eliya",
    region: "hill-country",
    featured: false,
    coordinates: { lat: 6.9497, lng: 80.7891 },
    heroImage: "/images/destinations/Nuwara Eliya.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["hill-country-train"],
  },
  {
    id: "mirissa",
    region: "south-coast",
    featured: false,
    coordinates: { lat: 5.9483, lng: 80.4716 },
    heroImage: "/images/destinations/Mirissa.jpeg",
    bestSeasons: ["jan-mar"],
    suggestedVisitHours: 5,
    relatedPackageSlugs: ["wildlife-safari"],
  },
  {
    id: "dambulla-cave-temple",
    region: "cultural-triangle",
    featured: false,
    coordinates: { lat: 7.8567, lng: 80.6488 },
    heroImage: "/images/destinations/Dambulla Cave Temple.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 2,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "anuradhapura",
    region: "ancient-cities",
    featured: false,
    coordinates: { lat: 8.3114, lng: 80.4037 },
    heroImage: "/images/destinations/Anuradhapura.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 5,
    relatedPackageSlugs: ["cultural-triangle"],
  },
  {
    id: "polonnaruwa",
    region: "ancient-cities",
    featured: false,
    coordinates: { lat: 7.9403, lng: 81.0188 },
    heroImage: "/images/destinations/Polonnaruwa.jpeg",
    bestSeasons: ["jan-mar", "jul-sep"],
    suggestedVisitHours: 4,
    relatedPackageSlugs: ["cultural-triangle"],
  },
];

export default places;

/** Featured places helper */
export const featuredPlaces = places.filter((p) => p.featured);

/** Lookup by slug/id helper */
export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}
