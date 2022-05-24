// templates/component/Error.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Error from "./Error";
import { before, Query } from "../../utils/testHelper";

describe("<Error />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Error", <Error />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
