import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.packages" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/packages`,
      languages: buildHreflangAlternates("/packages", config.siteUrl),
    },
  };
}

export default function PackagesPage() {
  // TODO M3-20: PackageGrid + PackageCard components
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-900">Tour Packages</h1>
      <p className="mt-4 text-stone-500">Coming soon — PackageGrid (M3-20)</p>
    </main>
  );
}
