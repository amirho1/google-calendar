/* eslint-disable testing-library/no-node-access */
// templates/component/TimeLine.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import TimeLine from "./TimeLine";
import { before, Query } from "../../utils/testHelper";

describe("<TimeLine />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("TimeLine", <TimeLine color="red" y={0} />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should set the style top att to given y att", () => {
    expect(element.style.top).toBe("0px");
  });

  it("should set the background color of circle and line to the given color", () => {
    const circle = element.children[0] as HTMLElement;
    expect(element.style.backgroundColor).toBe("red");
    expect(circle.style.backgroundColor).toBe("red");
  });
});
