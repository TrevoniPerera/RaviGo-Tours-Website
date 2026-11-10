import { getFormatter, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildHreflangAlternates } from "@/lib/utils";
import config from "@/data/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${config.siteUrl}/${locale}/privacy`,
      languages: buildHreflangAlternates("/privacy", config.siteUrl),
    },
    robots: { index: false },
  };
}

const linkClassName =
  "inline-link font-medium text-blue-700 underline underline-offset-4 transition-colors hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm";

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const format = await getFormatter({ locale });

  const parsedEffectiveDate = new Date(config.privacyEffectiveDate);
  const formattedEffectiveDate = Number.isNaN(parsedEffectiveDate.getTime())
    ? t("effectiveDatePending")
    : format.dateTime(parsedEffectiveDate, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const section1Bullets = t.raw(
    "sections.informationWeDoNotCollect.bullets",
  ) as string[];
  const section3Bullets = t.raw("sections.serverLogs.bullets") as string[];

  return (
    <main
      id="main-content"
      className="mx-auto max-w-[720px] px-4 py-12 text-[length:var(--font-size-base)] leading-relaxed text-[var(--color-text)] sm:px-6 sm:py-16"
    >
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {t("title")}
      </h1>

      <div className="mt-4 space-y-1 text-base text-stone-800">
        <p>
          <span className="font-semibold">{t("effectiveDateLabel")}</span>{" "}
          {formattedEffectiveDate}
        </p>
        <p>
          <span className="font-semibold">{t("websiteLabel")}</span>{" "}
          <a
            href={config.siteUrl}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {config.siteUrl}
          </a>
        </p>
      </div>

      <p className="mt-6 text-base text-stone-800 sm:text-[17px]">
        {t("intro")}
      </p>

      <hr className="my-8 border-t border-[var(--color-border)]" />

      <div className="space-y-8 text-base text-stone-800 sm:text-[17px]">
        {/* 1. Information We Do Not Collect */}
        <section aria-labelledby="privacy-section-1">
          <h2
            id="privacy-section-1"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.informationWeDoNotCollect.heading")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            {section1Bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 2. Cookies and Tracking Technologies */}
        <section aria-labelledby="privacy-section-2">
          <h2
            id="privacy-section-2"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.cookiesAndTracking.heading")}
          </h2>
          <p className="mt-3">{t("sections.cookiesAndTracking.body")}</p>
        </section>

        {/* 3. Server Logs and Technical Data */}
        <section aria-labelledby="privacy-section-3">
          <h2
            id="privacy-section-3"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.serverLogs.heading")}
          </h2>
          <p className="mt-3">
            {t("sections.serverLogs.body", { hostName: config.hostName })}
          </p>
          <p className="mt-3">{t("sections.serverLogs.bulletsIntro")}</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            {section3Bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t("sections.serverLogs.outro")}</p>
        </section>

        {/* 4. External Links and Third-Party Services */}
        <section aria-labelledby="privacy-section-4">
          <h2
            id="privacy-section-4"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.externalLinks.heading")}
          </h2>
          <p className="mt-3">{t("sections.externalLinks.body")}</p>
        </section>

        {/* 5. Changes to This Notice */}
        <section aria-labelledby="privacy-section-5">
          <h2
            id="privacy-section-5"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.changes.heading")}
          </h2>
          <p className="mt-3">{t("sections.changes.body")}</p>
        </section>

        {/* 6. Contact Us */}
        <section aria-labelledby="privacy-section-6">
          <h2
            id="privacy-section-6"
            className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl"
          >
            {t("sections.contact.heading")}
          </h2>
          <p className="mt-3">{t("sections.contact.body")}</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              {t("sections.contact.bullets.entity", {
                businessName: config.businessName,
              })}
            </li>
            <li>
              {t("sections.contact.bullets.emailLabel")}{" "}
              <a href={`mailto:${config.email}`} className={linkClassName}>
                {config.email}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
