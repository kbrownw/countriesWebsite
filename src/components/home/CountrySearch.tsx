import { useState } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CountrySearch = () => {
  const { darkMode, elementModeStyling } = useDarkModeContext();
  const [searchText, setSearchText] = useState<string>("");
  const placeholderStyle = darkMode ? "placeholder-white" : "";

  return (
    <div className="relative">
      <FontAwesomeIcon
        className={`absolute top-5 left-5 ${elementModeStyling} transition duration-500 shadow-none`}
        icon={faMagnifyingGlass}
      />
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        className={`${elementModeStyling} ${placeholderStyle} w-full py-4 pl-14 rounded-md text-[14px] outline-none transition duration-500 md:w-96`}
      />
    </div>
  );
};

export default CountrySearch;
