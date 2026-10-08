import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main
      id="main-content"
      className="flex min-h-[60dvh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="text-6xl font-bold text-emerald-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-6 text-lg text-stone-500">{t("message")}</p>
      <div className="mt-10">
        <Link
          href="/"
          className="rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
