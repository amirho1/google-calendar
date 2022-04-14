/* eslint-disable testing-library/no-node-access */
// templates/component/Task.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Task from "./Task";
import { before, Query } from "../../utils/testHelper";

describe("<Task />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("Task", <Task title="title" />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should has 3 child", () => {
    expect(element?.children.length).toBe(3);
  });

  it("should be ", () => {
    const title = element.children[0];
    expect(title.innerHTML).toBe("title");
  });
});
