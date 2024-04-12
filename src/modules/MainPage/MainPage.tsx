import LocalizedLink from "@/components/LocalizedLink";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { SearchControls } from "./components/SearchControls";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";
import { Blocks } from "./components/Blocks";
import { CustomerRate } from "./components/CustomerRate";

export function MainPage({ locale }: { locale: string }): ReactElement {
    unstable_setRequestLocale(locale);
    const t = useTranslations();

    return (
        <>
            <section className="main-page-search-with-background relative">
                <Image loading="eager" className="absolute w-full h-full z-[-1]" src={'/background.webp'} width={1920} height={1080} alt="" />
                <div className="my-auto sm:my-[200px] justify-center p-4 flex">
                    <div className="content-container starting flex flex-col">
                        <h2 className="mt-1 text-3xl font-bold">{t("JUST_SEARCH_AND_BOOK_A_BOAT")}...</h2>
                        <SearchControls locale={locale} />
                        <button className="mb-1">{t("ADVANCED_SEARCH")}</button>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white flex justify-center py-4">
                <div className="content-container flex w-full flex-col-reverse sm:flex-row">
                    <Image className="self-center" src="/ue.webp" alt="ue" width={74} height={63} />
                    <div className="flex-1 text-center text-gray-500 font-bold flex flex-col justify-center">{t("EU_DIVIER_TEXT")}</div>
                </div>
            </section>
            <section className="w-full flex justify-center mb-32">
                <CustomerRate />
            </section>
            <section className="w-full flex flex-col justify-center">
                <div className="content-container w-full mt-4 flex self-center">
                    <Blocks />
                </div>
            </section>
        </>
    )
}


{/* <LocalizedLink href="/yachts" locale={locale as any}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t("YACHT_LIST_LINK")}</button>
</LocalizedLink> */}