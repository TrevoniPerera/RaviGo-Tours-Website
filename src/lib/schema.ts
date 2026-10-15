import config from "@/data/config";

export type LocaleCode = "en" | "de" | "fr" | "ja" | "it";

/**
 * JSON-LD schema builder for the TravelAgency / LocalBusiness structured data.
 * Drop the output into a <script type="application/ld+json"> in every page layout.
 */
export function buildOrganizationSchema(locale: LocaleCode) {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: config.businessName,
    description:
      "Experienced Sri Lanka tour guide offering cultural, wildlife, and coastal tours.",
    url: `${config.siteUrl}/${locale}`,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      streetAddress: config.address,
    },
    inLanguage: locale,
    foundingDate: String(config.startYear),
    sameAs: [
      config.socials.facebook,
      config.socials.instagram,
      config.socials.youtube,
      config.socials.tripadvisor,
    ].filter(Boolean),
    openingHoursSpecification: [], // [PLACEHOLDER: add hours when confirmed]
  };
}

/**
 * JSON-LD schema for a TouristAttraction (destination detail page).
 */
export function buildTouristAttractionSchema({
  name,
  description,
  imageUrl,
  lat,
  lng,
  locale,
}: {
  name: string;
  description: string;
  imageUrl: string;
  lat?: number;
  lng?: number;
  locale: LocaleCode;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    image: `${config.siteUrl}${imageUrl}`,
    inLanguage: locale,
    ...(lat && lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: lat,
            longitude: lng,
          },
        }
      : {}),
  };
}

/**
 * JSON-LD schema for a TouristTrip (package detail page).
 */
export function buildTouristTripSchema({
  name,
  description,
  imageUrl,
  durationDays,
  locale,
}: {
  name: string;
  description: string;
  imageUrl: string;
  durationDays?: number;
  locale: LocaleCode;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    image: `${config.siteUrl}${imageUrl}`,
    touristType: "International",
    provider: {
      "@type": "TravelAgency",
      name: config.businessName,
      url: config.siteUrl,
    },
    ...(durationDays ? { duration: `P${durationDays}D` } : {}),
    inLanguage: locale,
  };
}
