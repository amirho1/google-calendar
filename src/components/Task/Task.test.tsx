// templates/component/Task.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Task from "./Task";
import { before, Query } from "../../utils/testHelper";

describe("<Task />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Task", <Task />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
