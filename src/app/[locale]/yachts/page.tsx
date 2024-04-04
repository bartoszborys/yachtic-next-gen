import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Filter from "./components/filter/Filter";
import List, { ListSkeletion } from "./components/list/List";
import StoreProvider from "./components/StoreProvider";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { HookProvider } from "./components/HookProvider";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

export default function Page({ params, searchParams }: { params: { locale: string }, searchParams: { [key: string]: string } }) {
    unstable_setRequestLocale(params.locale);
    const messages = useMessages();
    const t = useTranslations();

    return (
        <>
            <StoreProvider searchParams={searchParams}>
                <div className="mt-4 text-cyan-400 text-sm">
                    <Link href={`/${params.locale}`} locale={params.locale}>Yachtic</Link>
                    <span className="mx-2">{"➤"}</span>
                    <Link href={`/${params.locale}/yachts`} locale={params.locale}>Yachts</Link>
                </div>
                <div className="flex flex-1 h-100">
                    <div className="hidden flex-col w-[225px] mr-4 my-4 lg:flex">
                        <HookProvider>
                            <Filter searchParams={searchParams} />
                        </HookProvider>
                    </div>
                    <div className="flex-1 my-4">
                        <div className="w-100 h-[86px] text-xs p-4 bg-white font-bold text-gray-500">FILTERS (REMOVE ALL FILTERS)</div>
                        <div className="w-100 my-2 flex justify-end text-xs font-bold">
                            <div>Translation: {t("I_NEED_A_SKIPPER")}</div>
                            <div className="bg-white mr-4 p-2 flex transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                                <FontAwesomeIcon className="font-normal text-lg mr-2 text-cyan-500" icon={faShareAlt} />
                                <span>SHARE WITH FRIENDS</span>
                            </div>
                            <div className="bg-white p-2 transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                                <span className="font-normal text-gray-500">PRICE:</span>
                                <span>LOWEST FIRST</span>
                            </div>
                        </div>
                        <div className="d-flex flex-col">
                            <Suspense key={JSON.stringify(searchParams)} fallback={<ListSkeletion />}>
                                <List searchParams={searchParams} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </StoreProvider>
        </>
    );
}

export async function generateStaticParams() {
    return locales.map(async (locale) => ({ locale }));
}