import { useState } from "react";
import { Country } from "../shared/types";

const useCountryAPI = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const getCountryData = async (url: string) => {
    let data;
    let response;

    setIsLoading(true);
    setErrorOccurred(false);

    try {
      response = await fetch(url);
    } catch (error) {
      console.log("Fetch error: ", error);
      setErrorOccurred(true);
    }
    if (response) {
      try {
        data = await response.json();
        setCountries(data as Country[]);
      } catch (error) {
        console.log("Error setting data: ", error);
        setErrorOccurred(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { isLoading, countries, errorOccurred, getCountryData };
};

export default useCountryAPI;
