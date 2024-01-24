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
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [allCountryData, setAllCountryData] = useState<Country[]>([]);
  const { countries, getCountryData } = useCountryAPIContext();
  let url =
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,ccn3";

  useEffect(() => {
    getCountryData(url);
    setAllCountryData(countries);
  }, []);

  useEffect(() => {
    setCountryData(countries);
    if (allCountryData.length === 0) {
      setAllCountryData(countries);
    }
  }, [countries]);

  return (
    <>
      <main
        className={`${colorMode} min-h-[100vh] h-full font-NunitoSans transition duration-500`}
      >
        <Header />
        <Routes>
          {/* HOMEPAGE */}
          <Route
            path="/"
            element={
              <Home
                countryData={countryData}
                setCountryData={setCountryData}
                allCountryData={allCountryData}
              />
            }
          ></Route>
          {/* COUNTRY DETAILS PAGE */}
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
