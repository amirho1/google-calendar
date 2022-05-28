// templates/component/AcInfo.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import AcInfo from "./AcInfo";
import { before, Query } from "../../utils/testHelper";

describe("<AcInfo />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("AcInfo", <AcInfo />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
