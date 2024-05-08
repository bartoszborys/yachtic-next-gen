import { getSiteSetting } from "@/fetch/queries/getSiteSettings";
import { getTranslations } from "next-intl/server";
import { ReactElement } from "react";
import { getCountries } from "../data/filter";

export async function SidebarInfo(): Promise<ReactElement> {
    const settings = await getSiteSetting("yachtCharterDescription");
    const countries = await getCountries();
    const t = getTranslations();

    const countriesList = countries.map(country => {
        return <li className="text-xs list-disc font-bold" key={country.id}>
            <a className="text-[#00a0e3] cursor-pointer">{country.name}</a>
        </li>
    });

    return (
        <>
            <h1 className="border-t border-b border-gray-400 text-gray-400 text-center my-4 py-2">Yachts Charter</h1>
            <div className="text-gray-400 text-xs text-justify">{settings.value}</div>
            <div className="text-xs font-bold mt-2">Choose the yacht charter direction:</div>
            <ul className="ml-4">
                {countriesList}
            </ul>
            <div className="text-xs font-bold mt-2">Search for a yacht for charter:</div>
            <ul className="ml-4">
                <li className="text-xs list-disc font-bold">
                    <a className="text-[#00a0e3] cursor-pointer">Yacht operators</a>
                </li>
                <li className="text-xs list-disc font-bold">
                    <a className="text-[#00a0e3] cursor-pointer">Yacht regions</a>
                </li>
                <li className="text-xs list-disc font-bold">
                    <a className="text-[#00a0e3] cursor-pointer">Available bases</a>
                </li>
            </ul>
        </>
    );
}