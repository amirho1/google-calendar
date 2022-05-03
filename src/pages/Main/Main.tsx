import React, { FC } from "react";
import Board from "../../components/Board/Board";
import Sidebar from "../../components/Sidebar/Sidebar";

interface MainProps {
  sideBarDisplay: boolean;
}

const Main: FC<MainProps> = ({ sideBarDisplay }) => {
  return (
    <>
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
