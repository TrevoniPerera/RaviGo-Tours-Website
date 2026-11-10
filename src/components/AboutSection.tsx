"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import config, { computeYearsNumber } from "@/data/config";
import { Award, Languages, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");
  const years = computeYearsNumber(config.startYear);

  const languagesList = [
    {
      key: "english",
      name: t("spokenLanguages.english.name"),
      level: t("spokenLanguages.english.level"),
    },
    {
      key: "sinhala",
      name: t("spokenLanguages.sinhala.name"),
      level: t("spokenLanguages.sinhala.level"),
    },
    {
      key: "german",
      name: t("spokenLanguages.german.name"),
      level: t("spokenLanguages.german.level"),
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Guide Photo Column (5 cols on lg) */}
          <div className="relative mx-auto w-full max-w-md min-w-0 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-emerald-950/10 shadow-2xl border-4 border-white">
              <Image
                src="/images/about/ravi-guide.jpg"
                alt={t("guidePhotoAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

              {/* Floating experience pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-md border border-stone-100">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-stone-950">
                    <Award className="h-6 w-6 shrink-0" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="min-w-0 break-words text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                      {t("experienceYears", { years })}
                    </p>
                    <p className="min-w-0 break-words text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {t("experienceSubLabel")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tropical accent badge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-48 w-48 rounded-full bg-emerald-100 blur-2xl"
            />
          </div>

          {/* Guide Narrative Column (7 cols on lg) */}
          <div className="min-w-0 space-y-6 lg:col-span-7">
            <div className="min-w-0">
              <div className="mb-3 inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Heart className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span className="min-w-0 break-words">{t("badge")}</span>
              </div>
              <h2
                id="about-title"
                className="min-w-0 break-words text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
              >
                {t("heading")}
              </h2>
              <p className="mt-2 min-w-0 break-words text-lg font-medium text-emerald-800">
                {t("subheading")}
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="min-w-0 space-y-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              <p className="min-w-0 break-words">
                {t("storyParagraph1", { founderName: config.founderName })}
              </p>
              <p className="min-w-0 break-words">{t("storyParagraph2")}</p>
            </div>

            {/* Languages Spoken */}
            <div className="min-w-0 rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="mb-3 flex min-w-0 items-center gap-2">
                <Languages className="h-5 w-5 shrink-0 text-emerald-700" />
                <h3 className="min-w-0 break-words text-sm font-bold uppercase tracking-wider text-stone-800">
                  {t("languagesSpoken")}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {languagesList.map((lang) => (
                  <div
                    key={lang.key}
                    className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-medium border border-stone-200/60"
                  >
                    <span className="min-w-0 break-words font-bold text-stone-800">
                      {lang.name}
                    </span>
                    <span className="min-w-0 break-words text-stone-500">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credibility Markers */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
              <div className="flex min-w-0 items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="min-w-0 break-words text-sm font-bold text-stone-900">
                    {t("features.vehicleTitle")}
                  </p>
                  <p className="min-w-0 break-words text-xs text-stone-500">
                    {t("features.vehicleDesc")}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="min-w-0 break-words text-sm font-bold text-stone-900">
                    {t("features.pricingTitle")}
                  </p>
                  <p className="min-w-0 break-words text-xs text-stone-500">
                    {t("features.pricingDesc")}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="min-w-0 break-words text-sm font-bold text-stone-900">
                    {t("features.routesTitle")}
                  </p>
                  <p className="min-w-0 break-words text-xs text-stone-500">
                    {t("features.routesDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
