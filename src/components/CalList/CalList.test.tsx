// templates/component/CalList.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalList from "./CalList";
import { before, Query } from "../../utils/testHelper";

describe("<CalList />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "CalList",
      <CalList onCalChange={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
