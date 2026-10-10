"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import config from "@/data/config";
import ExperienceBadge from "./ExperienceBadge";
import { MessageCircle, Compass, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  { src: "/images/hero/hero-01.jpeg", alt: "Sri Lanka breathtaking scenic viewpoint and lush tropical landscape" },
  { src: "/images/hero/hero-02.jpeg", alt: "Historic Sri Lankan cultural wonder and heritage architecture" },
  { src: "/images/hero/hero-03.jpeg", alt: "Serene highland tea country and misty mountain peaks" },
  { src: "/images/hero/hero-04.jpeg", alt: "Spectacular ocean coastline and golden Sri Lankan beaches" },
  { src: "/images/hero/hero-05.jpeg", alt: "Exotic wildlife and natural sanctuary in Sri Lanka" },
];

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

export default function HeroSlideshow() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  // Auto-advance slideshow only if not reduced motion and not paused
  useEffect(() => {
    if (isReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isReducedMotion, isPaused, nextSlide]);

  const whatsappMessage = encodeURIComponent(
    "Hello Ravi! I saw your website and would like to ask about a Sri Lanka tour."
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[92dvh] w-full items-center justify-center overflow-hidden bg-stone-950 text-white scroll-mt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Showcase"
    >
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            } ${isReducedMotion ? "!transition-none" : ""}`}
            aria-hidden={idx !== currentIndex}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center scale-105 transform animate-none"
            />
          </div>
        ))}

        {/* Sophisticated dual gradient overlay for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-emerald-950/30 to-stone-950/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Experience Badge */}
        <div className="mb-6 flex justify-center">
          <ExperienceBadge label={t("experience.label")} />
        </div>

        {/* Headline */}
        <h1 className="mx-auto mb-6 max-w-4xl font-extrabold tracking-tight text-white drop-shadow-md text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]">
          {t("hero.headline")}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-stone-200 drop-shadow sm:text-lg md:text-xl lg:text-2xl">
          {t("hero.subheadline")}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          {/* View Packages CTA */}
          <a
            href="#packages"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-base font-bold text-stone-950 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <Compass className="h-5 w-5 text-stone-950" />
            <span>{t("hero.ctaPrimary")}</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${config.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-md shadow-lg transition-all hover:border-white hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <MessageCircle className="h-5 w-5 text-emerald-400" />
            <span>{t("hero.ctaSecondary")}</span>
          </a>
        </div>

        {/* Slideshow controls & indicators */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-stone-900/60 text-white backdrop-blur-md transition hover:bg-stone-800 hover:border-white/40"
            aria-label="Previous hero image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-amber-400" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-stone-900/60 text-white backdrop-blur-md transition hover:bg-stone-800 hover:border-white/40"
            aria-label="Next hero image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
