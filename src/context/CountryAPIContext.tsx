import { createContext, useContext } from "react";
import { CountryAPIContextType } from "../shared/types";
import useCountryAPI from "../hooks/useCountryAPI";

interface Props {
  children: React.ReactNode;
}

export const CountryAPIContext = createContext<
  CountryAPIContextType | undefined
>(undefined);

export const CountryAPIContextWrapper = ({ children }: Props) => {
  const { countries, isLoading, errorOccurred, getCountryData } =
    useCountryAPI();

  return (
    <CountryAPIContext.Provider
      value={{ countries, isLoading, errorOccurred, getCountryData }}
    >
      {children}
    </CountryAPIContext.Provider>
  );
};

export const useCountryAPIContext = () => {
  const isCountryAPI = useContext(CountryAPIContext);

  if (!isCountryAPI) {
    throw new Error(
      "useCountryAPIContext must be used inside the CountryAPIContextWrapper element."
    );
  }

  return isCountryAPI;
};
