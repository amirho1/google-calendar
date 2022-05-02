// templates/component/Cal.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Cal from "./Cal";
import { before, Query } from "../../../utils/testHelper";

describe("<Cal />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Cal", <Cal calName="" />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
