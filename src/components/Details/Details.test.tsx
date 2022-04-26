// templates/component/Details.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Details from "./Details";
import { before, Query } from "../../utils/testHelper";
import moment from "moment-jalaali";

describe("<Details />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Details",
      <Details
        alarm={0}
        title={""}
        calendarName={""}
        date={moment()}
        description={""}
        endTime={0}
        startTime={0}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
