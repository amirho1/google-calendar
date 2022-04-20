import React, { FC } from "react";
import styles from "./Board.module.scss";
import { Outlet } from "react-router-dom";

interface BoardProps {}

const Board: FC<BoardProps> = () => (
  <div className={styles.Board} data-testid="Board">
    <Outlet />
  </div>
);

export default Board;
