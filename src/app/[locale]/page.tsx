import { MainPage } from "@/modules/MainPage/MainPage";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string }
}

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (<MainPage locale={locale} />);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}