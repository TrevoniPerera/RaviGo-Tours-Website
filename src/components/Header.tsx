"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import config from "@/data/config";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Phone, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  currentLocale: string;
}

export default function Header({ currentLocale }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for header shadow & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = ["about", "gallery", "packages", "destinations"];
      const scrollPosition = window.scrollY + 160;

      let current = "home";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          current = sectionId;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle section navigation smoothly
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const navItems = [
    { id: "home", label: t("home"), href: isHomePage ? "#" : `/${currentLocale}` },
    { id: "destinations", label: t("destinations"), href: isHomePage ? "#destinations" : `/${currentLocale}#destinations` },
    { id: "packages", label: t("packages"), href: isHomePage ? "#packages" : `/${currentLocale}#packages` },
    { id: "gallery", label: t("gallery"), href: isHomePage ? "#gallery" : `/${currentLocale}#gallery` },
    { id: "about", label: t("about"), href: isHomePage ? "#about" : `/${currentLocale}#about` },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-header bg-white/95 py-2.5 shadow-md border-b border-stone-200/80"
            : "bg-white/90 py-3.5 backdrop-blur-md border-b border-stone-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link
            href="/"
            onClick={() => handleNavClick("home")}
            className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            aria-label={`${config.businessName} - Home`}
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-emerald-600/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo/logo.jpeg"
                alt="RaviGo Tours Logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-emerald-950 sm:text-xl">
                {config.businessName}
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-amber-700">
                Sri Lanka Local Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = isHomePage && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-800 font-bold bg-emerald-50/80"
                      : "text-stone-700 hover:text-emerald-800 hover:bg-stone-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-amber-500" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Quick Icons + Language Switcher + Contact Button */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Quick Phone Call */}
            <a
              href={`tel:${config.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
              title={`Call ${config.phone}`}
              aria-label={`Call ${config.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Quick WhatsApp */}
            <a
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Contact Button */}
            <Link
              href="/contact"
              className="flex h-10 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <span>{t("contact")}</span>
              <ArrowUpRight className="h-4 w-4 opacity-80" />
            </Link>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t("openMenu")}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-emerald-600">
                  <Image
                    src="/images/logo/logo.jpeg"
                    alt="RaviGo Tours Logo"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-stone-900">{config.businessName}</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
                aria-label={t("closeMenu")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = isHomePage && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        handleNavClick(item.id);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                    )}
                  </a>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-between rounded-xl bg-emerald-700 px-4 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <span>{t("contact")}</span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </nav>

            {/* Language Switcher in drawer */}
            <div className="mt-6 border-t border-stone-200 pt-6">
              <LanguageSwitcher isMobile />
            </div>

            {/* Direct Contact Cards */}
            <div className="mt-auto border-t border-stone-200 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Direct Contact
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${config.phone}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Phone className="h-4 w-4 text-emerald-700" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${config.email}`}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-stone-50 p-2 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Mail className="h-4 w-4 text-emerald-700" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
