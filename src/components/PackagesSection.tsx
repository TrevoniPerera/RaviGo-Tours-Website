"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import packages from "@/data/packages";
import config from "@/data/config";
import type { TourPackage } from "@/types";
import {
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function PackagesSection() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [expandedItinerary, setExpandedItinerary] = useState<Record<string, boolean>>({});

  const toggleDetails = (pkgId: string) => {
    setExpandedDetails((prev) => ({ ...prev, [pkgId]: !prev[pkgId] }));
  };

  const toggleItinerary = (pkgId: string) => {
    setExpandedItinerary((prev) => ({ ...prev, [pkgId]: !prev[pkgId] }));
  };

  const getWhatsAppMessage = (pkgTitle: string) => {
    switch (currentLocale) {
      case "de":
        return `Hallo Ravi! Ich interessiere mich für das Paket "${pkgTitle}". Können Sie mir bitte weitere Details und die Verfügbarkeit mitteilen?`;
      case "fr":
        return `Bonjour Ravi! Je suis intéressé(e) par le circuit "${pkgTitle}". Pourriez-vous me donner plus de détails et vos disponibilités ?`;
      case "ja":
        return `ラヴィさん、こんにちは！「${pkgTitle}」プランに興味があります。詳細と空き状況を教えていただけますか？`;
      case "it":
        return `Ciao Ravi! Sono interessato al tour "${pkgTitle}". Potresti darmi maggiori dettagli e disponibilità?`;
      default:
        return `Hello Ravi! I am interested in the "${pkgTitle}" tour package. Could you please share more details and availability?`;
    }
  };

  return (
    <section
      id="packages"
      className="scroll-mt-24 bg-white py-20 sm:py-28"
      aria-labelledby="packages-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span>Tailor-Made Itineraries</span>
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
        </div>

        {/* Swipeable on mobile, 2 col tablet, 3 col desktop */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 sm:pt-0 scrollbar-none">
          {packages.map((pkg: TourPackage) => {
            const pkgId = pkg.id;
            const title = t(`packages.${pkgId}.title`);
            const tagline = t(`packages.${pkgId}.tagline`);
            const duration = t("packages.duration", { n: pkg.durationDays });
            const isDetailsOpen = !!expandedDetails[pkgId];
            const isItineraryOpen = !!expandedItinerary[pkgId];

            // Highlights
            let highlights: string[] = [];
            try {
              const raw = t.raw(`packages.${pkgId}.highlights`);
              if (Array.isArray(raw)) highlights = raw;
            } catch {
              highlights = [];
            }

            // Inclusions / Exclusions
            let included: string[] = [];
            let excluded: string[] = [];
            try {
              const rawInc = t.raw(`packages.${pkgId}.included`);
              if (Array.isArray(rawInc)) included = rawInc;
              const rawExc = t.raw(`packages.${pkgId}.excluded`);
              if (Array.isArray(rawExc)) excluded = rawExc;
            } catch {
              included = [];
              excluded = [];
            }

            const waMsg = encodeURIComponent(getWhatsAppMessage(title));

            return (
              <div
                key={pkg.id}
                className="group relative flex w-[85vw] max-w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-stone-200/90 snap-center transition-all duration-300 hover:shadow-xl hover:border-emerald-500/50 sm:w-auto sm:max-w-none"
              >
                {/* Hero Image */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-100 sm:h-56">
                  <Image
                    src={pkg.heroImage}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Duration Badge */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{duration}</span>
                  </span>

                  {/* Price Tag */}
                  <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {t("packages.priceOnRequest")}
                  </span>

                  {/* Package Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white sm:text-2xl drop-shadow-sm">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Package Body */}
                <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                  {/* Tagline */}
                  <p className="text-sm font-medium text-stone-600 italic">
                    &ldquo;{tagline}&rdquo;
                  </p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Trip Highlights
                      </p>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Collapsible: Included & Excluded */}
                  {(included.length > 0 || excluded.length > 0) && (
                    <div className="border-t border-stone-100 pt-3">
                      <button
                        type="button"
                        onClick={() => toggleDetails(pkgId)}
                        className="flex w-full items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-emerald-700"
                        aria-expanded={isDetailsOpen}
                      >
                        <span>Included &amp; Excluded</span>
                        {isDetailsOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {isDetailsOpen && (
                        <div className="mt-2 space-y-3 rounded-xl bg-stone-50 p-3 text-xs border border-stone-200/60 animate-in fade-in duration-200">
                          {included.length > 0 && (
                            <div>
                              <p className="font-bold text-emerald-800 mb-1">
                                {t("packages.included")}
                              </p>
                              <ul className="space-y-1 text-stone-600">
                                {included.map((item, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {excluded.length > 0 && (
                            <div>
                              <p className="font-bold text-rose-800 mb-1">
                                {t("packages.excluded")}
                              </p>
                              <ul className="space-y-1 text-stone-600">
                                {excluded.map((item, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expandable Itinerary */}
                  {pkg.itinerary.length > 0 && (
                    <div className="border-t border-stone-100 pt-3">
                      <button
                        type="button"
                        onClick={() => toggleItinerary(pkgId)}
                        className="flex w-full items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-emerald-700"
                        aria-expanded={isItineraryOpen}
                      >
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-amber-600" />
                          <span>{t("packages.itinerary")}</span>
                        </span>
                        {isItineraryOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {isItineraryOpen && (
                        <div className="mt-2 max-h-56 overflow-y-auto space-y-2 rounded-xl bg-stone-50 p-3 text-xs border border-stone-200/60 animate-in fade-in duration-200">
                          {pkg.itinerary.map((day) => {
                            let dayTitle = `Day ${day.day}: ${day.overnight}`;
                            try {
                              const trans = t(`packages.${pkgId}.itinerary.day${day.day}.title`);
                              if (trans && !trans.includes("packages.")) dayTitle = trans;
                            } catch {
                              // fallback
                            }

                            return (
                              <div key={day.day} className="border-b border-stone-200/50 pb-1.5 last:border-0 last:pb-0">
                                <p className="font-bold text-stone-800">
                                  {t("packages.day", { n: day.day })}: {dayTitle}
                                </p>
                                <p className="text-[11px] text-stone-500">
                                  {t("packages.overnight", { place: day.overnight })}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button: WhatsApp Enquire */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${config.whatsapp}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#20ba59] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{t("packages.whatsappEnquire")}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Tour Note Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-800 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                {t("packages.customTourCta")}
              </h3>
              <p className="mt-1 text-sm text-emerald-200 sm:text-base">
                {t("packages.customTourNote")}
              </p>
            </div>
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                "Hello Ravi! I would like to design a custom tour in Sri Lanka."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-300 shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("common.contactUs")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
