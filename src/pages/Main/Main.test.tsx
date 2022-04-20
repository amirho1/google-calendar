// templates/component/Main.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Main from "./Main";
import { before, Query } from "../../utils/testHelper";

describe("<Main />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Main", <Main sideBarDisplay={true} />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
