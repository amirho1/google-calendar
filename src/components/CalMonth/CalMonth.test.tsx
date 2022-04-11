import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalMonth from "./CalMonth";
import { before, Query } from "../../utils/testHelper";
import {
  convertMonthNumberToName,
  convertPersianNumToEnglish,
  persianMonthsName,
} from "../../utils/helpers";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<CalMonth />", () => {
  const testId = "CalMonth";
  let element: HTMLElement;
  let query: Query;

  beforeEach(() => {
    ({ element, query } = before(
      testId,
      <Provider store={store}>
        <CalMonth />
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should have two span with month and year id and with correct current month name and year number", () => {
    const [year, month, day] = new Intl.DateTimeFormat("fa")
      .format(new Date())
      .split("/");

    const monthElement = query("#month");
    const yearElement = query("#year");
    const monthName = convertMonthNumberToName(
      convertPersianNumToEnglish(month),
      persianMonthsName
    );

    expect(yearElement).toBeInTheDocument();
    expect(monthElement?.innerHTML).toBe(monthName);
    expect(yearElement).toBeInTheDocument();
    expect(+(yearElement?.innerHTML as any)).toBe(
      convertPersianNumToEnglish(year)
    );
  });
});
