import { useEffect, useState } from "react";
import Button from "../../shared/Button";
import { Country } from "../../shared/types";
import { useSelectCountryContext } from "../../context/SelectCountryContext";

interface Props {
  allCountryData: Country[];
  borderCountries: Country["borders"];
}

const BorderCountries = ({ allCountryData, borderCountries }: Props) => {
  const [fullNameArr, setFullNameArr] = useState<string[][]>([]);
  const { setSelectedCountry } = useSelectCountryContext();

  const getFullName = (countryCode: string) => {
    let itemIndex: number = allCountryData.findIndex((country) => {
      return country.cca3 === countryCode;
    });
    return allCountryData[itemIndex].name.common;
  };

  const handleClick = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  useEffect(() => {
    if (borderCountries.length > 0 && allCountryData.length > 0) {
      let arr: string[][] = [];
      borderCountries.forEach((item) => {
        arr.push([getFullName(item), item]);
      });
      setFullNameArr(arr);
    }
  }, [borderCountries, allCountryData]);

  return (
    <div className="flex flex-col gap-3 mt-10 mdlg:flex-row mdlg:mt-20 mdlg:items-center">
      <p className="font-bold">BorderCountries: </p>
      <div className="flex gap-3 flex-wrap">
        {fullNameArr.length > 0 &&
          fullNameArr.map((country) => {
            return (
              <Button
                key={country[0]}
                onClick={() => handleClick(country[1])}
                styles={{ padding: "5px 10px", fontSize: "14px" }}
              >
                {country[0]}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default BorderCountries;
