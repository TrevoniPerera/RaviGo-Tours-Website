"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import places from "@/data/places";
import type { Place } from "@/types";
import DestinationDialog from "./DestinationDialog";
import { Calendar, Clock, MapPin, Sparkles, ChevronRight } from "lucide-react";

export default function DestinationsSection() {
  const t = useTranslations();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleRelatedPackage = () => {
    const packagesEl = document.getElementById("packages");
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="destinations"
      className="scroll-mt-24 bg-stone-50 py-20 sm:py-28"
      aria-labelledby="destinations-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Sri Lanka Wonders</span>
          </div>
          <h2
            id="destinations-title"
            className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
          >
            {t("destinations.heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            {t("destinations.subheading")}
          </p>
        </div>

        {/* Top 10 Grid: 1 col mobile, 2 col tablet, 3-4 col desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => {
            const name = t(`destinations.${place.id}.name`);
            const region = t(`destinations.${place.id}.region`);
            const shortDesc = t(`destinations.${place.id}.shortDescription`);
            const season = t(`destinations.${place.id}.bestSeasonLabel`);
            const hours = t("destinations.hours", { n: place.suggestedVisitHours });

            return (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPlace(place);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${name} - ${region}. Click for details.`}
                className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-stone-200/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                  place.featured ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-stone-200 ${
                    place.featured ? "h-64 sm:h-72" : "h-56"
                  }`}
                >
                  <Image
                    src={place.heroImage}
                    alt={name}
                    fill
                    sizes={
                      place.featured
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                  {/* Region Badge */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-stone-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-amber-400" />
                    <span>{region}</span>
                  </span>

                  {/* Featured Tag */}
                  {place.featured && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-stone-950 shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      <span>Featured Icon</span>
                    </span>
                  )}

                  {/* Destination Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-sm sm:text-2xl">
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <p className="line-clamp-3 text-sm leading-relaxed text-stone-600">
                    {shortDesc}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-stone-100 pt-4 text-xs font-medium text-stone-500">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <Calendar className="h-3.5 w-3.5 text-amber-600" />
                        <span>{season}</span>
                      </span>

                      <span className="flex items-center gap-1.5 text-stone-700 font-semibold">
                        <Clock className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{hours}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 font-semibold text-emerald-700 group-hover:text-emerald-800">
                      <span>{t("destinations.viewDetail", { name })}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Destination Modal Dialog */}
      <DestinationDialog
        place={selectedPlace}
        isOpen={selectedPlace !== null}
        onClose={() => setSelectedPlace(null)}
        onSelectRelatedPackage={handleRelatedPackage}
      />
    </section>
  );
}
