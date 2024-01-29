import { useEffect, useState } from "react";
import { useSelectCountryContext } from "../../context/SelectCountryContext";
import useCountryAPI from "../../hooks/useCountryAPI";
import { Country } from "../../shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import BorderCountries from "./BorderCountries";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";

interface Props {
  allCountryData: Country[];
  setAllCountryData: (value: Country[]) => void;
}

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const childVars = {
  hidden: { opacity: 0, x: "200px" },
  show: { opacity: 1, x: "0" },
};

const Details = ({ allCountryData, setAllCountryData }: Props) => {
  const { selectedCountry } = useSelectCountryContext();
  const { darkMode } = useDarkModeContext();
  const [countryDetails, setCountryDetails] = useState<Country>();
  const [languageKeys, setLanguageKeys] = useState<string[]>([]);
  const [currencyKeys, setCurrencyKeys] = useState<string[]>([]);
  const [nativeNameKeys, setNativeNameKeys] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string>();
  const [languages, setLanguages] = useState<string>();
  const [nativeName, setNativeName] = useState<string>();
  const { countries, isLoading, errorOccurred, getCountryData } =
    useCountryAPI();
  const navigate = useNavigate();
  const [pageError, setPageError] = useState<boolean>(false);

  const getKeys = (country: Country) => {
    if (country) {
      setLanguageKeys(Object.keys(country.languages));
      setCurrencyKeys(Object.keys(country.currencies));
      setNativeNameKeys(Object.keys(country.name.nativeName));
    }
  };

  useEffect(() => {
    // Use unknown object keys to get object values, append values to an array,
    // then convert the array to a comma separated list
    if (languageKeys) {
      if (countryDetails) {
        let langArr: string[] = [];
        let currencyArr: string[] = [];
        let nativeNamesArr: string[] = [];
        languageKeys.forEach((key) => {
          langArr.push(countryDetails.languages[key]);
        });
        currencyKeys.forEach((key) => {
          currencyArr.push(countryDetails.currencies[key].name);
        });
        nativeNameKeys.forEach((key) => {
          nativeNamesArr.push(countryDetails.name.nativeName[key].official);
        });
        setLanguages(langArr.join(", "));
        setCurrencies(currencyArr.join(", "));
        setNativeName(nativeNamesArr[0]);
      }
    }
  }, [languageKeys]);

  useEffect(() => {
    //Set country details local variable and session storage to currently selected country if data is pulled from API
    if (countries.length > 0) {
      setCountryDetails(countries[0]);
      sessionStorage.setItem("countryDetails", JSON.stringify(countries[0]));
    }
  }, [countries]);

  useEffect(() => {
    //When countryDetails variable is populated, trigger the getKeys() function
    if (countryDetails) {
      getKeys(countryDetails);
    }
  }, [countryDetails]);

  useEffect(() => {
    setPageError(false);
    if (allCountryData.length < 0) {
      const sessionAllCountryData = sessionStorage.getItem("allCountries");
      if (sessionAllCountryData) {
        console.log("Set AllCountries data from stored session data.");
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
  }, [selectedCountry]);

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
      <div className="flex flex-col gap-10 w-[80%] justify-between pb-20 mt-20 mx-auto md:max-w-[1250px]">
        {/* BACK BUTTON */}
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="pr-3" />
          Back
        </Button>
        {isLoading && (
          <div
            key={"LoadingSpinner"}
            className="flex flex-col mx-auto items-center"
          >
            <h1 className="text-[34px] mb-10">Loading Data </h1>
            <TailSpin color={darkMode ? "white" : "hsl(207, 26%, 17%)"} />
          </div>
        )}
        {countryDetails !== undefined && !isLoading && (
          <motion.div
            key={countryDetails.cca3}
            initial="hidden"
            animate="show"
            variants={containerVars}
            className="flex flex-col gap-y-10 mdlg:flex-row mdlg:gap-x-32 mdlg:gap-y-0 mdlg:items-center"
          >
            {/* COUNTRY FLAG - LEFT COLUMN*/}
            <motion.div
              variants={childVars}
              className="flex basis-[50%] h-auto w-full"
            >
              <img
                className="h-full w-full object-cover"
                src={
                  countryDetails.flags.svg
                    ? countryDetails.flags.svg
                    : countryDetails.flags.png
                }
                alt={countryDetails.flags.alt}
              />
            </motion.div>
            {/* COUNTRY INFO TEXT - RIGHT COLUMN*/}
            <div className="w-full basis-[50%]">
              {/* COUNTRY NAME */}
              <motion.h1
                variants={childVars}
                className="text-[22px] mb-10 font-[800] md:text-[30px]"
              >
                {countryDetails.name.official}
              </motion.h1>
              <div className="flex flex-col text-[14px] gap-y-3 md:flex-row md:text-[16px] md:gap-x-5 md:justify-between">
                {/* COUNTRY DETAILS LEFT COLUMN */}
                <motion.div
                  variants={containerVars}
                  className="flex flex-col gap-3"
                >
                  <motion.p variants={childVars}>
                    <span className="font-bold">Native Name:</span>{" "}
                    {nativeName && nativeName}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Population: </span>{" "}
                    {countryDetails.population.toLocaleString()}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Region:</span>{" "}
                    {countryDetails.region}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Sub Region:</span>{" "}
                    {countryDetails.subregion}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Capital:</span>{" "}
                    {countryDetails.capital}
                  </motion.p>
                </motion.div>
                {/* COUNTRY DETAILS RIGHT COLUMN */}
                <motion.div
                  variants={containerVars}
                  className="flex flex-col gap-3"
                >
                  <motion.p variants={childVars}>
                    <span className="font-bold">Top Level Domain:</span>{" "}
                    {countryDetails.tld}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Currencies:</span> {currencies}
                  </motion.p>
                  <motion.p variants={childVars}>
                    <span className="font-bold">Languages:</span> {languages}
                  </motion.p>
                </motion.div>
              </div>
              {/* BORDER COUNTRIES */}
              {countryDetails.borders && (
                <motion.div variants={childVars}>
                  <BorderCountries
                    allCountryData={allCountryData}
                    borderCountries={countryDetails.borders}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Details;
