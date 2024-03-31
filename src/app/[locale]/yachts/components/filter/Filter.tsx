import Checkbox from "./client/FilterCheckbox";
import DateInput from "./client/FilterDate";
import Searches from "./client/FilterSearches";
import FilterSelect from "./client/FilterSelect";
import FilterText from "./client/FilterText";
import RangeSlider from "./client/FilterRangeSlider";
import MinMaxRangeNumber from "./client/FilterMinMaxRange";
import FilterAutocomplete from "./client/FilterAutocomplete";
import {
    getSearches,
    getCountries,
    getKinds,
    getYears,
    getCompanies,
    rates
} from "../../data/filter";


export default async function Filter() {
    const searchesData = await getSearches();
    const kinds = (await getKinds()).map((kind) => ({ name: kind.name, value: kind.id }));
    const countries = (await getCountries()).map(kind => ({ name: kind.name, value: kind.id }));
    const years = getYears().map((year) => ({ name: year.toString(), value: year }));
    const companies = (await getCompanies()).map(company => ({ name: company.name, value: company.id }));

    return (
        <>
            <div className="bg-[#00a0e3] flex flex-col p-5 text-xs">
                <FilterSelect filterName="countries[0][id]" options={countries} description="COUNTRIES" />
                <DateInput filterName="date" text="Date" />
                <div className="flex flex-col">
                    <span>Days</span>
                    <FilterText filterName="days" />
                </div>
            </div>
            <div className="bg-white flex flex-col p-5 text-xs">
                <FilterSelect filterName="kindId" options={kinds} description="BOAT TYPE" />

                <RangeSlider min={1} max={12} filterName={['personsMin', 'personsMax']} text="Persons"/>
                <RangeSlider min={1} max={12} filterName={['berthsMin', 'berthsMax']} text="Berths"/>
                <RangeSlider min={1} max={6} filterName={['cabinsMin', 'cabinsMax']} text="Cabins"/>
                <RangeSlider min={1} max={6} filterName={['toiletsMin', 'toiletsMax']} text="Toilets"/>

                <Checkbox filterName="recommendedFirst" text="Recommended first" />
                <Checkbox filterName="lowFirstInstallment" text="Low first rate" />

                <div className="my-2">
                    <span>WYPOSAŻENIE I DODATKI</span>
                    <Searches data={searchesData} />
                </div>

                <Checkbox filterName="haveLicense" text="Bareboat" />

                <Checkbox filterName="needSkipper" text="I need a skipper" />

                <FilterSelect filterName="ratingMin" options={rates.map((rating) => ({ name: rating.name, value: rating.id }))} description="RATE NOT LESS THAN" />

                <FilterSelect filterName="yearMin" options={years} description="NOT OLDER THAN" />

                <MinMaxRangeNumber label="PRICE (€)" filterName={['personsMin', 'personsMax']} placeholder={['From...', 'To...']}/>
                
                <MinMaxRangeNumber label="LENGTH (M)" filterName={['lengthMin', 'lengthMax']} placeholder={['From...', 'To...']}/>
                <div>
                    <span>NAME OR MODEL</span>
                    <FilterText filterName="name" />
                </div>
                <div>
                    <span>OPERATOR</span>
                    <FilterAutocomplete options={companies} filterName="companyId"/>
                </div>
            </div>
        </>
    );
}
