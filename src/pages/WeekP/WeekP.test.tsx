// templates/component/WeekP.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import WeekP from "./WeekP";
import { before, Query } from "../../utils/testHelper";

describe("<WeekP />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("WeekP", <WeekP />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
