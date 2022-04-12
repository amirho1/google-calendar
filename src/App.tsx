import React from "react";
import styles from "./App.module.scss";
import useTitle from "./hooks/useTitle";
import "./styles/globals.scss";
import ReactTooltip from "react-tooltip";
import NavBar from "./components/NavBar/NavBar";

// it has some problems with types
const ReactTooltipAsAny = ReactTooltip as any;

function App() {
  useTitle("تقویم فارسی گوگل");

  return (
    <div className={`${styles.App}`} data-testid="App">
      <NavBar />
      <ReactTooltipAsAny />
    </div>
  );
}

export default App;
