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
import FilterRegions from "./controls/FilterRegions";


export default async function Filter({searchParams}: {searchParams: {[key: string]: string}}) {
    const searchesData = await getSearches();
    const kinds = (await getKinds()).map((kind) => ({ name: kind.name, value: kind.id }));
    const countriesWhileData = await getCountries();
    const countries = countriesWhileData.map(kind => ({ name: kind.name, value: kind.id }));
    const years = getYears().map((year) => ({ name: year.toString(), value: year }));
    const companies = (await getCompanies()).map(company => ({ name: company.name, value: company.id }));
    const selectedData = countriesWhileData.find(item => item.id.toString() === searchParams["countries[0][id]"]) || null;

    return (
        <>
            <div className="bg-[#00a0e3] flex flex-col p-5 text-xs">
                <div className="text-white text-xl">Search boat</div>
                <FilterSelect filterName="countries[0][id]" options={countries} description="COUNTRY" />
                <FilterRegions countries={countriesWhileData} defaultData={selectedData}/>
                <FilterDate filterName="date" text="" />
                <div className="flex flex-col">
                    <FilterText filterName="days" />
                </div>
            </div>
            <div className="bg-white flex flex-col p-5 py-2 text-xs">
                <FilterSelect filterName="kindId" options={kinds} description="BOAT'S TYPE" />

                <FilterRangeSlider min={1} max={12} filterName={['personsMin', 'personsMax']} text="Persons" />
                <FilterRangeSlider min={1} max={12} filterName={['berthsMin', 'berthsMax']} text="Berths" />
                <FilterRangeSlider min={1} max={6} filterName={['cabinsMin', 'cabinsMax']} text="Cabins" />
                <FilterRangeSlider min={1} max={6} filterName={['toiletsMin', 'toiletsMax']} text="Toilets" />

                <FilterCheckbox filterName="recommendedFirst" text="Recommended first" />
                <FilterCheckbox filterName="lowFirstInstallment" text="Low first rate" />

                <div className="my-2 text-gray-500">
                    <span>EQUIPMENT AND EXTRAS</span>
                    <FilterSearches data={searchesData} />
                </div>

                <FilterCheckbox filterName="haveLicense" text="Bareboat" />

                <FilterCheckbox filterName="needSkipper" text="I need a skipper" />

                <FilterSelect filterName="ratingMin" options={rates.map((rating) => ({ name: rating.name, value: rating.id }))} description="RATE NOT LESS THAN" />

                <FilterSelect filterName="yearMin" options={years} description="NOT OLDER THAN" />

                <FilterMinMaxRange label="PRICE (€)" filterName={['priceMin', 'priceMax']} placeholder={['From...', 'To...']} />

                <FilterMinMaxRange label="LENGTH (M)" filterName={['lengthMin', 'lengthMax']} placeholder={['From...', 'To...']} />
                <div className="flex flex-col">
                    <span className="text-gray-500">NAME OR MODEL</span>
                    <FilterText placeholder="Any ..." filterName="name" />
                </div>
                <div>
                    <span className="text-gray-500">OPERATOR</span>
                    <FilterAutocomplete options={companies} filterName="companyId" />
                </div>
            </div>
        </>
    );
}
