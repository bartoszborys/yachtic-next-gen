import LocalizedLink from "@/components/LocalizedLink";
import { locales } from "@/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({ params: { locale } }: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <div className="bg-white m-auto mt-[25%] text-center p-4">
        <div className="my-2">{t("MAIN_PAGE_INFO")}</div>
        <LocalizedLink href="/yachts" locale={locale}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t("YACHT_LIST_LINK")}</button>
        </LocalizedLink>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}