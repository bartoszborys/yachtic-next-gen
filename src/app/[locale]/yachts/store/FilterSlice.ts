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
  "countries[0][id]": string;
  personsMin: string;
  personsMax: string;
  berthsMin: string;
  berthsMax: string;
  cabinsMin: string;
  cabinsMax: string;
  toiletsMin: string;
  toiletsMax: string;
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
}

const initialState: SearchState = {
  searches: [],
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
  toiletsMin: '',
  toiletsMax: '',
  kindId: '',
  days: '7',
  ratingMin: '',
  yearMin: '',
  priceMin: '',
  priceMax: '',
  lengthMin: '',
  lengthMax: '',
  name: '',
  companyId: ''
};

export const filterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchId: (state, value) => {
      state.searches = [...state.searches, value.payload];
      console.log(state.searches);
    },
    removeSearchId: (state, value) => {
      state.searches = state.searches.filter(item => item !== value.payload);
    },
    updateFlag: (state, value) => {
      //@ts-ignore
      state[value.payload.filterName as keyof SearchState] = value.payload.value;
    },
    initializeSearchSlice: (state: SearchState, value) => {
      const payload = {...value.payload};
      if(payload.searches) {
        payload.searches = payload.searches.split(",").filter((item: string) => item).map((item: string) => parseInt(item));
      }
      Object.assign(state, payload);
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