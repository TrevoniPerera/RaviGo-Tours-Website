import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates, formatDate } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/privacy`,
      languages: buildHreflangAlternates("/privacy", config.siteUrl),
    },
    robots: { index: false }, // privacy pages typically not indexed
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-900">{t("heading")}</h1>
      <p className="mt-2 text-sm text-stone-500">
        {t("lastUpdated", { date: formatDate("2025-01-01", locale) })}
      </p>
      <div className="prose prose-stone mt-8 max-w-none">
        <p>{t("content")}</p>
      </div>
    </main>
  );
}
