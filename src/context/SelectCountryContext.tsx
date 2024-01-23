import { createContext, useContext, useState } from "react";
import { Country, CountryContext } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

export const SelectCountryContext = createContext<CountryContext | undefined>(
  undefined
);

export const SelectCountryWrapper = ({ children }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<
    Country["name"]["common"]
  >(null!);

  return (
    <SelectCountryContext.Provider
      value={{ selectedCountry, setSelectedCountry }}
    >
      {children}
    </SelectCountryContext.Provider>
  );
};

export const useSelectCountryContext = () => {
  const isSelectCountry = useContext(SelectCountryContext);

  if (!isSelectCountry) {
    throw new Error(
      "useSelectCountryContext must be used inside the SelectCountryWrapper element."
    );
  }

  return isSelectCountry;
};
