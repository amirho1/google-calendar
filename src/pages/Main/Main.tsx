import React, { FC } from "react";
import Board from "../../components/Board/Board";
import Plus from "../../components/Plus/Plus";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Main.module.scss";

interface MainProps {
  sideBarDisplay: boolean;
}

const Main: FC<MainProps> = ({ sideBarDisplay }) => {
  return (
    <>
      <Plus
        fullSize={sideBarDisplay}
        onClick={() => console.log("hello world")}
        text={"اضافه کردن"}
        className={styles.Plus}
      />
      <Sidebar
        style={{
          width: sideBarDisplay ? "20px" : "0",
          minWidth: sideBarDisplay ? "260px" : "0",
        }}
      />
      <Board />
    </>
  );
};

export default Main;
