import { Permalink } from "@/modules/Permalink/Permalink";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { ReactElement } from "react";

interface Props {
  params: { locale: string, permalink: string }
  searchParams: any
}

export default function Page({ params: { locale, permalink}, searchParams }: Props): ReactElement {
  unstable_setRequestLocale(locale);
  return (<Permalink searchParams={searchParams} locale={locale} permalink={permalink} />);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}