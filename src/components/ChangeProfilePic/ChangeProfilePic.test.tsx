// templates/component/ChangeProfilePic.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ChangeProfilePic from "./ChangeProfilePic";
import { before, Query } from "../../utils/testHelper";

describe("<ChangeProfilePic />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before("ChangeProfilePic", <ChangeProfilePic />));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
