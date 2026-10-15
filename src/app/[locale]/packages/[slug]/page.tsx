import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import packages, { getPackageById } from "@/data/packages";
import { buildHreflangAlternates, formatUSD } from "@/lib/utils";
import { buildTouristTripSchema } from "@/lib/schema";
import config from "@/data/config";
import type { Locale } from "@/i18n/routing";

import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    packages.map((p) => ({ locale, slug: p.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const pkg = getPackageById(slug);
  if (!pkg) return {};

  const t = await getTranslations({ locale, namespace: `packages.${slug}` });
  const tPkg = await getTranslations({ locale, namespace: "packages" });


  return {
    title: `${t("title")} — Tailor-Made Tour | RaviGo Tours`,
    description: t("tagline"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/packages/${slug}`,
      languages: buildHreflangAlternates(`/packages/${slug}`, config.siteUrl),
    },
    openGraph: {
      images: [{ url: `${config.siteUrl}${pkg.heroImage}` }],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const pkg = getPackageById(slug);
  if (!pkg) notFound();

  const t = await getTranslations({ locale, namespace: `packages.${slug}` });

  const schema = buildTouristTripSchema({
    name: t("title"),
    description: t("tagline"),
    imageUrl: pkg.heroImage,
    locale: locale as Locale,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main id="main-content">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-lg text-stone-600">{t("tagline")}</p>
          <p className="mt-4 font-semibold text-emerald-700">
            Tailor-made private journey with airport pickup and drop included
          </p>
        </div>
      </main>
    </>
  );
}
