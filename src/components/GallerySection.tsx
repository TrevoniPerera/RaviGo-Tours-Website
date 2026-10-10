"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getConsentedGallery } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import LightboxModal from "./LightboxModal";
import { Camera, ShieldCheck, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const t = useTranslations("gallery");
  // Only items where consent === true / consentObtained === true
  const galleryItems: GalleryItem[] = getConsentedGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % galleryItems.length);
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-stone-50 py-20 sm:py-28"
      aria-labelledby="gallery-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Camera className="h-3.5 w-3.5 text-emerald-600" />
            <span>Traveller Moments</span>
          </div>
          <h2
            id="gallery-title"
            className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Gallery Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {galleryItems.map((item, index) => {
            let caption = "";
            try {
              caption = t(`items.${item.id}`);
            } catch {
              caption = item.id;
            }

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${caption}`}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl bg-stone-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 sm:rounded-2xl"
              >
                <Image
                  src={item.src}
                  alt={caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Zoom Icon indicator */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-stone-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Caption on hover/tap */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <p className="line-clamp-2 text-xs font-semibold sm:text-sm">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Consent Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-stone-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{t("consentNote")}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
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
