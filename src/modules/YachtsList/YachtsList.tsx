import { ReactNode } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { TopFilters } from "./components/TopFilters";
import SidebarFilter from "./components/SidebarFilters";
import List, { ListSkeletion } from "./components/List";
import { Pagination } from "./components/Pagination";
import { SidebarInfo } from "./components/SidebarInfo";
import ShareMenu from "./components/list-top/ShareMenu";
import SortOrderMenu from "./components/list-top/OrderMenu";

export function YachtsList({ params, searchParams }: { params: { locale: string }, searchParams: { [key: string]: string } }): ReactNode {
    unstable_setRequestLocale(params.locale);
    const t = useTranslations();

    return (
        <section>
            <div className="content-container w-100 mx-auto">
                <div className="mt-4 text-cyan-400 text-sm">
                    <Link href={`/${params.locale}`} locale={params.locale}>Yachtic</Link>
                    <span className="mx-2">{"➤"}</span>
                    <Link href={`/${params.locale}/yachts`} locale={params.locale}>Yachts</Link>
                </div>
                <div className="flex flex-1 h-100">
                    <div className="hidden flex-col w-[225px] mr-4 my-4 lg:flex">
                        <SidebarFilter searchParams={searchParams} />
                        <SidebarInfo />
                    </div>
                    <div className="flex-1 my-4">
                        <div className="w-100 min-h-[86px] text-xs p-4 bg-white font-bold text-gray-500">
                            <TopFilters searchParams={searchParams} />
                        </div>
                        <div className="w-100 my-2 flex justify-end text-xs font-bold">
                            <ShareMenu />
                            <SortOrderMenu filterName="sort" />
                        </div>
                        <div className="d-flex flex-col">
                            <Suspense key={JSON.stringify(searchParams)} fallback={<ListSkeletion />}>
                                <List searchParams={searchParams} />
                            </Suspense>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    );
}