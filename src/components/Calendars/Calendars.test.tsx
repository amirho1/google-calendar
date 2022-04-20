// templates/component/Calendars.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Calendars from "./Calendars";
import { before, Query } from "../../utils/testHelper";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<Calendars />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Calendars",
      <Provider store={store}>
        <Calendars />
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
