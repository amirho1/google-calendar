// templates/component/DateInp.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DateInp from "./DateInp";
import { before, Query } from "../../utils/testHelper";
import moment from "moment-jalaali";

describe("<DateInp />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "DateInp",
      <DateInp
        onStartTimeChange={() => {}}
        eventEndTime={"0"}
        eventStartTime={""}
        date={moment()}
        onDateChange={() => {}}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
