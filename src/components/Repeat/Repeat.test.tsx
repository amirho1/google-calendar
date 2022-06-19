// templates/component/Repeat.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Repeat from "./Repeat";
import { before, Query } from "../../utils/testHelper";

describe("<Repeat />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Repeat", <Repeat />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
