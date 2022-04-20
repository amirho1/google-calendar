// templates/component/Settings.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Settings from "./Settings";
import { before, Query } from "../../utils/testHelper";

describe("<Settings />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Settings", <Settings />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
