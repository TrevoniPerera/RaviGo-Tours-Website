import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import destinations, { getDestinationById } from "@/data/destinations";
import { buildHreflangAlternates } from "@/lib/utils";
import { buildTouristAttractionSchema } from "@/lib/schema";
import config from "@/data/config";
import type { Locale } from "@/i18n/routing";

import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    destinations.map((d) => ({ locale, slug: d.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = getDestinationById(slug);
  if (!place) return {};

  const t = await getTranslations({ locale, namespace: `destinations.${slug}` });

  return {
    title: `${t("name")} | RaviGo Tours Sri Lanka`,
    description: t("shortDescription"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/destinations/${slug}`,
      languages: buildHreflangAlternates(`/destinations/${slug}`, config.siteUrl),
    },
    openGraph: {
      images: [{ url: `${config.siteUrl}${place.heroImage}` }],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const place = getDestinationById(slug);
  if (!place) notFound();

  const t = await getTranslations({ locale, namespace: `destinations.${slug}` });
  const tCommon = await getTranslations({ locale, namespace: "destinations" });

  const schema = buildTouristAttractionSchema({
    name: t("name"),
    description: t("longDescription"),
    imageUrl: place.heroImage,
    lat: place.coordinates?.lat,
    lng: place.coordinates?.lng,
    locale: locale as Locale,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main id="main-content">
        {/* TODO M3-15: DestinationDetail component */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t("name")}</h1>
          <p className="mt-2 font-medium text-emerald-700">{t("region")}</p>
          <p className="mt-6 text-lg text-stone-700">{t("longDescription")}</p>
          <p className="mt-4 text-sm text-stone-500">
            {tCommon("bestSeason")}: {t("bestSeasonLabel")}
          </p>
          <p className="text-sm text-stone-500">
            {tCommon("suggestedTime")}: {tCommon("hours", { n: place.suggestedVisitHours })}
          </p>
        </div>
      </main>
    </>
  );
}
