import { useState } from "react";
import { Region } from "../../shared/types";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Country } from "../../shared/types";

const regionsArr: Region[] = [
  Region.All,
  Region.Africa,
  Region.Americas,
  Region.Antarctic,
  Region.Asia,
  Region.Europe,
  Region.Ocenia,
];

interface Props {
  setCountryData: (value: Country[]) => void;
  allCountryData: Country[];
}

const RegionFilter = ({ setCountryData, allCountryData }: Props) => {
  const { elementModeStyling } = useDarkModeContext();
  const [region, setRegion] = useState<Region>(Region.All);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleRegionFilter = (value: Region) => {
    let lowerCaseRegion = value.toLocaleLowerCase();
    setRegion(value);
    setToggleMenu(false);
    const filteredRegion = allCountryData.filter((country) => {
      if (lowerCaseRegion === "all") {
        return country.region;
      }
      return country.region.toLocaleLowerCase() === lowerCaseRegion;
    });
    setCountryData(filteredRegion);
  };

  return (
    <div
      className={`${elementModeStyling} relative w-[200px] mb-8 rounded-md text-[14px] transition duration-500`}
    >
      <button
        className="w-full py-[16px] pl-6 text-left"
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
            className={`${elementModeStyling} flex flex-col gap-1 z-10 items-start absolute top-[65px] left-0 w-[200px] p-[16px] rounded-md shadow-md`}
          >
            {regionsArr.map((area) => (
              <button
                key={area}
                className="w-full text-left py-1 rounded-md pl-3 transition duration-500 hover:bg-slate-600 hover:text-white"
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
