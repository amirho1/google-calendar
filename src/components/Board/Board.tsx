import React, { FC } from "react";
import styles from "./Board.module.scss";
import { Routes } from "react-router-dom";
import routes from "../../pages/routes";

interface BoardProps {}

const Board: FC<BoardProps> = () => (
  <div className={styles.Board} data-testid="Board">
    <Routes>{routes()}</Routes>
  </div>
);

export default Board;
