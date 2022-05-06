// templates/component/Fade.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Fade from "./Fade";
import { before, Query } from "../../utils/testHelper";

describe("<Fade />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Fade", <Fade display={true} />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
