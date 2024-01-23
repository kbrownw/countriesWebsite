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
  All = "All",
}

export interface Country {
  name: {
    common: string;
    official?: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital: string[];
  altSpellings?: string[];
  subregion?: string;
  region: string;
  population: number;
  latlng?: number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: string;
  flags: {
    svg?: string;
    png?: string;
    alt: string;
  };
  currencies?: [
    {
      code: string;
      name: string;
      symbol: string;
    }
  ];
  languages?: [
    {
      iso639_1?: string;
      iso639_2?: string;
      name: string;
      nativeName: string;
    }
  ];
  translations?: {
    br?: string;
    pt?: string;
    nl?: string;
    hr?: string;
    fa?: string;
    de?: string;
    es?: string;
    fr?: string;
    ja?: string;
    it?: string;
    hu?: string;
  };
  flag?: string;
  regionalBlocs?: [
    {
      acronym: string;
      name: string;
      otherNames?: string[];
    }
  ];
  cioc?: string;
  independent?: boolean;
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
