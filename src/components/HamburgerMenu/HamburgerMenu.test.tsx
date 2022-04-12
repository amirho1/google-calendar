import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HamburgerMenu from "./HamburgerMenu";
import { before, Query } from "../../utils/testHelper";

describe("<HamburgerMenu />", () => {
  console.log = jest.fn();
  let element: HTMLElement;
  let query: Query;

  beforeEach(() => {
    ({ element, query } = before(
      "HamburgerMenu",
      <HamburgerMenu
        onClick={() => {
          console.log("hello world");
        }}
      />
    ));
  });

  test("it should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should log hello world on click", () => {
    fireEvent.click(element);
    expect(console.log).toHaveBeenCalledWith("hello world");
  });
});
