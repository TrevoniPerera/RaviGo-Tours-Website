import config, { computeYearsOfExperience } from "@/data/config";
import { Award } from "lucide-react";

interface ExperienceBadgeProps {
  label?: string;
  className?: string;
}

export default function ExperienceBadge({
  label = "Years of Guiding Experience",
  className = "",
}: ExperienceBadgeProps) {
  const years = computeYearsOfExperience(config.startYear);

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2.5 sm:gap-3 rounded-full border-2 border-amber-400/90 bg-stone-950/85 px-4 py-2 sm:px-6 sm:py-2.5 text-base sm:text-lg font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-300 hover:bg-stone-950/95 ${className}`}
      role="status"
      aria-label={`${years} ${label}`}
    >
      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-stone-950 shadow-md">
        <Award className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
      </span>
      <span className="truncate sm:overflow-visible text-white font-semibold">
        <strong className="text-amber-400 font-extrabold mr-1.5">{years}</strong>
        {label}
      </span>
    </div>
  );
}
