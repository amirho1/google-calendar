// templates/component/Details.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Details from "./Details";
import { before, Query } from "../../utils/testHelper";
import moment from "moment-jalaali";

describe("<Details />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before(
  //     "Details",
  //     <Details
  //       closeDetails={() => {}}
  //       date={moment()}
  //       startTime={0}
  //     />
  //   ));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
