export interface HowItWorksStep {
  id: string;
  stepNumber: number;
  icon: "message-square" | "map" | "plane" | "smile";
}

export interface TourInterest {
  id: string;
  slug: string;
  recommendedDays: string;
  sampleHighlights: string[];
}

export interface AirportTransferDetails {
  title: string;
  airportName: string;
  airportCode: string;
  badgeText: string;
  description: string;
  vehicleOptions: Array<{
    type: string;
    capacity: string;
    luggage: string;
    description: string;
  }>;
  pricingPlaceholder: string;
  inclusions: string[];
  termsNote: string;
}

/**
 * 4-step "How It Works" workflow for tailor-made journeys
 */
export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "tell-plans",
    stepNumber: 1,
    icon: "message-square",
  },
  {
    id: "design-route",
    stepNumber: 2,
    icon: "map",
  },
  {
    id: "airport-pickup",
    stepNumber: 3,
    icon: "plane",
  },
  {
    id: "enjoy-trip",
    stepNumber: 4,
    icon: "smile",
  },
];

/**
 * 6 Core interest themes for bespoke itineraries
 */
export const interestOptions: TourInterest[] = [
  {
    id: "culture",
    slug: "culture",
    recommendedDays: "3–5 Days",
    sampleHighlights: ["Sigiriya", "Temple of the Tooth", "Dambulla", "Anuradhapura"],
  },
  {
    id: "wildlife",
    slug: "wildlife",
    recommendedDays: "2–4 Days",
    sampleHighlights: ["Yala Safari", "Leopards & Elephants", "Bird Watching", "Udawalawe"],
  },
  {
    id: "beaches",
    slug: "beaches",
    recommendedDays: "3–6 Days",
    sampleHighlights: ["Mirissa", "Galle Fort", "Whale Watching", "South Coast Surfing"],
  },
  {
    id: "hill-country",
    slug: "hill-country-trains",
    recommendedDays: "3–5 Days",
    sampleHighlights: ["Ella Nine Arches", "Scenic Blue Train", "Nuwara Eliya Tea Hills", "Waterfalls"],
  },
  {
    id: "food-village",
    slug: "food-village-life",
    recommendedDays: "2–4 Days",
    sampleHighlights: ["Authentic Home Cooking", "Spice Gardens", "Clay Pot Curries", "Local Markets"],
  },
  {
    id: "adventure",
    slug: "adventure",
    recommendedDays: "3–5 Days",
    sampleHighlights: ["River Rafting", "Trekking Little Adam's Peak", "Pidurangala Sunrise", "Rainforest Hikes"],
  },
];

/**
 * Airport Transfer Block
 * Prominently highlighting Airport pickup and drop included on every tour.
 * Placeholders use [TODO] so client can replace with exact rates/specs.
 */
export const airportTransferBlock: AirportTransferDetails = {
  title: "Airport pickup and drop on every tour",
  airportName: "Colombo Bandaranaike International Airport",
  airportCode: "CMB",
  badgeText: "Airport pickup and drop included",
  description:
    "Every RaviGo tailor-made journey includes hassle-free airport meet, greet, and transfers directly to your destination.",
  vehicleOptions: [
    {
      type: "[TODO: Vehicle Type 1 - e.g. Air-Conditioned Sedan / Car]",
      capacity: "[TODO: 1–3 passengers]",
      luggage: "[TODO: 2-3 standard suitcases]",
      description: "[TODO: Ideal for couples or solo travelers with luggage assistance]",
    },
    {
      type: "[TODO: Vehicle Type 2 - e.g. Luxury Mini-Van / KDH Van]",
      capacity: "[TODO: 4–8 passengers]",
      luggage: "[TODO: 5-8 standard suitcases]",
      description: "[TODO: Ideal for families or small groups with ample legroom]",
    },
    {
      type: "[TODO: Vehicle Type 3 - e.g. Executive Coach / Large Bus]",
      capacity: "[TODO: 9+ passengers / On Request]",
      luggage: "[TODO: Large dedicated luggage compartment]",
      description: "[TODO: Available upon request for tour groups and private delegations]",
    },
  ],
  pricingPlaceholder: "[TODO: Included in tour rate / Custom quote per itinerary]",
  inclusions: [
    "[TODO: In-terminal meet & greet with welcome name board]",
    "[TODO: Flight tracking for delays — no waiting surcharge]",
    "[TODO: Highway expressway toll fees included]",
    "[TODO: Complimentary bottled water & fresh cooling wipes]",
    "[TODO: Direct door-to-door transfer to your first hotel]",
  ],
  termsNote:
    "[TODO: Please verify vehicle models, passenger capacities, and flight arrival policy before publishing.]",
};

export default {
  howItWorksSteps,
  interestOptions,
  airportTransferBlock,
};
