// templates/component/NavSettings.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NavSettings from "./NavSettings";
import { before, Query } from "../../utils/testHelper";

describe("<NavSettings />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("NavSettings", <NavSettings />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
