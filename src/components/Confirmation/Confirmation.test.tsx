// templates/component/Confirmation.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Confirmation from "./Confirmation";
import { before, Query } from "../../utils/testHelper";

describe("<Confirmation />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Confirmation",
      <Confirmation text="" onConfirm={() => {}} onDecline={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
