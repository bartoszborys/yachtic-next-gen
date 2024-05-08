import { redirect } from "next/navigation";
import PermalinkContext from "@/modules/YachtsList/context/PermalinkProvider";
import { Suspense } from "react";
import { YachtsList } from "@/modules/YachtsList/YachtsList";
import { getCountriesPermalink } from "../fetch/queries/getCountriesPermalink";
import { PermalinkPageProps } from "../props/permalinkPageProps";

export async function CountryYachtList({locale, permalink, searchParams}: PermalinkPageProps) {
    const contextValue = {
        defaultValue: permalink.modelId.toString(),
        filterName: "countryId",
        changeCallback: async (value: string): Promise<never> => {
            "use server"
            const countriesPermalinks = await getCountriesPermalink();
            const item = countriesPermalinks.find(item => item.id.toString() === value);

            if (!item) {
                throw new Error("Unhandled state");
            }

            redirect(`/${item?.url}`);
        }
    };  

    return <PermalinkContext value={contextValue}>
        <Suspense fallback={<div>LOADING</div>}>
            <YachtsList params={{ locale }} searchParams={searchParams} />
        </Suspense>
    </PermalinkContext>
}