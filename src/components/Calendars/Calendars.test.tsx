// templates/component/Calendars.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Calendars from "./Calendars";
import { before, Query } from "../../utils/testHelper";
import { Provider } from "react-redux";
import store from "../../redux";
import { BrowserRouter } from "react-router-dom";

describe("<Calendars />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Calendars",
      <BrowserRouter>
        <Provider store={store}>
          <Calendars />
        </Provider>
      </BrowserRouter>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
