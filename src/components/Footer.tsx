"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import config from "@/data/config";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

// Logo path constant — easily swappable
const LOGO_SRC = "/images/logo/logo.png";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const whatsappHref = getWhatsAppHref(locale);

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        {/* 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="min-w-0 space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-20 shrink-0">
                <Image
                  src={LOGO_SRC}
                  alt={t("nav.logoAlt")}
                  fill
                  sizes="80px"
                  className="object-contain object-left"
                />
              </div>
              <div className="min-w-0">
                <h3 className="min-w-0 break-words text-xl font-bold tracking-tight text-white">
                  {config.businessName}
                </h3>
                <p className="min-w-0 break-words text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {t("footer.tagline")}
                </p>
              </div>
            </div>
            <p className="min-w-0 break-words text-sm leading-relaxed text-stone-400">
              {t("footer.bio")}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.linksHeading")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#destinations" className="transition hover:text-amber-400">
                  {t("nav.destinations")}
                </Link>
              </li>
              <li>
                <Link href="/#packages" className="transition hover:text-amber-400">
                  {t("nav.packages")}
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="transition hover:text-amber-400">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition hover:text-amber-400">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition hover:text-amber-400">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-amber-400">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.contactHeading")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${config.phone}`}
                  className="flex items-center gap-2.5 transition hover:text-amber-400"
                >
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{config.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={t("whatsapp.ariaLabel")}
                  className="flex items-center gap-2.5 transition hover:text-amber-400"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{t("contact.whatsapp")}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2.5 transition hover:text-amber-400 break-all"
                >
                  <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{config.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{config.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-stone-800 pt-8 text-xs text-stone-400 md:flex-row md:justify-between">
          <p className="text-center text-xs text-stone-400 md:text-left">
            {t("footer.copyright", { year: currentYear })}
          </p>
          <Link
            href="/privacy"
            className="inline-link inline-flex items-center text-xs text-stone-400 transition hover:text-stone-200"
          >
            {t("footer.privacy")}
          </Link>
          <p className="inline-flex items-center gap-1 text-xs text-stone-400">
            <span>{t("footer.madeWith")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
