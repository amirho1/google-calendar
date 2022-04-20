// templates/component/CalendarForm.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalendarForm from "./CalendarForm";
import { before, Query } from "../../utils/testHelper";

describe("<CalendarForm />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("CalendarForm", <CalendarForm />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
