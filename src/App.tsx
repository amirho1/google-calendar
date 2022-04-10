import React from "react";
import styles from "./App.module.scss";
import CalMonth from "./components/CalMonth/CalMonth";
import useTitle from "./hooks/useTitle";
import "./styles/globals.scss";
import ReactTooltip from "react-tooltip";

// it has some problems with types
const ReactTooltipAsAny = ReactTooltip as any;

function App() {
  useTitle("تقویم فارسی گوگل");

  return (
    <div className={`${styles.App} f-center`}>
      {<CalMonth width="300px" height="300px" />}
      <ReactTooltipAsAny />
    </div>
  );
}

export default App;
