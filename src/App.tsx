import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { useDarkModeContext } from "./context/DarkModeContext";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { Country } from "./shared/types";
import Details from "./components/details/Details";
import { useCountryAPIContext } from "./context/CountryAPIContext";

function App() {
  const { darkMode } = useDarkModeContext();
  const colorMode = darkMode
    ? "bg-dark-dark-blue text-white"
    : "bg-very-light-gray text-light-dark-blue";
  const [filteredCountryData, setFilteredCountryData] = useState<Country[]>([]);
  const [allCountryData, setAllCountryData] = useState<Country[]>([]);
  const { countries, getCountryData } = useCountryAPIContext();
  let url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    // Look for cached country data in session storage
    const allCountriesStored = sessionStorage.getItem("allCountries");
    if (allCountriesStored) {
      //If found, set the initial filtered countries variable to it along with the allCountries state variable
      setAllCountryData(JSON.parse(allCountriesStored));
      setFilteredCountryData(JSON.parse(allCountriesStored));
    } else {
      //If no session data was found then pull country data from API
      getCountryData(url);
    }
  }, []);

  useEffect(() => {
    //Runs after pulling country data from API
    if (countries.length > 0) {
      //Once data is loaded, cache it to allCountries session storage and set filtered countries state
      sessionStorage.setItem("allCountries", JSON.stringify(countries));
      setFilteredCountryData(countries);
      if (allCountryData.length === 0) {
        //If allCountry data is empty then set the data to it as well
        setAllCountryData(countries);
      }
    }
  }, [countries]);

  return (
    <>
      <main
        className={`${colorMode} min-h-[100vh] h-full overflow-x-hidden font-NunitoSans transition duration-500`}
      >
        <Header />
        <Routes>
          {/* HOMEPAGE */}
          <Route
            path="/"
            element={
              <Home
                filteredCountryData={filteredCountryData}
                setFilteredCountryData={setFilteredCountryData}
                allCountryData={allCountryData}
              />
            }
          ></Route>
          {/* COUNTRY DETAILS PAGE */}
          <Route
            path="/details"
            element={
              <Details
                allCountryData={allCountryData}
                setAllCountryData={setAllCountryData}
              />
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
