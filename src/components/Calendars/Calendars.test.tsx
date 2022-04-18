// templates/component/Calendars.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Calendars from "./Calendars";
import { before, Query } from "../../utils/testHelper";

describe("<Calendars />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Calendars", <Calendars />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
