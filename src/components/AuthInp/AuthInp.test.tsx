// templates/component/AuthInp.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import AuthInp from "./AuthInp";
import { before, Query } from "../../utils/testHelper";

describe("<AuthInp />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("AuthInp", <AuthInp />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
