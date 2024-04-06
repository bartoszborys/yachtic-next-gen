import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { YachtsList } from "@/modules/YachtsList/YachtsList";

export default function Page({ params, searchParams }: { params: { locale: string }, searchParams: { [key: string]: string } }) {
    unstable_setRequestLocale(params.locale);
    return (
        <>
            <YachtsList params={params} searchParams={searchParams} />
        </>
    );
}

export async function generateStaticParams() {
    return locales.map(async (locale) => ({ locale }));
}