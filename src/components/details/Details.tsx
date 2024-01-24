import { useEffect, useState } from "react";
import { useSelectCountryContext } from "../../context/SelectCountryContext";
import useCountryAPI from "../../hooks/useCountryAPI";
import { Country } from "../../shared/types";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Details = () => {
  const { selectedCountry } = useSelectCountryContext();
  const [countryDetails, setCountryDetails] = useState<Country[]>([]);
  const [countryLanguages, setCountryLanguages] = useState<string[]>([]);
  const { countries, isLoading, errorOccurred, getCountryData } =
    useCountryAPI();
  const { darkMode, elementModeStyling } = useDarkModeContext();

  const getLanguages = (country) => {
    if (country) {
      const languages = Object.keys(country.languages);
      setCountryLanguages(languages);
      console.log("Languages: ", languages);
    }
  };

  useEffect(() => {
    getCountryData(`https://restcountries.com/v3.1/alpha/${selectedCountry}`);
  }, []);

  useEffect(() => {
    setCountryDetails(countries);
    getLanguages(countries[0]);
    console.log(selectedCountry);
  }, [countries]);

  if (errorOccurred) {
    return <h1>Oops....Something went wrong. Try again later!</h1>;
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {countryDetails.length > 0 && (
        <div className="flex flex-col gap-10 w-[90%] justify-between mt-20 mx-auto md:max-w-[1250px]">
          {/* BACK BUTTON */}
          <button
            className={`${elementModeStyling} self-start py-3 px-10 w-auto rounded-md text-[14px] md:text-[16px] hover:bg-slate-600 hover:text-white transition duration-500`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pr-3" />
            Back
          </button>
          <div className="flex flex-col md:flex-row md:gap-x-32 md:items-center">
            {/* COUNTRY FLAG - LEFT COLUMN*/}
            <div className="flex h-auto w-full">
              <img
                className="h-full w-full object-cover"
                src={
                  countryDetails[0].flags.svg
                    ? countryDetails[0].flags.svg
                    : countryDetails[0].flags.png
                }
                alt={countryDetails[0].flags.alt}
              />
            </div>
            <div className="w-full">
              {/* COUNTRY DETAILS DIV - RIGHT COLUMN*/}
              <h1 className="text-[22px] mb-10 font-[800] md:text-[30px]">
                {countryDetails[0].name.official}
              </h1>
              <div className="flex flex-col text-[14px] md:flex-row md:text-[16px] md:gap-x-20">
                {/* COUNTRY DETAILS LEFT COLUMN */}
                <div className="flex flex-col gap-3">
                  <p>
                    <span className="font-bold">Native Name:</span>{" "}
                    {
                      countryDetails[0].name.nativeName[countryLanguages[0]]
                        .official
                    }
                  </p>
                  <p>
                    <span className="font-bold">Population: </span>{" "}
                    {countryDetails[0].population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Region:</span>{" "}
                    {countryDetails[0].region}
                  </p>
                  <p>
                    <span className="font-bold">Sub Region:</span>{" "}
                    {countryDetails[0].subregion}
                  </p>
                  <p>
                    <span className="font-bold">Capital:</span>{" "}
                    {countryDetails[0].capital}
                  </p>
                </div>
                {/* COUNTRY DETAILS RIGHT COLUMN */}
                <div className="flex flex-col gap-3">
                  <p>
                    <span className="font-bold">Top Level Domain:</span>{" "}
                    {countryDetails[0].tld}
                  </p>
                  <p>
                    <span className="font-bold">Currencies:</span>{" "}
                    {/* Finish later */}
                  </p>
                </div>
              </div>
              <div>{/* BORDER COUNTRIES */}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
