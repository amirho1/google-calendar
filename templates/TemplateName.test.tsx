// templates/component/TemplateName.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TemplateName from "./TemplateName";
import { before, Query } from "../../utils/testHelper";

describe("<TemplateName />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("TemplateName", <TemplateName />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
