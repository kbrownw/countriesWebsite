import { useNavigate } from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { useSelectCountryContext } from "../../context/SelectCountryContext";
import { Country } from "../../shared/types";

interface Props {
  country: Country;
}

const CountryCard = ({ country }: Props) => {
  const { elementModeStyling } = useDarkModeContext();
  const { setSelectedCountry } = useSelectCountryContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedCountry(country.name.common);
    navigate("/details");
  };

  return (
    <button
      onClick={handleClick}
      className={`${elementModeStyling} flex flex-col w-[275px] min-h-[375px] pb-5 mx-auto rounded-md overflow-hidden transition duration-500`}
    >
      {/* FLAG IMAGE */}
      <div className="h-[175px] w-full">
        <img
          className="h-full w-full object-cover"
          src={country.flags.svg ? country.flags.svg : country.flags.png}
          alt={country.flags.alt}
        />
      </div>
      {/* COUNTRY DETAILS */}
      <div className="pt-6 px-6 text-left text-[14px]">
        {/* COUNTRY NAME */}
        <h1 className=" font-extrabold text-[22px] pb-5">
          {country.name.common}
        </h1>
        <div className="flex flex-col gap-1">
          {/* POPULATION */}
          <p>
            <span className="font-bold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          {/* REGION */}
          <p>
            <span className="font-bold">Region:</span> {country.region}
          </p>
          {/* CAPITAL */}
          <p>
            <span className="font-bold">Capital:</span> {country.capital[0]}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CountryCard;
