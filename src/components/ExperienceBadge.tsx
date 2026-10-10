import config, { computeYearsOfExperience } from "@/data/config";
import { Award } from "lucide-react";

interface ExperienceBadgeProps {
  label?: string;
  className?: string;
}

export default function ExperienceBadge({ label = "Years of Guiding Experience", className = "" }: ExperienceBadgeProps) {
  const years = computeYearsOfExperience(config.startYear);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-stone-900/60 px-4 py-1.5 text-xs font-semibold text-amber-300 shadow-lg backdrop-blur-md transition sm:text-sm ${className}`}
      role="status"
      aria-label={`${years} ${label}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-950">
        <Award className="h-3 w-3 stroke-[2.5]" />
      </span>
      <span>
        <strong className="text-amber-300 font-extrabold">{years}</strong> {label}
      </span>
    </div>
  );
}
