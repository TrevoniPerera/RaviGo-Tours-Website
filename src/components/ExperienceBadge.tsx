"use client";

import { useTranslations } from "next-intl";
import config, { computeYearsNumber } from "@/data/config";
import { Award } from "lucide-react";

interface ExperienceBadgeProps {
  label?: string;
  className?: string;
}

export default function ExperienceBadge({
  className = "",
}: ExperienceBadgeProps) {
  const t = useTranslations("experience");
  const years = computeYearsNumber(config.startYear);
  const badgeText = t("badge", { years });

  return (
    <div
      className={`inline-flex max-w-full min-w-0 items-center gap-2.5 sm:gap-3 rounded-full border-2 border-amber-400/90 bg-stone-950/85 px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-lg font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-300 hover:bg-stone-950/95 ${className}`}
      role="status"
      aria-label={badgeText}
    >
      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-stone-950 shadow-md">
        <Award className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
      </span>
      <span className="min-w-0 break-words text-white font-semibold">
        {badgeText}
      </span>
    </div>
  );
}
