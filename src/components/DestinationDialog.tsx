"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Place } from "@/types";
import { X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface DestinationDialogProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelatedPackage: (packageSlug: string) => void;
}

export default function DestinationDialog({
  place,
  isOpen,
  onClose,
  onSelectRelatedPackage,
}: DestinationDialogProps) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle ESC key & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !place) return null;

  const placeId = place.id;
  const name = t(`destinations.${placeId}.name`);
  const region = t(`destinations.${placeId}.region`);
  const longDescription = t(`destinations.${placeId}.longDescription`);
  const bestSeason = t(`destinations.${placeId}.bestSeasonLabel`);
  const visitHours = t("destinations.hours", { n: place.suggestedVisitHours });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header Image */}
        <div className="relative h-64 w-full bg-stone-900 sm:h-80 shrink-0">
          <Image
            src={place.heroImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/70 text-white shadow-md backdrop-blur-md transition hover:bg-stone-900 hover:scale-105"
            aria-label={t("gallery.close")}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md mb-2">
              <MapPin className="h-3 w-3" />
              {region}
            </span>
            <h2 id="dialog-title" className="text-2xl font-extrabold text-white sm:text-3xl">
              {name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Key Facts */}
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-stone-50 p-4 border border-stone-200">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {t("destinations.bestSeason")}
                </p>
                <p className="text-sm font-bold text-stone-900">{bestSeason}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {t("destinations.suggestedTime")}
                </p>
                <p className="text-sm font-bold text-stone-900">{visitHours}</p>
              </div>
            </div>
          </div>

          {/* Detailed description */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-stone-700">
              About This Destination
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              {longDescription}
            </p>
          </div>

          {/* Extra Photo previews */}
          {place.galleryImages.length > 1 && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-stone-700">
                Gallery Views
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {place.galleryImages.slice(0, 3).map((imgSrc, i) => (
                  <div key={i} className="relative h-20 overflow-hidden rounded-lg bg-stone-100 sm:h-24">
                    <Image
                      src={imgSrc}
                      alt={`${name} perspective ${i + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related packages link */}
          {place.relatedPackageSlugs.length > 0 && (
            <div className="pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectRelatedPackage(place.relatedPackageSlugs[0]);
                }}
                className="flex w-full items-center justify-between rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <span>{t("destinations.relatedPackages")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
