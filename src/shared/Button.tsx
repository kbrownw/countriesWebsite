import { CSSProperties } from "react";
import { useDarkModeContext } from "../context/DarkModeContext";

interface Props {
  children: React.ReactNode;
  onClick: (value: unknown) => void;
  styles?: CSSProperties;
}

const Button = ({ children, onClick, styles }: Props) => {
  const { elementModeStyling } = useDarkModeContext();

  return (
    <button
      onClick={onClick}
      className={`${elementModeStyling} self-start py-3 px-10 w-auto rounded-md text-[14px] 
            whitespace-nowrap md:text-[16px] hover:bg-slate-600 hover:text-white transition duration-500`}
      style={styles}
    >
      {children}
    </button>
  );
};

export default Button;
