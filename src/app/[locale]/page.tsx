import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

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
          url: `${config.siteUrl}/images/og/home-og.jpg`,
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
      images: [`${config.siteUrl}/images/og/home-og.jpg`],
    },
  };
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <main id="main-content">
      {/* Skip link target */}
      <h1 className="sr-only">{t("hero.headline")}</h1>

      {/* TODO M3-09: HeroSlideshow */}
      <section className="relative flex h-[90dvh] min-h-[560px] items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {/* TODO: ExperienceBadge component */}
            20+ Years of Experience
          </p>
          <h2 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {t("hero.headline")}
          </h2>
          <p className="mb-10 text-lg text-stone-200 sm:text-xl lg:text-2xl">
            {t("hero.subheadline")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#packages"
              className="rounded-full bg-amber-400 px-8 py-4 text-base font-bold text-stone-900 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#"
              className="rounded-full border-2 border-white/50 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* TODO M3-11: DestinationShowcase */}
      {/* TODO M3-17: Full home page assembly */}
    </main>
  );
}
