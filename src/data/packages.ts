import type { TripIdea } from "@/types";

/**
 * Sample Journeys / Trip Ideas for RaviGo Tours Sri Lanka.
 * Tailor-made starting points — not fixed products.
 * Duration and route are completely flexible and customized around your schedule.
 * Every trip includes Airport Pickup & Drop in a private air-conditioned vehicle.
 * Human-readable text is retrieved from messages/{locale}.json under "packages.{id}.*"
 */
export const tripIdeas: TripIdea[] = [
  {
    id: "cultural-triangle",
    destinationSlugs: [
      "sigiriya",
      "dambulla-cave-temple",
      "anuradhapura",
      "polonnaruwa",
      "temple-of-the-tooth",
    ],
    heroImage: "/images/destinations/Sigiriya.jpeg",
  },
  {
    id: "hill-country-train",
    destinationSlugs: ["temple-of-the-tooth", "nuwara-eliya", "ella-nine-arches"],
    heroImage: "/images/destinations/Ella & Nine Arches.jpeg",
  },
  {
    id: "wildlife-safari",
    destinationSlugs: ["yala-national-park"],
    heroImage: "/images/destinations/Yala National Park.jpeg",
  },
];

export default tripIdeas;

/** Helper: get trip idea by slug */
export function getTripIdeaById(id: string): TripIdea | undefined {
  return tripIdeas.find((p) => p.id === id);
}

// Backward-compatibility aliases
export const packages = tripIdeas;
export const getPackageById = getTripIdeaById;
export const standardPackages = tripIdeas.filter((p) => !p.isCustom);
