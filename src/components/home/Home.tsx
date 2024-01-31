import { TailSpin } from "react-loader-spinner";
import { useCountryAPIContext } from "../../context/CountryAPIContext";
import { Country } from "../../shared/types";
import CountryCard from "./CountryCard";
import CountrySearch from "./CountrySearch";
import RegionFilter from "./RegionFilter";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { useState } from "react";

interface Props {
  regionFilteredData: Country[];
  setRegionFilteredData: (value: Country[]) => void;
  allCountryData: Country[];
}

const Home = ({
  regionFilteredData,
  setRegionFilteredData,
  allCountryData,
}: Props) => {
  const { isLoading } = useCountryAPIContext();
  const { darkMode } = useDarkModeContext();
  const [searchedData, setSearchedData] =
    useState<Country[]>(regionFilteredData);

  return (
    <div>
      <div className="flex flex-col gap-10 w-[90%] justify-between mx-auto md:flex-row md:max-w-[1250px]">
        {/* SEARCH INPUT */}
        <CountrySearch
          setSearchedData={setSearchedData}
          regionFilteredData={regionFilteredData}
        />
        {/* REGION SELECTION */}
        <RegionFilter
          setRegionFilteredData={setRegionFilteredData}
          allCountryData={allCountryData}
        />
      </div>
      {/* COUNTRY RESULTS */}
      <div
        className={`flex flex-wrap gap-8 max-w-[1250px] justify-center w-[90%] mx-auto md:gap-x-12 mdlg:justify-start`}
      >
        {isLoading && (
          <div className="flex flex-col mx-auto items-center">
            <h1 className="text-[34px] mb-10">Loading Data </h1>
            <TailSpin color={darkMode ? "white" : "hsl(207, 26%, 17%)"} />
          </div>
        )}
        {searchedData.length > 0 &&
          searchedData.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
