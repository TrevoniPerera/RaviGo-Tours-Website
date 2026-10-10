"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { GalleryItem } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  const t = useTranslations("gallery");

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];
  let caption = "";
  try {
    caption = t(`items.${currentItem.id}`);
  } catch {
    caption = currentItem.id;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tourist photo preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-md"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg transition hover:bg-stone-800 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
        aria-label={t("close")}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg transition hover:bg-stone-800 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-6"
        aria-label={t("previous")}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg transition hover:bg-stone-800 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6"
        aria-label={t("next")}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative z-10 flex max-h-[85vh] max-w-4xl flex-col items-center overflow-hidden rounded-2xl bg-stone-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[65vh] w-[88vw] max-w-4xl sm:h-[72vh]">
          <Image
            src={currentItem.src}
            alt={caption}
            fill
            sizes="(max-width: 1024px) 90vw, 1000px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption Bar */}
        <div className="w-full bg-stone-900/90 px-6 py-4 text-center">
          <p className="text-sm font-semibold text-white sm:text-base">{caption}</p>
          <p className="mt-1 text-xs text-stone-400">
            {currentIndex + 1} of {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
