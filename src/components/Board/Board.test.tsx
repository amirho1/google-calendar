import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Board from "./Board";
import { before, Query } from "../../utils/testHelper";

describe("<Board />", () => {
  let element: HTMLElement;
  let query: Query;

  beforeEach(() => {
    ({ element, query } = before("Board", <Board />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
