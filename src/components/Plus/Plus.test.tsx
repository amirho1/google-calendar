/* eslint-disable testing-library/no-node-access */
import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Plus from "./Plus";
import { before, Query } from "../../utils/testHelper";

describe("<Plus />", () => {
  let element: HTMLElement;
  let query: Query;
  console.log = jest.fn();

  beforeEach(() => {
    ({ element, query } = before(
      "Plus",
      <Plus
        fullSize={true}
        text="create"
        onClick={() => console.log("hello world")}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should contain three child in", () => {
    expect(element?.children.length).toBe(3);
  });

  it("should log on click", () => {
    fireEvent.click(element);

    expect(console.log).toHaveBeenCalledWith("hello world");
  });

  it("on full size text and arrow should display", () => {
    const textElement = element.children[1];
    console.log(textElement);
    // expect(textElement.getAttribute("style")).toBe(true);
  });
});
