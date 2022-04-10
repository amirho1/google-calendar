/* eslint-disable testing-library/no-node-access */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import HoverCircle from "./HoverCircle";
import { before, Query } from "../../utils/testHelper";
import { fireEvent } from "@testing-library/react";

describe("<HoverCircle />", () => {
  const testId = "HoverCircle";
  let element: HTMLElement;
  let query: Query;
  console.log = jest.fn();
  beforeEach(() => {
    ({ element, query } = before(
      testId,
      <HoverCircle
        children={
          <p
            id="p"
            onClick={e => {
              console.log("capture is true");
            }}>
            Hello world
          </p>
        }
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should contains a paragraph tag", () => {
    const p = query("#p");
    expect(element?.children?.length).toBe(1);
    expect(p?.innerHTML).toBe("Hello world");
  });

  it("should event capturing be true", () => {
    fireEvent.click(element);
    expect(console.log).toHaveBeenLastCalledWith("capture is true");
  });
});
