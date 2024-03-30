import Checkbox from "./client/Checkbox";
import DateInput from "./client/Date";
import Searches from "./client/Searches";
import Select from "./client/Select";
import Text from "./client/Text";
import {
    getSearches,
    getCountries,
    getKinds,
    getYears,
    rates
} from "../../data/filter";
import RangeSlider from "./client/RangeSlider";
import MinMaxRangeNumber from "./client/NumberRange";


export default async function Filter() {
    const searchesData = await getSearches();
    const kinds = (await getKinds()).map((kind) => ({ name: kind.name, value: kind.id }));
    const countries = (await getCountries()).map(kind => ({ name: kind.name, value: kind.id }));
    const years = getYears().map((year) => ({ name: year.toString(), value: year }));

    return (
        <>
            <div className="bg-[#00a0e3] flex flex-col p-5 text-xs">
                <Select filterName="countries[0][id]" options={countries} description="COUNTRIES" />
                <DateInput filterName="date" text="Date" />
                <div className="flex flex-col">
                    <span>Days</span>
                    <Text filterName="days" />
                </div>
            </div>
            <div className="bg-white flex flex-col p-5 text-xs">
                <Select filterName="kindId" options={kinds} description="BOAT TYPE" />

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

                <Select filterName="ratingMin" options={rates.map((rating) => ({ name: rating.name, value: rating.id }))} description="RATE NOT LESS THAN" />

                <Select filterName="yearMin" options={years} description="NOT OLDER THAN" />

                <MinMaxRangeNumber label="PRICE (€)" filterName={['personsMin', 'personsMax']} placeholder={['From...', 'To...']}/>
                
                <MinMaxRangeNumber label="LENGTH (M)" filterName={['lengthMin', 'lengthMax']} placeholder={['From...', 'To...']}/>
                <div>
                    <span>NAME OR MODEL</span>
                    <Text filterName="name" />
                </div>
                <div>
                    <span>OPERATOR</span>
                    <Text filterName="companyId" />
                </div>
            </div>
        </>
    );
}
