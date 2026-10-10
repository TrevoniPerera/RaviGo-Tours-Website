import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildOrganizationSchema } from "@/lib/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "de" | "fr" | "ja" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  // Apply correct font class per locale
  const fontClass =
    locale === "ja"
      ? `${inter.variable} font-noto-jp`
      : `${inter.variable} font-inter`;

  const schema = buildOrganizationSchema(locale as "en" | "de" | "fr" | "ja" | "it");

  return (
    <html lang={locale} className={`${fontClass} h-full scroll-smooth antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {locale === "ja" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header currentLocale={locale} />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
