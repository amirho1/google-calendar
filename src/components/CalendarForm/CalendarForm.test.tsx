// templates/component/CalendarForm.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalendarForm from "./CalendarForm";
import { before, Query } from "../../utils/testHelper";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<CalendarForm />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "CalendarForm",
      <Provider store={store}>
        <CalendarForm />
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
