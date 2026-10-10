import type { Place } from "@/types";

/**
 * Top 10 destinations in Sri Lanka.
 * Images reference the real image files located in /public/images/destinations/
 * Human-readable text is retrieved from messages/{locale}.json under "destinations.{id}.*"
 */
const places: Place[] = [
  {
    id: "sigiriya",
    region: "Cultural Triangle",
    featured: true, // spans 2 columns on desktop
    coordinates: { lat: 7.9572, lng: 80.7602 },
    heroImage: "/images/destinations/Sigiriya.jpeg",
    galleryImages: [
      "/images/destinations/Sigiriya.jpeg",
      "/images/destinations/Dambulla Cave Temple.jpeg",
      "/images/destinations/Polonnaruwa.jpeg",
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
    heroImage: "/images/destinations/Temple of the Tooth.jpeg",
    galleryImages: [
      "/images/destinations/Temple of the Tooth.jpeg",
      "/images/destinations/Sigiriya.jpeg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 2,
    relatedPackageSlugs: ["cultural-triangle", "hill-country-train"],
  },
  {
    id: "galle-fort",
    region: "South Coast",
    featured: true, // spans 2 columns on desktop
    coordinates: { lat: 6.0267, lng: 80.2169 },
    heroImage: "/images/destinations/Galle Fort.jpeg",
    galleryImages: [
      "/images/destinations/Galle Fort.jpeg",
      "/images/destinations/Mirissa.jpeg",
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
    heroImage: "/images/destinations/Ella & Nine Arches.jpeg",
    galleryImages: [
      "/images/destinations/Ella & Nine Arches.jpeg",
      "/images/destinations/Nuwara Eliya.jpeg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
    suggestedVisitHours: 3,
    relatedPackageSlugs: ["hill-country-train"],
  },
  {
    id: "yala-national-park",
    region: "Wildlife",
    featured: true, // spans 2 columns on desktop
    coordinates: { lat: 6.3728, lng: 81.5197 },
    heroImage: "/images/destinations/Yala National Park.jpeg",
    galleryImages: [
      "/images/destinations/Yala National Park.jpeg",
      "/images/destinations/Ella & Nine Arches.jpeg",
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
    heroImage: "/images/destinations/Nuwara Eliya.jpeg",
    galleryImages: [
      "/images/destinations/Nuwara Eliya.jpeg",
      "/images/destinations/Ella & Nine Arches.jpeg",
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
    heroImage: "/images/destinations/Mirissa.jpeg",
    galleryImages: [
      "/images/destinations/Mirissa.jpeg",
      "/images/destinations/Galle Fort.jpeg",
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
    heroImage: "/images/destinations/Dambulla Cave Temple.jpeg",
    galleryImages: [
      "/images/destinations/Dambulla Cave Temple.jpeg",
      "/images/destinations/Sigiriya.jpeg",
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
    heroImage: "/images/destinations/Anuradhapura.jpeg",
    galleryImages: [
      "/images/destinations/Anuradhapura.jpeg",
      "/images/destinations/Polonnaruwa.jpeg",
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
    heroImage: "/images/destinations/Polonnaruwa.jpeg",
    galleryImages: [
      "/images/destinations/Polonnaruwa.jpeg",
      "/images/destinations/Anuradhapura.jpeg",
    ],
    bestSeasons: ["Jan–Mar", "Jul–Sep"],
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
