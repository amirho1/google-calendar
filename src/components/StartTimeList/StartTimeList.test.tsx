// templates/component/HourListFrom.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import StartTimeList from "./StartTimeList";
import { before, Query } from "../../utils/testHelper";
import moment from "moment-jalaali";

describe("<StartTimeList />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "StartTimeList",
      <StartTimeList date={moment()} onStartTimeChange={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
