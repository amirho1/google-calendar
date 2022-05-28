// templates/component/DefaultImg.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DefaultImg from "./DefaultImg";
import { before, Query } from "../../utils/testHelper";

describe("<DefaultImg />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("DefaultImg", <DefaultImg />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
