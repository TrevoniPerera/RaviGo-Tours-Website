import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/about`,
      languages: buildHreflangAlternates("/about", config.siteUrl),
    },
  };
}

export default function AboutPage() {
  // TODO M3-31: TeamSection + CredibilityFacts components
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-900">About RaviGo Tours</h1>
      <p className="mt-4 text-stone-500">Coming soon — TeamSection (M3-31)</p>
    </main>
  );
}
