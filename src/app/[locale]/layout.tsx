import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildOrganizationSchema } from "@/lib/schema";
import config from "@/data/config";
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
  const fontClass = locale === "ja"
    ? `${inter.variable} font-noto-jp`
    : `${inter.variable} font-inter`;

  const schema = buildOrganizationSchema(locale as "en" | "de" | "fr" | "ja" | "it");

  return (
    <html
      lang={locale}
      className={`${fontClass} h-full scroll-smooth antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
