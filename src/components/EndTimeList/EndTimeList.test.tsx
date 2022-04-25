// templates/component/EndTimeList.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import EndTimeList from "./EndTimeList";
import { before, Query } from "../../utils/testHelper";

describe("<EndTimeList />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "EndTimeList",
      <EndTimeList startTime={15} onEndTimeChang={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
