import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.destinations" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/destinations`,
      languages: buildHreflangAlternates("/destinations", config.siteUrl),
    },
  };
}

export default function DestinationsPage() {
  // TODO M3-14: DestinationGrid + DestinationCard components
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-900">Destinations</h1>
      <p className="mt-4 text-stone-500">Coming soon — DestinationGrid (M3-14)</p>
    </main>
  );
}
