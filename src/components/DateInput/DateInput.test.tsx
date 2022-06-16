// templates/component/DateInput.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DateInput, { dateInputRegex } from "./DateInput";
import { before, Query } from "../../utils/testHelper";

describe("<DateInput />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    // ({ element, query } = before("DateInput", <DateInput />));
  });

  // it("should mount", () => {
  //   expect(element).toBeInTheDocument();
  // });

  test("dateInputRegex should work correctly when the day is from 1 till 31", () => {
    expect(dateInputRegex.test("32 اذر 1375")).toBeFalsy();
    expect(dateInputRegex.test("0 بهمن 1375")).toBeFalsy();
    expect(dateInputRegex.test("31 شهریور 1375")).toBeTruthy();
    expect(dateInputRegex.test("30 شهریور 1375")).toBeTruthy();
  });

  test("dateInputRegex should work correctly while the month names are correct in persian", () => {
    expect(dateInputRegex.test("30 جهریور 1370")).toBeFalsy();
    expect(dateInputRegex.test("28 مهر 2000")).toBeFalsy();
  });
});
