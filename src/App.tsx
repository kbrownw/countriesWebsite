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
  const bgColor = darkMode ? "bg-dark-dark-blue" : "bg-very-light-gray";
  const [countryData, setCountryData] = useState<Country[]>([]);
  const { countries, isLoading, getCountryData } = useCountryAPIContext();
  let url =
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";

  useEffect(() => {
    getCountryData(url);
  }, []);

  useEffect(() => {
    setCountryData(countries);
  }, [countries]);

  return (
    <>
      <main
        className={`${bgColor} min-h-[100vh] h-full font-NunitoSans transition duration-500`}
      >
        <Header />
        <Routes>
          {/* HOMEPAGE */}
          <Route
            path="/"
            element={<Home countryData={countryData} isLoading={isLoading} />}
          ></Route>
          {/* COUNTRY DETAILS PAGE */}
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
