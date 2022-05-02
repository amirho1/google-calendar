// templates/component/ContextMenu.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ContextMenu from "./ContextMenu";
import { before, Query } from "../../utils/testHelper";

describe("<ContextMenu />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "ContextMenu",
      <ContextMenu
        closeContextMenu={() => {}}
        calName=""
        id={0}
        timeStamp={0}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
