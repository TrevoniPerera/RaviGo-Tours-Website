"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getConsentedGallery } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import LightboxModal from "./LightboxModal";
import { Camera, ShieldCheck, ZoomIn, Pause, Play } from "lucide-react";

/**
 * Marquee speed configuration:
 * Duration (in seconds) for one complete loop.
 * Adjust this single constant to change the speed (40s - 65s = smooth 40-60 px/sec drift).
 */
export const GALLERY_MARQUEE_DURATION_SECONDS = 55;

export default function GallerySection() {
  const t = useTranslations("gallery");
  // Only items where consent === true / consentObtained === true
  const galleryItems: GalleryItem[] = getConsentedGallery();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPausedByUser, setIsPausedByUser] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);

  // Ensure Set 1 has at least 18 items (~5,300px on desktop) to span >2x an ultrawide
  // 2560px screen without gaps before duplicating for the seamless -50% translateX marquee loop.
  const minItemsToFill = 18;
  const repetitions = Math.max(1, Math.ceil(minItemsToFill / Math.max(galleryItems.length, 1)));
  const baseItems: GalleryItem[] = Array.from({ length: repetitions }, () => galleryItems).flat();

  const openLightbox = (originalIndex: number) => setLightboxIndex(originalIndex);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % galleryItems.length);
  };

  /**
   * Safe object-positioning helper for square crops:
   * - img-006 (tourist holding crocodile) has the subject's head & sunglasses starting at Y=50px,
   *   so object-top prevents cropping into her face.
   * - img-003 (tourists in traditional sarongs) has heads starting near the top, so object-[center_20%]
   *   keeps their faces fully visible.
   * - Other photos frame comfortably with standard center crop.
   */
  const getObjectPosition = (id: string) => {
    if (id === "img-006") return "object-top";
    if (id === "img-003") return "object-[center_20%]";
    return "object-center";
  };

  const renderTile = (
    item: GalleryItem,
    key: string,
    originalIndex: number,
    isDuplicate: boolean,
    isEager: boolean
  ) => {
    let caption = item.id;
    try {
      if (t.has(`items.${item.id}`)) {
        caption = t(`items.${item.id}`);
      } else if (t.has(`alts.${item.id}`)) {
        caption = t(`alts.${item.id}`);
      }
    } catch {
      caption = item.id;
    }

    return (
      <button
        key={key}
        type="button"
        onClick={() => openLightbox(originalIndex)}
        tabIndex={isDuplicate ? -1 : 0}
        aria-hidden={isDuplicate ? "true" : undefined}
        aria-label={
          isDuplicate
            ? undefined
            : t("openLightbox", { caption, alt: caption })
        }
        className="group relative aspect-square h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-stone-200 shadow-sm transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:h-[220px] sm:w-[220px] lg:h-[280px] lg:w-[280px]"
      >
        <Image
          src={item.src}
          alt={isDuplicate ? "" : caption}
          fill
          priority={isEager}
          loading={isEager ? "eager" : "lazy"}
          quality={85}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 280px"
          className={`object-cover ${getObjectPosition(item.id)} transition-transform duration-500 group-hover:scale-105`}
        />

        {/* Hover/Focus Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

        {/* Subtle Zoom indicator */}
        <div
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-stone-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <ZoomIn className="h-4 w-4" />
        </div>

        {/* Caption overlay (only shown on hover or keyboard focus to keep strip clean) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-white transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-4">
          <p className="line-clamp-2 text-xs font-semibold sm:text-sm leading-snug">
            {caption}
          </p>
        </div>
      </button>
    );
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 w-full overflow-hidden bg-stone-50 py-20 sm:py-28"
      aria-labelledby="gallery-title"
    >
      {/* Centered Section Header (stays in 1280px container) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl min-w-0 text-center sm:mb-14">
          <div className="mb-3 inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Camera className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span className="min-w-0 break-words">{t("badge")}</span>
          </div>
          <h2
            id="gallery-title"
            className="min-w-0 break-words text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 min-w-0 break-words text-base leading-relaxed text-stone-600 sm:text-lg">
            {t("subheading")}
          </p>
        </div>
      </div>

      {/* Full-Bleed Continuous Photo Strip (Edge-to-Edge) */}
      <div
        className="group/marquee gallery-marquee-mask relative w-full overflow-hidden select-none py-1 motion-reduce:overflow-x-auto motion-reduce:scroll-smooth"
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onTouchCancel={() => setIsTouching(false)}
      >
        <div
          className="gallery-marquee-track"
          style={{
            "--marquee-duration": `${GALLERY_MARQUEE_DURATION_SECONDS}s`,
            animationPlayState:
              isPausedByUser || lightboxIndex !== null || isTouching ? "paused" : undefined,
          } as React.CSSProperties}
        >
          {/* Primary Track: Accessible, Tabbable for first set */}
          <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
            {baseItems.map((item, index) => {
              const originalIndex = index % galleryItems.length;
              // Only first unique set of photos is tabbable by keyboard
              const isTabbable = index < galleryItems.length;
              const isEager = index < 6;
              return renderTile(
                item,
                `set1-${item.id}-${index}`,
                originalIndex,
                !isTabbable,
                isEager
              );
            })}
          </div>

          {/* Duplicate Track: Pixel-identical for seamless -50% translateX loop (aria-hidden) */}
          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 motion-reduce:hidden"
          >
            {baseItems.map((item, index) => {
              const originalIndex = index % galleryItems.length;
              return renderTile(
                item,
                `set2-${item.id}-${index}`,
                originalIndex,
                true,
                false
              );
            })}
          </div>
        </div>
      </div>

      {/* Centered Controls & Legal Consent Note */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left text-xs text-stone-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{t("consentNote")}</span>
          </div>

          {/* Pause / Play Button (WCAG 2.2.2 Compliance, 44x44px target) */}
          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            aria-label={isPausedByUser ? t("resumeAnimation") : t("pauseAnimation")}
            aria-pressed={isPausedByUser}
            title={isPausedByUser ? t("resumeAnimation") : t("pauseAnimation")}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-50 hover:text-stone-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:hidden"
          >
            {isPausedByUser ? (
              <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Lightbox Modal (Cycles through original consented photos once, in order) */}
      <LightboxModal
        items={galleryItems}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </section>
  );
}
