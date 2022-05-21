// templates/component/Login.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";
import { before, Query } from "../../utils/testHelper";

describe("<Login />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Login", <Login />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
