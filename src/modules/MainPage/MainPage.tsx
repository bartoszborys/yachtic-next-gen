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
            <div className="w-full h-full flex justify-center relative">
                <Image loading="eager" className="absolute w-full h-full z-[-1]" src={'/background.webp'} width={1920} height={1080} alt="" />
                <section className="content-container starting flex flex-col my-auto sm:my-[200px] p-4">
                    <h2 className="mt-1 text-3xl font-bold">{t("JUST_SEARCH_AND_BOOK_A_BOAT")}...</h2>
                    <SearchControls locale={locale} />
                    <button className="mb-1">{t("ADVANCED_SEARCH")}</button>
                </section>
            </div>
            <div className="w-full bg-white flex justify-center py-4">
                <section className="content-container flex w-full flex-col-reverse sm:flex-row">
                    <Image className="self-center" src="/ue.webp" alt="ue" width={74} height={63} />
                    <h1 className="flex-1 text-center text-gray-500 flex flex-col justify-center">
                        <b>{t("EU_DIVIER_TEXT")}</b>
                    </h1>
                </section>
            </div>
            <section className="w-full mt-4 content-container mx-auto flex flex-col justify-center mb-32">
                <CustomerRate />
            </section>
            <section className="w-full mt-4 content-container mx-auto flex flex-col justify-center">
                <Blocks />
            </section>
        </>
    )
}


{/* <LocalizedLink href="/yachts" locale={locale as any}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t("YACHT_LIST_LINK")}</button>
</LocalizedLink> */}