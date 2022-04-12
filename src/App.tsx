import React, { useCallback, useState } from "react";
import styles from "./App.module.scss";
import useTitle from "./hooks/useTitle";
import "./styles/globals.scss";
import ReactTooltip from "react-tooltip";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Plus from "./components/Plus/Plus";
import Board from "./components/Board/Board";
import Modal from "./components/Modal/Modal";

// it has some problems with types
const ReactTooltipAsAny = ReactTooltip as any;

function App() {
  useTitle("تقویم فارسی گوگل");
  const [sideBarDisplay, setSideBarDisplay] = useState(true);

  const closeSideBar = useCallback(() => {
    setSideBarDisplay(previous => !previous);
  }, []);

  return (
    <div className={`${styles.App}`} data-testid="App">
      <ReactTooltipAsAny />
      <NavBar closeSideBar={closeSideBar} />
      <Plus
        fullSize={sideBarDisplay}
        onClick={() => console.log("hello world")}
        text={"اضافه کردن"}
        className={styles.Plus}
      />
      <main className={styles.Main}>
        <Sidebar style={{ width: sideBarDisplay ? "250px" : "0" }} />

        <Modal width="200px" height="200px" display={true} x={200} y={200}>
          <p>Hello world</p>
        </Modal>
        <Board />
      </main>
    </div>
  );
}

export default App;
