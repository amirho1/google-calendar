// templates/component/UserImage.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import UserImage from "./UserImage";
import { before, Query } from "../../utils/testHelper";

describe("<UserImage />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("UserImage", <UserImage />));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
