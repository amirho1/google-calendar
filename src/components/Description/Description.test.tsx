// templates/component/Description.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Description from "./Description";
import { before, Query } from "../../utils/testHelper";

describe("<Description />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    // ({ element, query } = before("Description", <Description editorState={} />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
