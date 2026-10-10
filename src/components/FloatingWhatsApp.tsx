"use client";

import { useTranslations } from "next-intl";
import config from "@/data/config";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const t = useTranslations("common");
  const message = encodeURIComponent(
    "Hello Ravi! I am interested in planning a tour in Sri Lanka with RaviGo Tours."
  );

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,1.25rem)+0.5rem))] right-4 z-40 sm:right-6"
    >
      <a
        href={`https://wa.me/${config.whatsapp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ravi on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#25D366] active:scale-95"
      >
        {/* Animated pulse ring */}
        <span className="absolute -inset-1 -z-10 rounded-full bg-[#25D366]/40 animate-ping duration-1000 opacity-60" />

        {/* WhatsApp Icon */}
        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-6" />

        {/* Desktop Tooltip */}
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-stone-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 md:block opacity-0">
          {t("whatsappUs")}
        </span>
      </a>
    </aside>
  );
}
