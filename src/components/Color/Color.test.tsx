// templates/component/Color.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Color from "./Color";
import { before, Query } from "../../utils/testHelper";

describe("<Color />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Color",
      <Color color="blue" onColorChange={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
