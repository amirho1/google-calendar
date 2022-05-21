// templates/component/Logo.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Logo from "./Logo";
import { before, Query } from "../../utils/testHelper";

describe("<Logo />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Logo", <Logo />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
