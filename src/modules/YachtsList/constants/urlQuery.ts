import { Options } from "nuqs";
import { SearchState } from "../types/SearchState";

export const options: Options = {
    shallow: false,
    throttleMs: 500,
    scroll: false,
} as const;

export const filterDefaults: SearchState = {
    searches: [],
    recommendedFirst: false,
    lowFirstInstallment: false,
    haveLicense: false,
    needSkipper: false,
    date: (() => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    })(),
    countryId: '',
    personsMin: '1',
    personsMax: '12',
    berthsMin: '1',
    berthsMax: '12',
    cabinsMin: '1',
    cabinsMax: '6',
    bathroomsMin: '1',
    bathroomsMax: '6',
    kindId: '',
    days: '7',
    ratingMin: '',
    yearMin: '',
    priceMin: '',
    priceMax: '',
    lengthMin: '',
    lengthMax: '',
    name: '',
    companyId: '',
    page: '2',
} as const;