export interface HowItWorksStep {
  id: string;
  stepNumber: number;
  icon: "message-square" | "map" | "plane" | "smile";
}

export interface TourInterest {
  id: string;
  slug: string;
  titleKey: string;
  highlightsKey: string;
}

export interface AirportTransferDetails {
  titleKey: string;
  airportCode: string;
  badgeKey: string;
  descriptionKey: string;
  pointKeys: string[];
}

/**
 * 4-step "How It Works" workflow for tailor-made journeys (keys only)
 */
export const howItWorksSteps: HowItWorksStep[] = [
  { id: "tell-plans", stepNumber: 1, icon: "message-square" },
  { id: "design-route", stepNumber: 2, icon: "map" },
  { id: "airport-pickup", stepNumber: 3, icon: "plane" },
  { id: "enjoy-trip", stepNumber: 4, icon: "smile" },
];

/**
 * Core interest themes for bespoke itineraries (translation keys only)
 */
export const interestOptions: TourInterest[] = [
  {
    id: "cultural-triangle",
    slug: "cultural-triangle",
    titleKey: "packages.cultural-triangle.title",
    highlightsKey: "packages.cultural-triangle.highlights",
  },
  {
    id: "hill-country-train",
    slug: "hill-country-train",
    titleKey: "packages.hill-country-train.title",
    highlightsKey: "packages.hill-country-train.highlights",
  },
  {
    id: "wildlife-safari",
    slug: "wildlife-safari",
    titleKey: "packages.wildlife-safari.title",
    highlightsKey: "packages.wildlife-safari.highlights",
  },
];

/**
 * Airport Transfer Block (translation keys only)
 */
export const airportTransferBlock: AirportTransferDetails = {
  titleKey: "packages.airportBlock.heading",
  airportCode: "CMB",
  badgeKey: "packages.airportBadge",
  descriptionKey: "packages.airportBlock.description",
  pointKeys: [
    "packages.airportBlock.point1",
    "packages.airportBlock.point2",
    "packages.airportBlock.point3",
  ],
};

const tailorMadeData = {
  howItWorksSteps,
  interestOptions,
  airportTransferBlock,
};

export default tailorMadeData;
