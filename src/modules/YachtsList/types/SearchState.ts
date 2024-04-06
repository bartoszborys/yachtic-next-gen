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