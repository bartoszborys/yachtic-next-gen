import { createContext, ReactElement, Suspense } from "react";
import getPermalink from "./fetch/queries/getWebPermalink";
import { PermalinkModel } from "./enums/PermalinkModel";
import { YachtsList } from "../YachtsList/YachtsList";
import PermalinkContext from "../YachtsList/context/PermalinkProvider";
import { redirect } from "next/navigation";
import { ApiQuery } from "@/fetch/ApiQuery";
import { RevalidateTime } from "@/fetch/enums/RevalidateTime";

interface PermalinkProps {
    locale: string;
    permalink: string;
    searchParams: any;
}

interface WebCountriesCollectionAccessCountryDTO {
    id: number;
    name: string;
    url: string;
    regions: {
        id: number;
        name: string;
        url: string;
        locations: {
            id: number;
            name: string;
            url: string;
            latitude: number;
            longitude: number;
        }[];
    }[];
}

export async function Permalink({ locale, permalink, searchParams }: PermalinkProps): Promise<ReactElement> {
    const data = await getPermalink(permalink);

    if (data && data.model === PermalinkModel.COUNTRIES_YACHT_LIST) {
        const value = {
            defaultValue: data.modelId.toString(),
            filterName: "countryId",
            changeCallback: async (value: string) => {
                "use server"
                const x = await ApiQuery<WebCountriesCollectionAccessCountryDTO[]>(
                    "yachts/countries",
                    {
                        init: {
                            next: { revalidate: RevalidateTime.DAY }
                        }
                    }
                );
                const item = x.find(item => item.id.toString() === value);

                if (!item) {
                    throw new Error("Unhandled state");
                }

                redirect(`/${item?.url}`);
            }
        };

        return (
            <PermalinkContext value={value}>
                <Suspense fallback={<div>LOADING</div>}>
                    <YachtsList params={{ locale }} searchParams={searchParams} />
                </Suspense>
            </PermalinkContext>
        )
    }

    return <div>{locale} + {permalink} + {data?.modelId || "EMPTY"}</div>;
}