// templates/component/WholeDay.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import WholeDay from "./WholeDay";
import { before, Query } from "../../utils/testHelper";

describe("<WholeDay />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("WholeDay", <WholeDay />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
