import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";
import HeroSlideshow from "@/components/HeroSlideshow";
import DestinationsSection from "@/components/DestinationsSection";
import PackagesSection from "@/components/PackagesSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ContactCtaStrip from "@/components/ContactCtaStrip";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}`,
      languages: buildHreflangAlternates("", config.siteUrl),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
      url: `${config.siteUrl}/${locale}`,
      images: [
        {
          url: `${config.siteUrl}/images/og/placeholder-og.webp`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${config.siteUrl}/images/og/placeholder-og.webp`],
    },
  };
}

export default function HomePage() {
  return (
    <main id="main-content" className="w-full">
      {/* 1. Hero Slideshow with LCP priority, experience badge, and CTAs */}
      <HeroSlideshow />

      {/* 2. Destinations: Top 10 floating cards with modal dialog & related packages link */}
      <DestinationsSection />

      {/* 3. Packages: 6 packages, swipeable on mobile, highlights, collapsible details, WhatsApp link */}
      <PackagesSection />

      {/* 4. Gallery: 9 tourist moments with consent filtering & lightbox modal */}
      <GallerySection />

      {/* 5. About: Guide narrative, placeholder photo, languages spoken, credibility markers */}
      <AboutSection />

      {/* 6. Contact CTA Strip: Direct Phone, WhatsApp, Email, and link to Contact page */}
      <ContactCtaStrip />
    </main>
  );
}
