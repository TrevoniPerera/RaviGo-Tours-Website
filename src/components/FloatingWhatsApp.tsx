"use client";

import { useLocale, useTranslations } from "next-intl";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const locale = useLocale();
  const t = useTranslations("whatsapp");
  const tCommon = useTranslations("common");
  const whatsappHref = getWhatsAppHref(locale);

  return (
    <aside
      aria-label={t("ariaLabel")}
      className="pointer-events-none fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,1.25rem)+0.5rem))] right-4 z-40 sm:right-6"
    >
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full p-1">
        {/* Decorative pulse ring behind the button (lower z-index, pointer-events-none, aria-hidden, clipped) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 z-0 rounded-full bg-[#25D366]/40 animate-ping duration-1000 opacity-60"
        />

        {/* External WhatsApp redirect link */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={t("ariaLabel")}
          className="pointer-events-auto group relative z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-400 active:scale-95"
        >
          <MessageCircle
            aria-hidden="true"
            className="pointer-events-none h-7 w-7 transition-transform group-hover:rotate-6"
          />
        </a>
      </div>

      {/* Desktop Tooltip */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[4.5rem] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-lg bg-stone-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm md:block opacity-0"
      >
        {tCommon("whatsappUs")}
      </span>
    </aside>
  );
}
