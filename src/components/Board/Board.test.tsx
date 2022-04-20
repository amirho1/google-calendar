import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Board from "./Board";
import { before, Query } from "../../utils/testHelper";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux";
import { Provider } from "react-redux";

describe("<Board />", () => {
  let element: HTMLElement;
  let query: Query;

  beforeEach(() => {
    ({ element, query } = before(
      "Board",
      <BrowserRouter>
        <Provider store={store}>
          <Board />
        </Provider>
      </BrowserRouter>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
