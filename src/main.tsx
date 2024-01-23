import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DarkModeWrapper } from "./context/DarkModeContext.tsx";
import { SelectCountryWrapper } from "./context/SelectCountryContext.tsx";
import { CountryAPIContextWrapper } from "./context/CountryAPIContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeWrapper>
        <CountryAPIContextWrapper>
          <SelectCountryWrapper>
            <App />
          </SelectCountryWrapper>
        </CountryAPIContextWrapper>
      </DarkModeWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
