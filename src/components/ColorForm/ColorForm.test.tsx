// templates/component/ColorForm.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ColorForm from "./ColorForm";
import { before, Query } from "../../utils/testHelper";

describe("<ColorForm />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "ColorForm",
      <ColorForm onColorChange={() => {}} color="" closeColorForm={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
