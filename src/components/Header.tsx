"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import config from "@/data/config";
import { getWhatsAppHref } from "@/lib/whatsapp";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Phone, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

// Logo path constant — easily swappable
const LOGO_SRC = "/images/logo/logo.png";
const BRAND_WORDMARK = "RaviGo Tours";
const SECTION_IDS = ["home", "destinations", "packages", "gallery", "about", "contact"] as const;

interface HeaderProps {
  currentLocale: string;
}

export default function Header({}: HeaderProps) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tWhatsapp = useTranslations("whatsapp");
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const whatsappHref = getWhatsAppHref(locale);

  // Monitor scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy using IntersectionObserver on the Home page (never updates URL hash on scroll)
  useEffect(() => {
    if (!isHomePage) return;

    const intersecting = new Set<string>();
    const bandTop = 88;

    const pickActiveSection = () => {
      if (window.scrollY < 40) {
        setActiveSection("home");
        return;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        setActiveSection("contact");
        return;
      }

      const bandBottom = window.innerHeight * 0.45;
      let bestId: string | null = null;
      let bestOverlap = -1;

      for (const id of SECTION_IDS) {
        if (!intersecting.has(id)) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const overlap =
          Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop);
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveSection(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        pickActiveSection();
      },
      {
        rootMargin: "-88px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHomePage]);

  // Close mobile menu on route/hash change & align hash section when arriving from another page (e.g. /privacy)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
    document.body.style.pointerEvents = "";

    if (!isHomePage || typeof window === "undefined") return;

    const scrollToCurrentHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const targetId = hash.slice(1);
      if (!SECTION_IDS.includes(targetId as (typeof SECTION_IDS)[number])) return;
      setActiveSection(targetId);
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top - 80) > 20) {
        el.scrollIntoView();
      }
    };

    const rafId = window.requestAnimationFrame(scrollToCurrentHash);
    const timerId = window.setTimeout(scrollToCurrentHash, 120);

    const handleHashOrPopState = () => {
      setMobileMenuOpen(false);
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      window.requestAnimationFrame(scrollToCurrentHash);
    };

    const handleDocumentHashClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hrefAttr = anchor.getAttribute("href") || "";
      if (
        hrefAttr.startsWith("http") ||
        hrefAttr.startsWith("/go/") ||
        hrefAttr.startsWith("mailto:") ||
        hrefAttr.startsWith("tel:")
      ) {
        return;
      }
      const hashIndex = hrefAttr.indexOf("#");
      if (hashIndex === -1) return;
      const targetId = hrefAttr.slice(hashIndex + 1);
      if (!SECTION_IDS.includes(targetId as (typeof SECTION_IDS)[number])) return;

      window.requestAnimationFrame(() => {
        setActiveSection(targetId);
        const el = document.getElementById(targetId);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (Math.abs(rect.top - 80) > 20) {
          el.scrollIntoView();
        }
      });
    };

    window.addEventListener("hashchange", handleHashOrPopState);
    window.addEventListener("popstate", handleHashOrPopState);
    document.addEventListener("click", handleDocumentHashClick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      window.removeEventListener("hashchange", handleHashOrPopState);
      window.removeEventListener("popstate", handleHashOrPopState);
      document.removeEventListener("click", handleDocumentHashClick);
    };
  }, [pathname, isHomePage]);

  // Lock body scroll when mobile menu is open; close & unlock after link click inside the Sheet
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }

    const drawerEl = document.getElementById("mobile-menu");
    const handleDrawerClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      // Unlock body scroll immediately and close Sheet on the next frame so the click is never interrupted
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";

      const hrefAttr = anchor.getAttribute("href") || "";
      const isExternal =
        hrefAttr.startsWith("http") ||
        hrefAttr.startsWith("/go/") ||
        hrefAttr.startsWith("mailto:") ||
        hrefAttr.startsWith("tel:");
      const hashIndex = isExternal ? -1 : hrefAttr.indexOf("#");

      window.requestAnimationFrame(() => {
        setMobileMenuOpen(false);
        if (hashIndex !== -1 && isHomePage) {
          const targetId = hrefAttr.slice(hashIndex + 1);
          const el = document.getElementById(targetId);
          if (el) {
            setActiveSection(targetId);
            el.scrollIntoView();
          }
        }
      });
    };

    if (drawerEl) {
      drawerEl.addEventListener("click", handleDrawerClick);
    }

    return () => {
      if (drawerEl) {
        drawerEl.removeEventListener("click", handleDrawerClick);
      }
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [mobileMenuOpen, isHomePage]);

  const navItems = [
    { id: "home", label: t("home"), href: "/#home" },
    { id: "destinations", label: t("destinations"), href: "/#destinations" },
    { id: "packages", label: t("packages"), href: "/#packages" },
    { id: "gallery", label: t("gallery"), href: "/#gallery" },
    { id: "about", label: t("about"), href: "/#about" },
  ] as const;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full py-2.5 transition-shadow duration-300 [&_a]:whitespace-nowrap [&_a]:[overflow-wrap:normal] [&_a]:[word-break:normal] [&_button]:whitespace-nowrap [&_button]:[overflow-wrap:normal] [&_button]:[word-break:normal] [&_span]:whitespace-nowrap [&_span]:[overflow-wrap:normal] [&_span]:[word-break:normal] ${
          isScrolled
            ? "glass-header bg-white/95 shadow-md border-b border-stone-200/80"
            : "bg-white/90 backdrop-blur-md border-b border-stone-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 px-2.5 sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link
            href="/#home"
            className="group flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3 whitespace-nowrap [overflow-wrap:normal] [word-break:normal] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            aria-label={`${BRAND_WORDMARK} - ${t("home")}`}
          >
            <Image
              src={LOGO_SRC}
              alt={t("logoAlt")}
              width={134}
              height={100}
              sizes="(max-width: 1279px) 64px, 80px"
              className="h-10 w-auto xl:h-12 shrink-0 object-contain object-left transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex shrink-0 flex-col">
              <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal] text-[15px] min-[360px]:text-base font-bold tracking-tight text-emerald-950 sm:text-lg xl:text-xl leading-tight">
                {BRAND_WORDMARK}
              </span>
              <span className="hidden 2xl:block whitespace-nowrap [overflow-wrap:normal] [word-break:normal] text-[11px] font-medium tracking-wide uppercase text-[var(--color-brand-tagline)] leading-tight">
                {t("brandTagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (xl and up) */}
          <nav
            className="hidden xl:flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 2xl:gap-2"
            aria-label={t("mainNavAriaLabel")}
          >
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap [overflow-wrap:normal] [word-break:normal] px-3 py-2 text-sm 2xl:text-base font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#0C2B92]"
                      : "text-stone-700 hover:text-[#0C2B92]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="relative inline-block py-1 whitespace-nowrap [overflow-wrap:normal] [word-break:normal]">
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 w-full rounded-full bg-gradient-to-r from-[#0C2B92] via-blue-600 to-amber-500"
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Quick Icons + Language Switcher + Contact Button (xl and up) */}
          <div className="hidden xl:flex shrink-0 flex-nowrap items-center gap-2.5">
            {/* Quick Phone Call */}
            <a
              href={`tel:${config.phone}`}
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
              title={t("callPhone", { phone: config.phone })}
              aria-label={t("callPhone", { phone: config.phone })}
            >
              <Phone className="h-4 w-4 shrink-0" />
            </a>

            {/* Quick WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
              title={tWhatsapp("ariaLabel")}
              aria-label={tWhatsapp("ariaLabel")}
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Contact Button */}
            <Link
              href="/#contact"
              aria-current={isHomePage && activeSection === "contact" ? "true" : undefined}
              className="inline-flex h-11 min-h-[44px] min-w-[116px] shrink-0 flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap [overflow-wrap:normal] [word-break:normal] rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal]">
                {t("contact")}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" />
            </Link>
          </div>

          {/* Mobile & Tablet Right Bar: Language Switcher + Hamburger (below xl) */}
          <div className="flex shrink-0 flex-nowrap items-center gap-1.5 sm:gap-2 xl:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t("openMenu")}
            >
              <Menu className="h-6 w-6 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Slide-in Drawer (below xl) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex justify-end xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("mobileNavAriaLabel")}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={LOGO_SRC}
                  alt={t("logoAlt")}
                  width={120}
                  height={90}
                  sizes="64px"
                  className="h-10 w-auto shrink-0 object-contain object-left"
                />
                <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal] font-bold text-stone-900">
                  {BRAND_WORDMARK}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
                aria-label={t("closeMenu")}
              >
                <X className="h-5 w-5 shrink-0" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="mt-6 flex flex-col gap-1.5" aria-label={t("mobileNavAriaLabel")}>
              {navItems.map((item) => {
                const isActive = isHomePage && activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center justify-between whitespace-nowrap [overflow-wrap:normal] [word-break:normal] rounded-xl px-4 py-3 text-base font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-[#0C2B92] font-bold"
                        : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal]">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#0C2B92]" />
                    )}
                  </Link>
                );
              })}

              <Link
                href="/privacy"
                className={`flex items-center justify-between whitespace-nowrap [overflow-wrap:normal] [word-break:normal] rounded-xl px-4 py-3 text-base font-semibold transition ${
                  pathname === "/privacy"
                    ? "bg-blue-50 text-[#0C2B92] font-bold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                }`}
                aria-current={pathname === "/privacy" ? "page" : undefined}
              >
                <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal]">
                  {tFooter("privacy")}
                </span>
                {pathname === "/privacy" && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0C2B92]" />
                )}
              </Link>

              <Link
                href="/#contact"
                className="mt-2 flex items-center justify-between whitespace-nowrap [overflow-wrap:normal] [word-break:normal] rounded-xl bg-emerald-700 px-4 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <span className="whitespace-nowrap [overflow-wrap:normal] [word-break:normal]">
                  {t("contact")}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </Link>
            </nav>

            {/* Language Switcher in drawer */}
            <div className="mt-6 border-t border-stone-200 pt-6">
              <LanguageSwitcher isMobile />
            </div>

            {/* Direct Contact Cards */}
            <div className="mt-auto border-t border-stone-200 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                {t("directContact")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${config.phone}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Phone className="h-4 w-4 text-emerald-700" />
                  <span>{t("call")}</span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={tWhatsapp("ariaLabel")}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <span>{t("whatsapp")}</span>
                </a>
                <a
                  href={`mailto:${config.email}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Mail className="h-4 w-4 text-emerald-700" />
                  <span>{t("email")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
