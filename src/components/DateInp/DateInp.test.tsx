// templates/component/DateInp.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DateInp from "./DateInp";
import { before, Query } from "../../utils/testHelper";

describe("<DateInp />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "DateInp",
      <DateInp
        onEndTimeChang={() => {}}
        onStartTimeChange={() => {}}
        eventEndTime={"0"}
        eventStartTime={""}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
