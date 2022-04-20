// templates/component/NavMain.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NavMain from "./NavMain";
import { before, Query } from "../../utils/testHelper";

describe("<NavMain />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "NavMain",
      <NavMain closeSideBar={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
