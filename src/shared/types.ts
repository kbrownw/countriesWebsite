export interface DarkMode {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  elementModeStyling: string;
}

export enum Region {
  Africa = "Africa",
  America = "America",
  Asia = "Asia",
  Europe = "Europe",
  Ocenia = "Oceania",
  All = "All",
}
