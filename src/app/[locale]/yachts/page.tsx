import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Filter from "./components/filter/Filter";
import List from "./components/list/List";
import StoreProvider from "./components/StoreProvider";

export default function Page({params, searchParams} : {params: {locale: string}, searchParams: string[]}) {
    unstable_setRequestLocale(params.locale);
    const t = useTranslations();
    return (
        <>
            <StoreProvider searchParams={searchParams}>
                <div className="mt-4 text-cyan-400">
                    <Link href={`/${params.locale}`} locale={params.locale}>Yachtic</Link>
                </div>
                <div className="flex flex-1 h-100">
                    <div className="hidden flex-col w-[225px] mr-2 my-4 lg:flex">
                        <Filter/>
                    </div>
                    <div className="flex-1 ml-3 my-4 mt-[128px]">
                        <List />
                    </div>
                </div>
            </StoreProvider>
        </>
    );
}

export async function generateStaticParams() {
    return locales.map(async (locale) => ({locale}));
}