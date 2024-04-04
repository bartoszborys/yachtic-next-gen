import FilterCheckbox from "./controls/FilterCheckbox";
import FilterDate from "./controls/FilterDate";
import FilterSearches from "./controls/FilterSearches";
import FilterSelect from "./controls/FilterSelect";
import FilterText from "./controls/FilterText";
import FilterRangeSlider from "./controls/FilterRangeSlider";
import FilterMinMaxRange from "./controls/FilterMinMaxRange";
import FilterAutocomplete from "./controls/FilterAutocomplete";
import {
    getSearches,
    getCountries,
    getKinds,
    getYears,
    getCompanies,
    rates
} from "../../data/filter";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

const FilterRegions =  dynamic(() => import("./controls/FilterRegions"), {
    loading: () => <p>Loading...</p>,
});

export default async function Filter({searchParams}: {searchParams: {[key: string]: string}}) {
    const searchesData = await getSearches();
    const kinds = (await getKinds()).map((kind) => ({ name: kind.name, value: kind.id }));
    const countriesWhileData = await getCountries();
    const countries = countriesWhileData.map(kind => ({ name: kind.name, value: kind.id }));
    const years = getYears().map((year) => ({ name: year.toString(), value: year }));
    const companies = (await getCompanies()).map(company => ({ name: company.name, value: company.id }));
    const selectedData = countriesWhileData.find(item => item.id.toString() === searchParams["countries[0][id]"]) || null;
    const ratesOptions = rates.map((rating) => ({ name: rating.name, value: rating.id }));
    const t = await getTranslations();

    return (
        <>
            <div className="bg-[#00a0e3] flex flex-col p-5 text-xs">
                <div className="text-white text-xl">{t("SEARCH_BOAT")}</div>
                <FilterSelect filterName="countries[0][id]" options={countries} description={t("COUNTRY")} placeholder={t('ANY_PLACEHOLDER')} />
                <FilterRegions countries={countriesWhileData} defaultData={selectedData}/>
                <FilterDate filterName="date" text="" />
                <div className="flex flex-col">
                    <FilterText filterName="days" />
                </div>
            </div>
            <div className="bg-white flex flex-col p-5 py-2 text-xs">
                <FilterSelect  filterName="kindId" options={kinds} description={t("BOAT_TYPE")} placeholder={t('ANY_PLACEHOLDER')} />

                <FilterRangeSlider min={1} max={12} filterName={['personsMin', 'personsMax']} text={t("PERSONS")} />
                <FilterRangeSlider min={1} max={12} filterName={['berthsMin', 'berthsMax']} text={t("BERTHS")} />
                <FilterRangeSlider min={1} max={6} filterName={['cabinsMin', 'cabinsMax']} text={t("CABINS")} />
                <FilterRangeSlider min={1} max={6} filterName={['bathroomsMin', 'bathroomsMax']} text={t("TOLIETS")} />

                <FilterCheckbox filterName="recommendedFirst" text={t("RECOMMENDED_FIRST")} />
                <FilterCheckbox filterName="lowFirstInstallment" text={t("LOW_FIRST_RATE")} />

                <div className="my-2 text-gray-500">
                    <span>{t('EQUIPMENT_AND_EXTRAS')}</span>
                    <FilterSearches data={searchesData} />
                </div>

                <FilterCheckbox filterName="haveLicense" text={t("BAREBOAT")} />

                <FilterCheckbox filterName="needSkipper" text={t("I_NEED_A_SKIPPER")} />

                <FilterSelect filterName="ratingMin" options={ratesOptions} description={t("RATE_NOT_LESS_THAN")} placeholder={t('ANY_PLACEHOLDER')} />

                <FilterSelect filterName="yearMin" options={years} description={t("NOT_OLDER_THAN")} placeholder={t('ANY_PLACEHOLDER')}/>

                <FilterMinMaxRange label={t('PRICE_WITH_CURRENCY', {currency: '€'})} filterName={['priceMin', 'priceMax']} placeholder={[t("FROM_PLACEHOLDER"), t("TO_PLACEHOLDER")]} />

                <FilterMinMaxRange label={t('LENGTH_WITH_UNIT', {unit: 'M'})} filterName={['lengthMin', 'lengthMax']} placeholder={[t("FROM_PLACEHOLDER"), t("TO_PLACEHOLDER")]} />
                <div className="flex flex-col">
                    <span className="text-gray-500">{t("NAME_OR_MODEL")}</span>
                    <FilterText placeholder={t('ANY_PLACEHOLDER')} filterName="name" />
                </div>
                <div>
                    <span className="text-gray-500">{t("OPERATOR")}</span>
                    <FilterAutocomplete options={companies} filterName="companyId" placeholder={t("ANY_PLACEHOLDER")}/>
                </div>
            </div>
        </>
    );
}
