"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";

const localeLabels: Record<Locale, { label: string; code: string; flag: string }> = {
  en: { label: "English", code: "EN", flag: "🇬🇧" },
  de: { label: "Deutsch", code: "DE", flag: "🇩🇪" },
  fr: { label: "Français", code: "FR", flag: "🇫🇷" },
  ja: { label: "日本語", code: "JA", flag: "🇯🇵" },
  it: { label: "Italiano", code: "IT", flag: "🇮🇹" },
};

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLocale = (nextLocale: Locale) => {
    setIsOpen(false);
    if (nextLocale === currentLocale) return;

    // Preserve any active hash
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${currentHash}`, { locale: nextLocale });
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
          Language / Sprache / Langue / 言語 / Lingua
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {routing.locales.map((loc) => {
            const item = localeLabels[loc];
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLocale(loc)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                }`}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">{item.flag}</span>
                  <span>{item.label}</span>
                </span>
                {isActive && <Check className="h-4 w-4 text-emerald-300" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/90 px-3.5 py-1.5 text-sm font-medium text-stone-700 shadow-sm backdrop-blur-md transition hover:border-stone-300 hover:bg-white hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4 text-emerald-700" />
        <span className="font-semibold text-stone-900">{localeLabels[currentLocale]?.code}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-2 w-44 rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl backdrop-blur-md focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {routing.locales.map((loc) => {
            const item = localeLabels[loc];
            const isActive = loc === currentLocale;
            return (
              <li key={loc} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => handleSelectLocale(loc)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-emerald-50 font-semibold text-emerald-900"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="text-base">{item.flag}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && <Check className="h-4 w-4 text-emerald-700" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
