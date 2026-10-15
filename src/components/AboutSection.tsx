"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import config, { computeYearsOfExperience } from "@/data/config";
import { Award, Languages, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");
  const years = computeYearsOfExperience(config.startYear);

  const languagesList = [
    { name: "English", level: "Fluent / Professional" },
    { name: "Sinhala", level: "Native" },
    { name: "German & French", level: "Basic greeting & hospitality" },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white py-20 sm:py-28"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Guide Photo Column (5 cols on lg) */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-emerald-950/10 shadow-2xl border-4 border-white">
              <Image
                src="/images/about/placeholder-guide.svg"
                alt="Ravi - Founder & Expert Tour Guide at RaviGo Tours"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

              {/* Floating experience pill */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-md border border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-stone-950">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-stone-900">{years} Years</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Guiding Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tropical accent badge */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-48 w-48 rounded-full bg-emerald-100 blur-2xl" />
          </div>

          {/* Guide Narrative Column (7 cols on lg) */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Heart className="h-3.5 w-3.5 text-emerald-600" />
                <span>Meet Your Host</span>
              </div>
              <h2
                id="about-title"
                className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
              >
                {t("heading")}
              </h2>
              <p className="mt-2 text-lg font-medium text-emerald-800">
                {t("subheading")}
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              <p>
                Hello and ayubowan! I am Ravidra, founder of RaviGo Tours.I have been privileged to welcome guests around the world to discover the heart and soul of Sri Lanka.
              </p>
              <p>
                RaviGo Tours is built on genuine personal hospitality. Whether tracking wild leopards in Yala at dawn, hiking misty tea hills in Ella, or exploring ancient kingdoms like Sigiriya and Polonnaruwa, every journey is custom-crafted to your comfort, pace, and interests.
              </p>
            </div>

            {/* Languages Spoken */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Languages className="h-5 w-5 text-emerald-700" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                  {t("languagesSpoken")}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {languagesList.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2 text-xs font-medium border border-stone-200/60"
                  >
                    <span className="font-bold text-stone-800">{lang.name}</span>
                    <span className="text-stone-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credibility Markers */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Private AC Vehicle</p>
                  <p className="text-xs text-stone-500">Fully licensed &amp; insured</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Transparent Pricing</p>
                  <p className="text-xs text-stone-500">No hidden surprises</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Flexible Routes</p>
                  <p className="text-xs text-stone-500">Travel at your rhythm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
