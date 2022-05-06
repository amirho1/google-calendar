// templates/component/ColorPicker.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ColorPicker from "./ColorPicker";
import { before, Query } from "../../utils/testHelper";

describe("<ColorPicker />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "ColorPicker",
      <ColorPicker
        color=""
        onColorChange={() => {}}
        close={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
