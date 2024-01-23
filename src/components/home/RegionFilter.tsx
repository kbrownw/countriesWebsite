import { useEffect, useState } from "react";
import { Region } from "../../shared/types";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useCountryAPIContext } from "../../context/CountryAPIContext";

const regionsArr: Region[] = [
  Region.All,
  Region.Africa,
  Region.Americas,
  Region.Asia,
  Region.Europe,
  Region.Ocenia,
];

const RegionFilter = () => {
  const { elementModeStyling } = useDarkModeContext();
  const [region, setRegion] = useState<Region>(Region.All);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { getCountryData } = useCountryAPIContext();

  const handleRegionFilter = (value: Region) => {
    let lowerCaseRegion = value.toLocaleLowerCase();
    setRegion(value);
    setToggleMenu(false);
    if (value === "All") {
      getCountryData(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
      );
    } else {
      getCountryData(
        `https://restcountries.com/v3.1/region/${lowerCaseRegion}?fields=name,capital,region,population,flags`
      );
    }
  };

  useEffect(() => {
    console.log(region);
  }, [region]);

  return (
    <div
      className={`${elementModeStyling} relative w-[200px] mb-8 rounded-md text-[14px] transition duration-500`}
    >
      <button
        className="w-full p-[16px]  text-left"
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        {region === Region.All ? "Filter by Region" : region}
      </button>
      <motion.div
        initial={{ rotateX: 0 }}
        animate={toggleMenu ? { rotateX: "180deg" } : { rotateX: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute w-[10px] h-[10px] right-5 top-5"
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${elementModeStyling} block w-full h-full transition duration-500 shadow-none `}
        />
      </motion.div>
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`${elementModeStyling} flex flex-col gap-1 items-start absolute top-[65px] left-0 w-[200px] p-[16px] rounded-md`}
          >
            {regionsArr.map((area) => (
              <button
                key={area}
                className="w-full text-left py-1"
                onClick={() => handleRegionFilter(area)}
              >
                {area}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionFilter;
