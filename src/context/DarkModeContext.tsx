import { createContext, useContext, useState } from "react";
import { DarkMode } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

export const DarkModeContext = createContext<DarkMode | undefined>(undefined);

export const DarkModeWrapper = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const elementModeStyling: string = darkMode
    ? "text-white bg-dark-blue"
    : "text-ligh-dark-blue bg-white shadow-md";

  return (
    <DarkModeContext.Provider
      value={{ darkMode, setDarkMode, elementModeStyling }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const isDarkMode = useContext(DarkModeContext);

  if (!isDarkMode) {
    throw new Error(
      "useDarkModeContext must be used inside the DarkModeWrapper element."
    );
  }

  return isDarkMode;
};
