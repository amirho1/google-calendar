// templates/component/SettingSidebar.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SettingSidebar from "./SettingSidebar";
import { before, Query } from "../../utils/testHelper";

describe("<SettingSidebar />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("SettingSidebar", <SettingSidebar />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
