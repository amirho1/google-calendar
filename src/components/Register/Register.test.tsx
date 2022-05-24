// templates/component/Register.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Register from "./Register";
import { before, Query } from "../../utils/testHelper";

describe("<Register />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Register", <Register />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
