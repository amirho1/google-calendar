import React, { FC } from "react";
import styles from "./Board.module.scss";
import { Routes, Route } from "react-router-dom";

interface BoardProps {}

const Board: FC<BoardProps> = () => (
  <div className={styles.Board} data-testid="Board">
    <Routes>
      <Route path="/day" element={<p>day</p>} />
      <Route path="/week" element={<p>week</p>} />
    </Routes>
  </div>
);

export default Board;
