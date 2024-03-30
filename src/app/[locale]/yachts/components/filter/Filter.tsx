import Checkbox from "./client/Checkbox";
import DateInput from "./client/Date";
import Searches from "./client/Searches";
import Select from "./client/Select";
import Text from "./client/Text";
import Range from "./client/Range";
import {
    getSearches,
    getCountries,
    getKinds,
    getYears,
    rates
} from "../../data/filter";
import { Slider } from "@mui/material";
import NewSlider from "./client/NewSlider";


export default async function Filter() {
    const searchesData = await getSearches();
    const kinds = await getKinds();
    const countries = await getCountries();
    const years = getYears();

    return (
        <>
            <div className="bg-[#00a0e3] flex flex-col p-5 text-xs">
                <Select filterName="countries[0][id]" options={countries.map(kind => ({ name: kind.name, value: kind.id }))} description="COUNTRIES" />
                <DateInput filterName="date" text="Date" />
                <div className="flex flex-col">
                    <span>Days</span>
                    <Text filterName="days" />
                </div>
            </div>
            <div className="bg-white flex flex-col p-5 text-xs">
                <Select filterName="kindId" options={kinds.map(kind => ({ name: kind.name, value: kind.id }))} description="BOAT_TYPE" />
                    <Slider
                    aria-label="Small steps"
                    defaultValue={0.00000005}
                    step={0.00000001}
                    marks
                    min={-0.00000005}
                    max={0.0000001}
                    />
                    <NewSlider filterName="personsMin" text="PERSONS_MIN"/>
                <Range filterName="personsMin" text="PERSONS_MIN" />
                <Range filterName="personsMax" text="PERSONS_MAX" />

                <Range filterName="berthsMin" text="BERTHS_MIN" />
                <Range filterName="berthsMax" text="BERTHS_MAX" />

                <Range filterName="cabinsMin" text="CABINS_MIN" />
                <Range filterName="cabinsMax" text="CABINS_MAX" />

                <Range filterName="toiletsMin" text="TOILETS_MIN" />
                <Range filterName="toiletsMax" text="TOILETS_MAX" />

                <Checkbox filterName="recommendedFirst" text="RECOMMENDED_FIRST" />
                <Checkbox filterName="lowFirstInstallment" text="LOW_FIRST_RATE" />

                <div className="my-2">
                    <span>WYPOSAŻENIE I DODATKI</span>
                    <Searches data={searchesData} />
                </div>

                <Checkbox filterName="haveLicense" text="BAREBOAT" />

                <Checkbox filterName="needSkipper" text="I_NEED_A_SKIPPER" />

                <Select filterName="ratingMin" options={rates.map((rating) => ({ name: rating.name, value: rating.id }))} description="RATE NOT LESS THAN" />

                <Select filterName="yearMin" options={years.map((year) => ({ name: year.toString(), value: year }))} description="NOT OLDER THAN" />

                <div>
                    <span>PRICE</span>
                    <div>
                        <Text filterName="priceMin" />
                        <Text filterName="priceMax" />
                    </div>
                </div>
                <div>
                    <span>LENGTH</span>
                    <Text filterName="lengthMin" />
                    <Text filterName="lengthMax" />
                </div>
                <div className="">
                    <span>kurwiu</span>
                    <div>
                        <input className="w-[50%]" />
                        <input className="w-[50%]" />
                    </div>
                </div>
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
