import { useEffect, useState } from "react";
import { useSelectCountryContext } from "../../context/SelectCountryContext";
import useCountryAPI from "../../hooks/useCountryAPI";
import { Country } from "../../shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import BorderCountries from "./BorderCountries";

interface Props {
  allCountryData: Country[];
  setAllCountryData: (value: Country[]) => void;
}

const Details = ({ allCountryData, setAllCountryData }: Props) => {
  const { selectedCountry } = useSelectCountryContext();
  const [countryDetails, setCountryDetails] = useState<Country>();
  const [languageKeys, setLanguageKeys] = useState<string[]>([]);
  const [currencyKeys, setCurrencyKeys] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string>();
  const [languages, setLanguages] = useState<string>();
  const { countries, isLoading, errorOccurred, getCountryData } =
    useCountryAPI();
  const navigate = useNavigate();
  const [pageError, setPageError] = useState<boolean>(false);

  const getKeys = (country: Country) => {
    if (country) {
      console.log("getKeys Country: ", country);
      setLanguageKeys(Object.keys(country.languages));
      setCurrencyKeys(Object.keys(country.currencies));
    }
  };

  useEffect(() => {
    // Use unknown object keys to get object values, append values to an array,
    // then convert the array to a comma separated list
    if (languageKeys) {
      if (countryDetails) {
        console.log("languageKeys ran.");
        let langArr: string[] = [];
        let currencyArr: string[] = [];
        languageKeys.forEach((key) => {
          langArr.push(countryDetails.languages[key]);
        });
        currencyKeys.forEach((key) => {
          currencyArr.push(countryDetails.currencies[key].name);
        });
        setLanguages(langArr.join(", "));
        setCurrencies(currencyArr.join(", "));
      }
    }
  }, [languageKeys]);

  useEffect(() => {
    if (selectedCountry) {
      getCountryData(`https://restcountries.com/v3.1/alpha/${selectedCountry}`);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countries.length > 0) {
      setCountryDetails(countries[0]);
      sessionStorage.setItem("countryDetails", JSON.stringify(countries[0]));
      getKeys(countries[0]);
    } else if (countries.length < 0 && allCountryData) {
      if (countryDetails) {
        getKeys(countryDetails);
      }
    }
  }, [countries, allCountryData]);

  useEffect(() => {
    setPageError(false);
    if (allCountryData.length < 0) {
      const sessionAllCountryData = sessionStorage.getItem("allCountries");
      console.log(sessionAllCountryData);
      if (sessionAllCountryData) {
        setAllCountryData(JSON.parse(sessionAllCountryData));
      } else {
        setPageError(true);
      }
    }
    if (!selectedCountry) {
      const sessionData = sessionStorage.getItem("countryDetails");
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        setCountryDetails(parsedData);
      }
    } else {
      getCountryData(`https://restcountries.com/v3.1/alpha/${selectedCountry}`);
    }
  }, []);

  if (errorOccurred || pageError) {
    return (
      <div>
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="pr-3" />
          Back
        </Button>
        <h1>Oops....Something went wrong. Try again later!</h1>
      </div>
    );
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {countryDetails !== undefined && (
        <div className="flex flex-col gap-10 w-[80%] justify-between pb-20 mt-20 mx-auto md:max-w-[1250px]">
          {/* BACK BUTTON */}
          <Button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} className="pr-3" />
            Back
          </Button>
          <div className="flex flex-col gap-y-10 mdlg:flex-row mdlg:gap-x-32 mdlg:gap-y-0 mdlg:items-center">
            {/* COUNTRY FLAG - LEFT COLUMN*/}
            <div className="flex basis-[50%] h-auto w-full">
              <img
                className="h-full w-full object-cover"
                src={
                  countryDetails.flags.svg
                    ? countryDetails.flags.svg
                    : countryDetails.flags.png
                }
                alt={countryDetails.flags.alt}
              />
            </div>
            {/* COUNTRY INFO TEXT - RIGHT COLUMN*/}
            <div className="w-full basis-[50%]">
              {/* COUNTRY NAME */}
              <h1 className="text-[22px] mb-10 font-[800] md:text-[30px]">
                {countryDetails.name.official}
              </h1>
              <div className="flex flex-col text-[14px] gap-y-3 md:flex-row md:text-[16px] md:gap-x-5 md:justify-between">
                {/* COUNTRY DETAILS LEFT COLUMN */}
                <div className="flex flex-col gap-3">
                  <p>
                    <span className="font-bold">Native Name:</span>{" "}
                    {languageKeys.length > 0 &&
                      countryDetails.name.nativeName[languageKeys[0]].official}
                  </p>
                  <p>
                    <span className="font-bold">Population: </span>{" "}
                    {countryDetails.population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Region:</span>{" "}
                    {countryDetails.region}
                  </p>
                  <p>
                    <span className="font-bold">Sub Region:</span>{" "}
                    {countryDetails.subregion}
                  </p>
                  <p>
                    <span className="font-bold">Capital:</span>{" "}
                    {countryDetails.capital}
                  </p>
                </div>
                {/* COUNTRY DETAILS RIGHT COLUMN */}
                <div className="flex flex-col gap-3">
                  <p>
                    <span className="font-bold">Top Level Domain:</span>{" "}
                    {countryDetails.tld}
                  </p>
                  <p>
                    <span className="font-bold">Currencies:</span> {currencies}
                  </p>
                  <p>
                    <span className="font-bold">Languages:</span> {languages}
                  </p>
                </div>
              </div>
              {/* BORDER COUNTRIES */}
              {countryDetails.borders && (
                <BorderCountries
                  allCountryData={allCountryData}
                  borderCountries={countryDetails.borders}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
