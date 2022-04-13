// templates/component/DayP.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DayP from "./DayP";
import { before, Query } from "../../utils/testHelper";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<DayP />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "DayP",
      <Provider store={store}>
        <DayP />
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
