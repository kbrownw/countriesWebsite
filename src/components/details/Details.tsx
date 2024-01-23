import { useSelectCountryContext } from "../../context/SelectCountryContext";

type Props = {};

const Details = (props: Props) => {
  const { selectedCountry } = useSelectCountryContext();

  return (
    <div>
      {/* BACK BUTTON */}
      <h1>{selectedCountry}</h1>
      <div>
        {/* COUNTRY FLAG - LEFT COLUMN*/}
        <div>
          {/* COUNTRY DETAILS DIV - RIGHT COLUMN*/}
          <div>{/* COUNTRY NAME */}</div>
          <div>
            {/* COUNTRY DETAILS LEFT COLUMN */}
            {/* COUNTRY DETAILS RIGHT COLUMN */}
          </div>
          <div>{/* BORDER COUNTRIES */}</div>
        </div>
      </div>
    </div>
  );
};

export default Details;
