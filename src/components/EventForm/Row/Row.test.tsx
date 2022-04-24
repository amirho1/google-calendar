// templates/component/Row.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Row from "./Row";
import { before, Query } from "../../../utils/testHelper";
import { FaPlus } from "react-icons/fa";

describe("<Row />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Row",
      <Row children={<p></p>} icon={<FaPlus />} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
