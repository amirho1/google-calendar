// templates/component/UpdateOrCreate.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import UpdateOrCreate from "./UpdateOrCreate";
import { before, Query } from "../../utils/testHelper";

describe("<UpdateOrCreate />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("UpdateOrCreate", <UpdateOrCreate />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
