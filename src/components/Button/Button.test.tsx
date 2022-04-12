import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";
import { before, Query } from "../../utils/testHelper";

describe("<Button />", () => {
  let element: HTMLElement;
  let query: Query;
  beforeEach(() => {
    ({ element, query } = before("Button", <Button children={"hello"} />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should contain hello text", () => {
    expect(element.innerHTML).toBe("hello");
  });
});
