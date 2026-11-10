import { NextRequest, NextResponse } from "next/server";
import { getPackageById } from "@/data/packages";
import enMessages from "../../../../messages/en.json";
import deMessages from "../../../../messages/de.json";
import frMessages from "../../../../messages/fr.json";
import jaMessages from "../../../../messages/ja.json";
import itMessages from "../../../../messages/it.json";

type AllowedLocale = "en" | "de" | "fr" | "ja" | "it";

interface LocaleMessages {
  whatsapp: {
    default: string;
    package: string;
  };
  packages: Record<string, { title?: string }>;
}

const MESSAGES_BY_LOCALE: Record<AllowedLocale, LocaleMessages> = {
  en: enMessages as unknown as LocaleMessages,
  de: deMessages as unknown as LocaleMessages,
  fr: frMessages as unknown as LocaleMessages,
  ja: jaMessages as unknown as LocaleMessages,
  it: itMessages as unknown as LocaleMessages,
};

const ALLOWED_LOCALES = new Set<AllowedLocale>(["en", "de", "fr", "ja", "it"]);
const ALLOWED_MSG_TYPES = new Set(["default", "package"]);

// Simple in-memory sliding-window rate limiter per client IP (~30 req/min/IP).
// TODO: Replace in-memory Map with Upstash Redis or Vercel KV for multi-instance production rate limiting.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

function redirectToContact(request: NextRequest, lang: AllowedLocale) {
  const fallbackUrl = new URL(`/${lang}#contact`, request.url).toString();
  return NextResponse.redirect(fallbackUrl, {
    status: 302,
    headers: RESPONSE_HEADERS,
  });
}

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  if (isRateLimited(clientIp)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: RESPONSE_HEADERS,
    });
  }

  const { searchParams } = request.nextUrl;
  const rawLang = searchParams.get("lang");
  const isLangValid =
    rawLang === null || ALLOWED_LOCALES.has(rawLang as AllowedLocale);
  const lang: AllowedLocale =
    rawLang !== null && ALLOWED_LOCALES.has(rawLang as AllowedLocale)
      ? (rawLang as AllowedLocale)
      : "en";

  if (!isLangValid) {
    return redirectToContact(request, lang);
  }

  const rawNumber = process.env.WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  if (!rawNumber) {
    return redirectToContact(request, lang);
  }

  const rawMsg = searchParams.get("msg") ?? "default";
  if (!ALLOWED_MSG_TYPES.has(rawMsg)) {
    return redirectToContact(request, lang);
  }

  const rawPkg = searchParams.get("pkg");
  const localeMessages = MESSAGES_BY_LOCALE[lang];
  let messageText: string;

  if (rawMsg === "package") {
    if (!rawPkg || !getPackageById(rawPkg)) {
      return redirectToContact(request, lang);
    }
    const pkgEntry = localeMessages.packages?.[rawPkg];
    const packageTitle =
      typeof pkgEntry === "object" && pkgEntry !== null && typeof pkgEntry.title === "string"
        ? pkgEntry.title
        : "";
    if (!packageTitle) {
      return redirectToContact(request, lang);
    }
    messageText = localeMessages.whatsapp.package.replace("{package}", packageTitle);
  } else {
    if (rawPkg !== null) {
      return redirectToContact(request, lang);
    }
    messageText = localeMessages.whatsapp.default;
  }

  const destination = `https://wa.me/${rawNumber}?text=${encodeURIComponent(messageText)}`;

  return NextResponse.redirect(destination, {
    status: 302,
    headers: RESPONSE_HEADERS,
  });
}
