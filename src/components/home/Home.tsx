import { TailSpin } from "react-loader-spinner";
import { useCountryAPIContext } from "../../context/CountryAPIContext";
import { Country } from "../../shared/types";
import CountryCard from "./CountryCard";
import CountrySearch from "./CountrySearch";
import RegionFilter from "./RegionFilter";
import { useDarkModeContext } from "../../context/DarkModeContext";

interface Props {
  filteredCountryData: Country[];
  setFilteredCountryData: (value: Country[]) => void;
  allCountryData: Country[];
}

const Home = ({
  filteredCountryData,
  setFilteredCountryData,
  allCountryData,
}: Props) => {
  const { isLoading } = useCountryAPIContext();
  const { darkMode } = useDarkModeContext();

  return (
    <div>
      <div className="flex flex-col gap-10 w-[90%] justify-between mx-auto md:flex-row md:max-w-[1250px]">
        {/* SEARCH INPUT */}
        <CountrySearch
          setFilteredCountryData={setFilteredCountryData}
          allCountryData={allCountryData}
        />
        {/* REGION SELECTION */}
        <RegionFilter
          setCountryData={setFilteredCountryData}
          allCountryData={allCountryData}
        />
      </div>
      {/* COUNTRY RESULTS */}
      <div className="flex flex-wrap gap-8 max-w-[1250px] w-[90%] mx-auto justify-center mdlg:gap-x-12">
        {isLoading && (
          <div className="flex flex-col mx-auto items-center">
            <h1 className="text-[34px] mb-10">Loading Data </h1>
            <TailSpin color={darkMode ? "white" : "hsl(207, 26%, 17%)"} />
          </div>
        )}
        {filteredCountryData.length > 0 &&
          filteredCountryData.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
