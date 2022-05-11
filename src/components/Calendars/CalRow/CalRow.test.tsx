// templates/component/CalRow.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalRow from "./CalRow";
// import { before, Query } from "../../utils/testHelper";

describe("<CalRow />", () => {
  // let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("CalRow", <CalRow />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
