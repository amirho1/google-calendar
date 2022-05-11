// templates/component/Checkbox.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Checkbox from "./Checkbox";
import { before, Query } from "../../utils/testHelper";

describe("<Checkbox />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Checkbox",
      <Checkbox
        value={false}
        color={""}
        onChange={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
