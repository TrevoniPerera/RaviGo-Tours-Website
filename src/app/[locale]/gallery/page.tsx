import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.gallery" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/gallery`,
      languages: buildHreflangAlternates("/gallery", config.siteUrl),
    },
  };
}

export default function GalleryPage() {
  // TODO M3-28: GalleryGrid + Lightbox components
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-900">Gallery</h1>
      <p className="mt-4 text-stone-500">Coming soon — GalleryGrid with Lightbox (M3-28)</p>
    </main>
  );
}
