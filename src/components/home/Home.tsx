import CountrySearch from "./CountrySearch";
import RegionFilter from "./RegionFilter";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-10 w-[90%] justify-between mx-auto md:flex-row md:max-w-[1100px]">
        {/* SEARCH INPUT */}
        <CountrySearch />
        {/* REGION SELECTION */}
        <RegionFilter />
      </div>
      {/* COUNTRY RESULTS */}
    </div>
  );
};

export default Home;
