// templates/component/NewEvent.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NewEvent from "./NewEvent";
import { before, Query } from "../../utils/testHelper";

describe("<NewEvent />", () => {
  let query: Query;
  let element: HTMLElement;

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
