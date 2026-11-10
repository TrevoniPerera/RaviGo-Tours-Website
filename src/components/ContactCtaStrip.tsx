import { useLocale, useTranslations } from "next-intl";
import config from "@/data/config";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { Phone, MessageCircle, Mail, Sparkles } from "lucide-react";

export default function ContactCtaStrip() {
  const locale = useLocale();
  const t = useTranslations("contactCta");
  const tWhatsapp = useTranslations("whatsapp");
  const whatsappHref = getWhatsAppHref(locale);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 py-16 text-white sm:py-20"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          {/* Headline & Description */}
          <div className="max-w-2xl min-w-0 text-center lg:text-left">
            <div className="mb-3 inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0 break-words">{t("badge")}</span>
            </div>
            <h2
              id="contact-title"
              className="min-w-0 break-words text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              {t("heading")}
            </h2>
            <p className="mt-3 min-w-0 break-words text-base leading-relaxed text-stone-200 sm:text-lg">
              {t("subheading")}
            </p>
          </div>

          {/* Action Buttons Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 shrink-0">
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={tWhatsapp("ariaLabel")}
              className="flex min-h-[48px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20ba59] hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("whatsapp")}</span>
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${config.phone}`}
              className="flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>{t("call")}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${config.email}`}
              className="flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>{t("email")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
