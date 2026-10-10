import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/contact`,
      languages: buildHreflangAlternates("/contact", config.siteUrl),
    },
  };
}

export default function ContactPage() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
          Get in Touch with RaviGo Tours
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          We are here to help you plan an unforgettable journey across Sri Lanka. Reach out directly through any channel below.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent("Hello Ravi! I'd like to plan a tour in Sri Lanka.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md border border-stone-200 transition hover:-translate-y-1 hover:border-[#25D366] hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366] mb-4 group-hover:bg-[#25D366] group-hover:text-white transition">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">WhatsApp</h2>
          <p className="mt-1 text-sm text-stone-500">Fastest response (under 2 hrs)</p>
          <span className="mt-4 text-xs font-bold text-[#25D366] underline">Chat Now</span>
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${config.phone}`}
          className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md border border-stone-200 transition hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-4 group-hover:bg-amber-500 group-hover:text-white transition">
            <Phone className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Phone Call</h2>
          <p className="mt-1 text-sm text-stone-500">{config.phone}</p>
          <span className="mt-4 text-xs font-bold text-amber-700 underline">Call Direct</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${config.email}`}
          className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md border border-stone-200 transition hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Email</h2>
          <p className="mt-1 text-xs text-stone-500 break-all">{config.email}</p>
          <span className="mt-4 text-xs font-bold text-emerald-700 underline">Send Email</span>
        </a>

        {/* Base Location */}
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md border border-stone-200">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 mb-4">
            <MapPin className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Location</h2>
          <p className="mt-1 text-sm text-stone-500">{config.address}</p>
          <div className="mt-4 flex items-center gap-1 text-xs text-stone-400">
            <Clock className="h-3.5 w-3.5" />
            <span>Sri Lanka (UTC+5:30)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
