import { createSlice } from '@reduxjs/toolkit'

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(today.getDate()).padStart(2, '0');

const todayString = `${year}-${month}-${day}`;

export interface SearchState {
  searches: number[];
  recommendedFirst: boolean;
  lowFirstInstallment: boolean;
  haveLicense: boolean;
  needSkipper: boolean;
  date: string;
  countryId: string;
  personsMin: string;
  personsMax: string;
  berthsMin: string;
  berthsMax: string;
  cabinsMin: string;
  cabinsMax: string;
  bathroomsMin: string;
  bathroomsMax: string;
  kindId: string;
  days: string;
  ratingMin: string;
  yearMin: string;
  priceMin: string;
  priceMax: string;
  lengthMin: string;
  lengthMax: string;
  name: string;
  companyId: string;
  page: string;
}

export function getInitialState(): SearchState & { [key: string]: Array<number> | string | boolean | object } {
  return {
    searches: [],
    recommendedFirst: false,
    lowFirstInstallment: false,
    haveLicense: false,
    needSkipper: false,
    date: todayString,
    countryId: '',
    personsMin: '',
    personsMax: '',
    berthsMin: '',
    berthsMax: '',
    cabinsMin: '',
    cabinsMax: '',
    bathroomsMin: '',
    bathroomsMax: '',
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
  };
} 

const initialState: SearchState & { [key: string]: Array<number> | string | boolean | object } = getInitialState();

export function parseParams(params: { [key: string]: string }): SearchState {
  const payload = { ...params };
  // @ts-ignore
  const state: SearchState = Object.assign(getInitialState(), payload);

  if (payload.searches) {
    state.searches = payload.searches.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
  }

  return state;
}

export const filterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchId: (state, value) => {
      state.searches = [...state.searches, value.payload];
    },
    removeSearchId: (state, value) => {
      state.searches = state.searches.filter(item => item !== value.payload);
    },
    updateFlag: (state, value: { payload: { filterName: keyof SearchState, value: unknown }, type: string }) => {
      //@ts-ignore
      state[value.payload.filterName] = value.payload.value;
    },
    initializeSearchSlice: (state: SearchState, value) => {
      Object.assign(
        state,
        parseParams(value.payload)
      );
    }
  }
})

export const {
  addSearchId,
  removeSearchId,
  updateFlag,
  initializeSearchSlice,
} = filterSlice.actions;

export default filterSlice.reducer