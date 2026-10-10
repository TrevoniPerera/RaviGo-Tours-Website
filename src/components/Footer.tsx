"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import config from "@/data/config";
import { Phone, MessageCircle, Mail, MapPin, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-emerald-500/50 shadow-md">
                <Image
                  src="/images/logo/logo.jpeg"
                  alt="RaviGo Tours Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {config.businessName}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {config.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Private, authentic journeys across Sri Lanka with a trusted local guide. Ancient cities, wildlife safaris, tea hills, and pristine beaches designed around your rhythm.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.linksHeading")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#destinations" className="transition hover:text-amber-400">
                  {t("nav.destinations")}
                </a>
              </li>
              <li>
                <a href="#packages" className="transition hover:text-amber-400">
                  {t("nav.packages")}
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-amber-400">
                  {t("nav.gallery")}
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-amber-400">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-amber-400">
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
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-amber-400"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: +{config.whatsapp}</span>
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

          {/* Col 4: Social Links (Placeholders) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.followHeading")}
            </h4>
            <p className="text-xs text-stone-400">
              Connect with us for travel stories, guest reviews, and scenic Sri Lanka captures.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Facebook", "Instagram", "TripAdvisor", "YouTube"].map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1.5 text-xs font-medium text-stone-300 shadow-sm"
                  title={`${platform} (Coming Soon)`}
                >
                  <span>{platform}</span>
                  <ExternalLink className="h-3 w-3 text-stone-500" />
                </span>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 italic">
              Official social channels launching soon. Contact directly on WhatsApp for prompt service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-xs text-stone-400 sm:flex-row">
          <p>{t("footer.copyright", { year: currentYear })}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-stone-200">
              {t("footer.privacy")}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              <span>in Sri Lanka</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
