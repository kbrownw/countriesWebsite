export interface DarkMode {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  elementModeStyling: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Ocenia = "Oceania",
  Antarctic = "Antarctic",
  All = "All",
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld?: string[];
  cca2?: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd?: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  translations?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng?: string[];
  landlocked?: boolean;
  borders: string[];
  area?: number;
  demonyms?: {
    f: string;
    m: string;
  };
  flag?: string;
  maps?: {
    [key: string]: string;
  };
  population: number;
  fifa?: string;
  car?: {
    signs: string[];
    side: string;
  };
  timezones?: string[];
  continents?: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms?: {
    png: string;
    svg: string;
  };
  startOfWeek?: string;
  capitalInfo?: {
    latlng: string[];
  };
  postalCode?: {
    format: string;
    regex: string;
  };
}

export interface CountryContext {
  selectedCountry: Country["name"]["common"];
  setSelectedCountry: (value: Country["name"]["common"]) => void;
}

export interface CountryAPIContextType {
  countries: Country[];
  isLoading: boolean;
  errorOccurred: boolean;
  getCountryData: (value: string) => void;
}
