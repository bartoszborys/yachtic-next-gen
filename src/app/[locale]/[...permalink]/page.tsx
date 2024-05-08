import { Permalink } from "@/modules/Permalink/Permalink";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string, permalink: string }
  searchParams: any
}

export const dynamic = "force-dynamic";
// export const dynamic = 'force-static' // Cookies problem for yacht page

export default async function Page({ params: { locale, permalink}, searchParams}: Props) {
  unstable_setRequestLocale(locale);
  return (<Permalink searchParams={searchParams} locale={locale} rawPermalink={permalink} />);
}

export async function generateStaticParams() {
  return locales.map(locale => ({locale}));
}