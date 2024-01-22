import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { useDarkModeContext } from "./context/DarkModeContext";
import Header from "./components/header/Header";

function App() {
  const { darkMode } = useDarkModeContext();
  const bgColor = darkMode ? "bg-dark-dark-blue" : "bg-very-light-gray";

  return (
    <>
      <main
        className={`${bgColor} h-[100vh] font-NunitoSans transition duration-500`}
      >
        <Header />
        <Routes>
          {/* HOMEPAGE */}
          <Route path="/" element={<Home />}></Route>
          {/* COUNTRY DETAILS PAGE */}
          <Route path="/details"></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
