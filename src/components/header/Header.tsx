import { Link } from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { darkMode, setDarkMode, elementModeStyling } = useDarkModeContext();

  return (
    <header
      className={`mb-8 transition duration-500 ${elementModeStyling} md:mb-8`}
    >
      <div className="flex justify-between items-center w-[90%] h-[65px] mx-auto md:max-w-[1250px]">
        <Link to="/">
          <h2 className="text-[14px] md:text-[20px]">Where in the world?</h2>
        </Link>
        <button
          className="flex items-center gap-2 text-[14px] md:text-[16px]"
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
          }}
        >
          {darkMode ? (
            <>
              <FontAwesomeIcon icon={faSun} />
              <p>Light Mode</p>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faMoon} />
              <p>Dark Mode</p>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
