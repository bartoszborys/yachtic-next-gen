import { createSlice } from '@reduxjs/toolkit'

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(today.getDate()).padStart(2, '0');

const todayString = `${year}-${month}-${day}`;

export interface SearchState {
  searches: number[];
  regions: number[];
  locations: number[];
  recommendedFirst: boolean;
  lowFirstInstallment: boolean;
  haveLicense: boolean;
  needSkipper: boolean;
  date: string;
  "countries[0][id]": string;
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
  loader: boolean;
}

const initialState: SearchState & { [key: string]: Array<number> | string | boolean } = {
  searches: [],
  regions: [],
  locations: [],
  recommendedFirst: false,
  lowFirstInstallment: false,
  haveLicense: false,
  needSkipper: false,
  date: todayString,
  'countries[0][id]': '',
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
  loader: false,
};

export function parseParams(params: { [key: string]: string }): SearchState {
  const payload = { ...params };
  // @ts-ignore
  const state: SearchState = Object.assign({}, payload);

  if (payload.searches) {
    state.searches = payload.searches.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
  }

  if (payload.regions) {
    state.regions = payload.regions.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
  }

  if (payload.locations) {
    state.locations = payload.locations.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
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
    addLocations: (state, value: { type: string, payload: number[] }) => {
      value.payload.forEach(location => {
        if (!state.locations.includes(location)) {
          state.locations.push(location);
        }
      });
    },
    removeLocations: (state, value: { type: string, payload: number[] }) => {
      state.locations = state.locations.filter(item => !value.payload.includes(item));
    },
    addRegions: (state, value: { type: string, payload: number[] }) => {
      value.payload.forEach(region => {
        if (!state.regions.includes(region)) {
          state.regions.push(region);
        }
      });
    },
    removeRegions: (state, value: { type: string, payload: number[] }) => {
      state.regions = state.regions.filter(item => !value.payload.includes(item));
    },
    updateFlag: (state, value: { payload: { filterName: keyof SearchState, value: unknown }, type: string }) => {
      //@ts-ignore
      state[value.payload.filterName] = value.payload.value;
    },
    initializeSearchSlice: (state: SearchState, value) => {
      const payload = parseParams(value.payload);
      Object.assign(state, payload);
    }
  }
})

export const {
  addSearchId,
  addLocations,
  addRegions,
  removeLocations,
  removeRegions,
  removeSearchId,
  updateFlag,
  initializeSearchSlice,
} = filterSlice.actions;

export default filterSlice.reducer