"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Playfair_Display } from "next/font/google";
import places from "@/data/places";
import type { Place } from "@/types";
import DestinationDialog from "./DestinationDialog";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Keyboard, A11y, Navigation } from "swiper/modules";
import {
  MapPin,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Swiper core styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/a11y";

// Serif font for Polaroid card captions (Latin)
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function DestinationsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isJapanese = locale === "ja";

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const handleRelatedPackage = () => {
    const packagesEl =
      document.getElementById("packages") || document.getElementById("tailor-made");
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCardClick = (index: number, place: Place) => {
    if (!swiperRef.current) return;
    if (swiperRef.current.realIndex === index) {
      // Clicking the active center card opens the details dialog
      setSelectedPlace(place);
    } else {
      // Clicking a side card brings it to the center
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section
      id="destinations"
      className="relative scroll-mt-24 overflow-x-clip bg-gradient-to-b from-stone-100 via-[#faf7f2] to-stone-100 py-20 sm:py-28"
      aria-labelledby="destinations-title"
    >
      {/* Background Ambient Radial Light (tropical green, ocean blue, warm gold) */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-[480px] w-[750px] -translate-y-6 rounded-full bg-gradient-to-tr from-amber-200/35 via-emerald-100/25 to-sky-100/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200/60 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
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

        {/* 3D Coverflow Polaroid Carousel Container */}
        <div className="relative mx-auto max-w-7xl py-2">
          {/* Desktop Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={t("destinations.prevSlide")}
            className="hidden md:flex absolute left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-white/85 text-stone-700 shadow-md backdrop-blur-md border border-stone-200/80 transition-all hover:bg-white hover:text-emerald-800 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
          </button>

          {/* Desktop Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={t("destinations.nextSlide")}
            className="hidden md:flex absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-white/85 text-stone-700 shadow-md backdrop-blur-md border border-stone-200/80 transition-all hover:bg-white hover:text-emerald-800 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <ChevronRight className="h-6 w-6 stroke-[1.5]" />
          </button>

          {/* Swiper Coverflow (strictly within 1280px with edge fade) */}
          <div className="coverflow-container overflow-hidden px-4 md:px-14 [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
            <Swiper
              modules={[EffectCoverflow, Keyboard, A11y, Navigation]}
              effect={isReducedMotion ? undefined : "coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              a11y={{
                enabled: true,
                prevSlideMessage: t("destinations.prevSlide"),
                nextSlideMessage: t("destinations.nextSlide"),
              }}
              coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 180,
                modifier: 1,
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  coverflowEffect: {
                    rotate: isReducedMotion ? 0 : 25,
                    stretch: 0,
                    depth: isReducedMotion ? 0 : 90,
                    modifier: 1,
                    slideShadows: false,
                  },
                },
                768: {
                  coverflowEffect: {
                    rotate: isReducedMotion ? 0 : 35,
                    stretch: 0,
                    depth: isReducedMotion ? 0 : 150,
                    modifier: 1,
                    slideShadows: false,
                  },
                },
                1024: {
                  coverflowEffect: {
                    rotate: isReducedMotion ? 0 : 40,
                    stretch: 0,
                    depth: isReducedMotion ? 0 : 180,
                    modifier: 1,
                    slideShadows: false,
                  },
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              className="!py-6 sm:!py-8 !overflow-visible"
            >
              {places.map((place, idx) => {
                const name = t(`destinations.${place.id}.name`);
                const region = t(`destinations.${place.id}.region`);
                const shortDesc = t(`destinations.${place.id}.shortDescription`);
                const hours = t("destinations.hours", {
                  n: place.suggestedVisitHours,
                });
                const isActive = idx === activeIndex;

                // Eager load active & immediate neighbours, lazy load rest
                const dist = Math.min(
                  Math.abs(idx - activeIndex),
                  places.length - Math.abs(idx - activeIndex)
                );
                const isNearActive = dist <= 1;

                return (
                  <SwiperSlide
                    key={place.id}
                    className="!w-[84vw] !max-w-[340px] sm:!w-[340px] md:!w-[360px] lg:!w-[420px] !h-auto transition-all duration-300"
                  >
                    <div
                      onClick={() => handleCardClick(idx, place)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCardClick(idx, place);
                        }
                      }}
                      tabIndex={isActive ? 0 : -1}
                      role="button"
                      aria-label={`Destination ${idx + 1} of ${places.length}: ${name}`}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl bg-white p-3 sm:p-4 pb-4 sm:pb-5 transition-all duration-300 select-none border",
                        isActive
                          ? "shadow-2xl ring-2 ring-emerald-600/20 border-stone-200/90 cursor-pointer"
                          : "shadow-lg border-stone-200/60 cursor-pointer hover:shadow-xl"
                      )}
                    >
                      {/* Polaroid Photo Frame */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                        <Image
                          src={place.heroImage}
                          alt={name}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 360px, 420px"
                          priority={idx === 0}
                          loading={idx === 0 ? undefined : (isNearActive ? "eager" : "lazy")}
                          quality={85}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Subtle inner photo border */}
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 pointer-events-none" />

                        {/* Featured Gold Badge */}
                        {place.featured && (
                          <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 text-[11px] font-bold text-stone-950 shadow-md">
                            <Sparkles className="h-3 w-3 fill-stone-950 text-stone-950" />
                            <span>{t("destinations.featured")}</span>
                          </span>
                        )}
                      </div>

                      {/* Polaroid Bottom Body: Title, Region, Description & Action */}
                      <div className="mt-3.5 sm:mt-4 flex flex-1 flex-col text-center">
                        {/* Destination Name */}
                        <h3
                          className={cn(
                            "text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1",
                            isJapanese
                              ? "font-noto-jp not-italic font-bold"
                              : `${playfair.className} italic font-semibold`
                          )}
                        >
                          {name}
                        </h3>

                        {/* Region & Time Badge row */}
                        <div className="mt-1.5 flex items-center justify-center gap-2 text-xs text-stone-500 font-medium">
                          <span className="inline-flex items-center gap-1 text-emerald-800">
                            <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>{region}</span>
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="inline-flex items-center gap-1 text-stone-600">
                            <Clock className="h-3 w-3 text-stone-400 shrink-0" />
                            <span>{hours}</span>
                          </span>
                        </div>

                        {/* Description inside Polaroid */}
                        <p className="mt-2.5 line-clamp-3 min-h-[3.75rem] text-xs sm:text-sm leading-relaxed text-stone-600 px-1 sm:px-2">
                          {shortDesc}
                        </p>

                        {/* Explore CTA inside Polaroid */}
                        <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:underline transition-colors">
                            <span>{t("destinations.viewDetail", { name })}</span>
                            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Slide Indicator & Mobile Arrows below Carousel */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t("destinations.prevSlide")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm border border-stone-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="flex items-center justify-center rounded-full border border-stone-200/80 bg-white/90 px-4 py-1.5 text-xs font-bold text-stone-600 shadow-xs tabular-nums backdrop-blur-sm"
              aria-label={t("destinations.slideIndicator", {
                current: activeIndex + 1,
                total: places.length,
              })}
            >
              <span>
                {activeIndex + 1} / {places.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t("destinations.nextSlide")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm border border-stone-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 md:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Destination Modal Details Dialog */}
      <DestinationDialog
        place={selectedPlace}
        isOpen={selectedPlace !== null}
        onClose={() => setSelectedPlace(null)}
        onSelectRelatedPackage={handleRelatedPackage}
      />

      {/* Global CSS for 3D Swiper Coverflow progressive dimming & depth */}
      <style jsx global>{`
        .coverflow-container .swiper-slide {
          transition: filter 0.4s ease, opacity 0.4s ease;
        }
        .coverflow-container .swiper-slide-active {
          filter: none !important;
          opacity: 1 !important;
          z-index: 20 !important;
        }
        .coverflow-container .swiper-slide-prev,
        .coverflow-container .swiper-slide-next {
          filter: brightness(0.92) !important;
          opacity: 0.9 !important;
          z-index: 10 !important;
        }
        .coverflow-container .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
          filter: brightness(0.8) blur(0.6px) !important;
          opacity: 0.7 !important;
          z-index: 5 !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .coverflow-container .swiper-slide {
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
