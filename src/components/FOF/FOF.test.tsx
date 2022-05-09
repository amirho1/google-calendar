// templates/component/FOF.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import FOF from "./FOF";
import { before, Query } from "../../utils/testHelper";

describe("<FOF />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("FOF", <FOF />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
