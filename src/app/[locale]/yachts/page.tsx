import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Filter from "./components/filter/Filter";
import List from "./components/list/List";
import StoreProvider from "./components/StoreProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { HookProvider } from "./components/HookProvider";

export default function Page({ params, searchParams }: { params: { locale: string }, searchParams: { [key: string]: string } }) {
    unstable_setRequestLocale(params.locale);
    const messages = useMessages();

    return (
        <>
            <StoreProvider searchParams={searchParams}>
                <HookProvider>
                    <div className="mt-4 text-cyan-400 text-sm">
                        <Link href={`/${params.locale}`} locale={params.locale}>Yachtic</Link>
                        <span className="mx-2">{"➤"}</span>
                        <Link href={`/${params.locale}/yachts`} locale={params.locale}>Yachts</Link>
                    </div>
                    <div className="flex flex-1 h-100">
                        <div className="hidden flex-col w-[225px] mr-2 my-4 lg:flex">
                            <Filter searchParams={searchParams} />
                        </div>
                        <div className="flex-1 ml-3 my-4">
                            <List searchParams={searchParams} />
                        </div>
                    </div>
                </HookProvider>
            </StoreProvider>
        </>
    );
}

export async function generateStaticParams() {
    return locales.map(async (locale) => ({ locale }));
}