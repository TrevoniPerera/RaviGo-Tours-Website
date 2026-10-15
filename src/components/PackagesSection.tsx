"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { tripIdeas } from "@/data/packages";
import config from "@/data/config";
import type { TripIdea } from "@/types";
import {
  Calendar,
  Clock,
  Compass,
  Plane,
  Car,
  Sparkles,
  MessageCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";

export default function PackagesSection() {
  const t = useTranslations();

  return (
    <section
      id="tailor-made"
      className="scroll-mt-24 bg-white py-20 sm:py-28"
      aria-labelledby="packages-title"
    >
      {/* Anchor for backward compatibility with existing links */}
      <div id="packages" className="relative -top-24 invisible" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span>Tailor-Made Starting Points</span>
          </div>
          <h2
            id="packages-title"
            className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
          >
            {t("packages.heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            {t("packages.subheading")}
          </p>

          {/* Flexibility Chips Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-stone-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 border border-stone-200/80">
              <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{t("packages.flexibleDates")}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 border border-stone-200/80">
              <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{t("packages.flexibleDuration")}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 border border-stone-200/80">
              <Compass className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{t("packages.flexibleRoute")}</span>
            </span>
          </div>
        </div>

        {/* Trip Ideas Grid (Swipeable on mobile, 2 col tablet, 3 col desktop) */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 sm:pt-0 scrollbar-none">
          {tripIdeas.map((pkg: TripIdea) => {
            const pkgId = pkg.id;
            const title = t(`packages.${pkgId}.title`);
            const tagline = t(`packages.${pkgId}.tagline`);

            // Highlights
            let highlights: string[] = [];
            try {
              const raw = t.raw(`packages.${pkgId}.highlights`);
              if (Array.isArray(raw)) highlights = raw;
            } catch {
              highlights = [];
            }

            const waMsg = encodeURIComponent(
              t("packages.waCardMsg", { title })
            );

            return (
              <div
                key={pkg.id}
                className="group relative flex w-[85vw] max-w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-stone-200 snap-center transition-all duration-300 hover:shadow-xl hover:border-emerald-500/50 sm:w-auto sm:max-w-none h-full"
              >
                {/* Hero Image */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-100 sm:h-56 shrink-0">
                  <Image
                    src={pkg.heroImage}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

                  {/* Airport pickup badge on card */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-stone-900/85 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md border border-amber-300/20">
                    <Plane className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>{t("packages.airportBadge")}</span>
                  </span>

                  {/* Trip Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white sm:text-2xl drop-shadow-sm">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Card Body (Equal-height flex column) */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Short Flexibility Note */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/90 rounded-lg px-2.5 py-1.5 border border-emerald-200/60">
                    <Compass className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{t("packages.flexibilityNote")}</span>
                  </div>

                  {/* Tagline / Quote (Line clamp 2, fixed min height for alignment) */}
                  <p className="mt-3 text-sm font-medium text-stone-600 italic line-clamp-2 min-h-[2.5rem]">
                    &ldquo;{tagline}&rdquo;
                  </p>

                  {/* Highlights (Aligned across cards) */}
                  {highlights.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        {t("packages.sampleHighlights")}
                      </p>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bottom Area: Pushed to bottom with mt-auto */}
                  <div className="mt-auto pt-5 border-t border-stone-100">
                    <p className="mb-2 text-center text-xs font-semibold text-stone-500">
                      {t("packages.freeQuote")}
                    </p>

                    <div className="flex flex-col gap-2 md:flex-row">
                      {/* WhatsApp Custom Quote Button */}
                      <a
                        href={`https://wa.me/${config.whatsapp}?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("packages.quoteWhatsApp")} - ${title}`}
                        className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366]"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        <span className="truncate">{t("packages.quoteWhatsApp")}</span>
                      </a>

                      {/* Call Us Button */}
                      <a
                        href={`tel:${config.phone}`}
                        aria-label={`${t("packages.callUsMobile")} ${config.phone}`}
                        className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-xs font-bold text-stone-800 transition hover:bg-stone-100 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 md:shrink-0"
                      >
                        <Phone className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span className="md:hidden">{t("packages.callUsMobile")}</span>
                        <span className="hidden md:inline">{t("packages.callUs", { phone: config.phone })}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent Airport Pickup & Drop Block */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
              <Plane className="h-3.5 w-3.5 text-amber-400" />
              <span>{t("packages.airportBadge")}</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t("packages.airportBlock.heading")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              {t("packages.airportBlock.description")}
            </p>

            {/* Confirmed Claims Only */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm">
              {config.airportTransfer?.privateAcVehicle && (
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                  <Car className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">
                    {t("packages.airportBlock.point1")}
                  </span>
                </div>
              )}
              {config.airportTransfer?.airportPickupDrop && (
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                  <Plane className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">
                    {t("packages.airportBlock.point2")}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">
                  {t("packages.airportBlock.point3")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom CTA Row */}
        <div className="mt-12 rounded-2xl bg-stone-100 p-6 sm:p-8 border border-stone-200 text-center">
          <h4 className="text-xl font-bold text-stone-900 sm:text-2xl">
            {t("packages.sectionCtaHeading")}
          </h4>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">
            {t("packages.sectionCtaSubheading")}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t("packages.freeQuote")}
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                t("packages.waSectionMsg")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("packages.sectionCtaWhatsApp")}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("packages.sectionCtaWhatsApp")}</span>
            </a>
            <a
              href={`tel:${config.phone}`}
              aria-label={`${t("packages.sectionCtaCall")} ${config.phone}`}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-800 transition hover:bg-stone-50 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 sm:w-auto"
            >
              <Phone className="h-4 w-4 text-emerald-700" />
              <span className="sm:hidden">{t("packages.callUsMobile")}</span>
              <span className="hidden sm:inline">
                {t("packages.callUs", { phone: config.phone })}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
