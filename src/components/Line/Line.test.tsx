/* eslint-disable testing-library/no-node-access */
// templates/component/Line.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Line from "./Line";
import { before, Query } from "../../utils/testHelper";

describe("<Line />", () => {
  let query: Query;
  let element: HTMLElement;
  let line: HTMLElement;
  let hour: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Line",
      <Line width="30px" height="1px" color="rgb(51, 51, 51)" hour={10} />
    ));
    line = element.children[1] as HTMLElement;
    hour = element.children[0] as HTMLElement;
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should use the width and height", () => {
    expect(line?.style?.width).toBe("30px");
    expect(line?.style?.height).toBe("1px");
  });

  it("should use the given bg color", () => {
    expect(line.style.backgroundColor).toBe("rgb(51, 51, 51)");
  });

  it("should show a number on the first child", () => {
    expect(hour?.textContent).toBe("10");
  });

  it("shouldn't has a class Name with name of vertical also display of hour should be block", () => {
    expect(line.className).not.toMatch("vertical");
    expect(hour.style.display).toBe("block");
  });

  it("should has className with name of vertical  when vertical is true", () => {
    ({ element, query } = before(
      "Line",
      <Line
        width="30px"
        height="1px"
        color="rgb(51, 51, 51)"
        hour={10}
        vertical={true}
      />
    ));
    line = element.children[1] as HTMLElement;
    hour = element.children[0] as HTMLElement;

    expect(line.className).toMatch("vertical");
    expect(hour.style.display).toBe("none");
  });
});
