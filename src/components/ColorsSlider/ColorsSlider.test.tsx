// templates/component/ColorsSlider.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ColorsSlider from "./ColorsSlider";
import { before, Query } from "../../utils/testHelper";

describe("<ColorsSlider />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "ColorsSlider",
      <ColorsSlider setColorPickerColor={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
