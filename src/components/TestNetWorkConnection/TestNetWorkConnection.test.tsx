// templates/component/TestNetWorkConnection.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TestNetWorkConnection from "./TestNetWorkConnection";
import { before, Query } from "../../utils/testHelper";

describe("<TestNetWorkConnection />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("TestNetWorkConnection", <TestNetWorkConnection />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
