import { useCountryAPIContext } from "../../context/CountryAPIContext";
import { Country } from "../../shared/types";
import CountryCard from "./CountryCard";
import CountrySearch from "./CountrySearch";
import RegionFilter from "./RegionFilter";

interface Props {
  countryData: Country[];
  setCountryData: (value: Country[]) => void;
  allCountryData: Country[];
}

const Home = ({ countryData, setCountryData, allCountryData }: Props) => {
  const { isLoading } = useCountryAPIContext();

  return (
    <div>
      <div className="flex flex-col gap-10 w-[90%] justify-between mx-auto md:flex-row md:max-w-[1250px]">
        {/* SEARCH INPUT */}
        <CountrySearch
          setCountryData={setCountryData}
          allCountryData={allCountryData}
        />
        {/* REGION SELECTION */}
        <RegionFilter
          setCountryData={setCountryData}
          allCountryData={allCountryData}
        />
      </div>
      {/* COUNTRY RESULTS */}
      <div
        className="grid gap-8 max-w-[1250px] w-[90%] mx-auto md:gap-y-8 md:gap-x-0 md:justify-around
      md:grid-cols-[repeat(2,_auto)] mdlg:grid-cols-[repeat(3,_auto)]
      mdlg:justify-between lg:grid-cols-[repeat(4,_auto)]"
      >
        {isLoading && <h1>Loading Data...</h1>}
        {countryData.length > 0 &&
          countryData.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
