// templates/component/ColorPickerBoard.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ColorPickerBoard from "./ColorPickerBoard";
import { before, Query } from "../../utils/testHelper";

describe("<ColorPickerBoard />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "ColorPickerBoard",
      <ColorPickerBoard color="" onColorChange={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
