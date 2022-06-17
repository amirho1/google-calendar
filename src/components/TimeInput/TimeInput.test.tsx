// templates/component/TimeInput.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TimeInput from "./TimeInput";
import { before, Query } from "../../utils/testHelper";

describe("<TimeInput />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    // ({ element, query } = before("TimeInput", <TimeInput />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
