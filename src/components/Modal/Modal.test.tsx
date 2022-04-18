// templates/component/Modal.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Modal from "./Modal";
import { before, Query } from "../../utils/testHelper";
import { fireEvent } from "@testing-library/react";

describe("<Modal />", () => {
  let query: Query;
  let element: HTMLElement;
  const twoHundredPX = 200;
  beforeEach(() => {
    ({ element, query } = before(
      "Modal",
      <Modal
        width={`${twoHundredPX}px`}
        display={false}
        resizeAble={true}
        height={`${twoHundredPX}px`}
        x={200}
        y={200}>
        <p>Hello world</p>
      </Modal>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should mount children in it", () => {
    expect(element.innerHTML).toMatch("Hello world");
  });

  it("should has a display of none with", () => {
    expect(element.style.display).toBe("none");
  });

  it.skip(`should has width and height of ${twoHundredPX}`, () => {
    const width = element.style.width,
      height = element.style.height;

    expect(width).toBe(`${twoHundredPX}px`);
    expect(height).toBe(`${twoHundredPX}px`);
  });

  it("should use the x y coordinate", () => {
    const x = element.style.left;
    const y = element.style.top;
    expect(x).toBe(`${twoHundredPX}px`);
    expect(y).toBe(`${twoHundredPX}px`);
  });

  it.skip("should change the cursor shape while mouse is on bottom border of element", () => {
    fireEvent.mouseMove(element);

    expect(element.style.cursor).toBe("row-resize");
  });
});
