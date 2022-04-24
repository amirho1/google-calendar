/* eslint-disable testing-library/no-node-access */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CalMonth from "./CalMonth";
import { before, Query } from "../../utils/testHelper";
import { screen } from "@testing-library/react";
import {
  convertFinglishMonthToPersian,
  convertMonthNumberToName,
  convertPersianNumToEnglish,
  persianMonthsName,
} from "../../utils/helpers";
import { Provider } from "react-redux";
import moment from "moment-jalaali";
import { fireEvent } from "@testing-library/react";
import { Action, combineReducers, createStore } from "redux";
import { DateI } from "../../redux/reducers/date/date";

const defaultValue = ((): DateI => {
  const date = moment("1401/1/1", "jYYYY/jMM/jDD");

  const year = +date.format("jYYYY"),
    month = +date.format("jMM"),
    day = +date.format("jDD") + 1;

  const weekday = date.format("dddd");
  const monthName = convertFinglishMonthToPersian(date.format("jMMMM"));

  return {
    status: "idle",

    date,
  };
})();

const reducer = (state: DateI = defaultValue, action: Action) => {
  return state;
};

const store = createStore(
  combineReducers({
    date: reducer,
  })
);

describe("<CalMonth />", () => {
  const testId = "CalMonth";
  let element: HTMLElement;
  let query: Query;
  let next: HTMLElement;
  beforeEach(() => {
    ({ element, query } = before(
      testId,
      <Provider store={store}>
        <CalMonth onDateChange={() => {}} />
      </Provider>
    ));
    next = screen.getByTestId("next");
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should have two span with month and year id and with correct current month name and year number", () => {
    const [year, month] = new Intl.DateTimeFormat("fa")
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

  it("next  button should change the year and month name", () => {
    const yearElement = query("#year");
    const monthElement = query("#month");
    const d = moment();
    const monthName = d.format("jMMMM");
    const currentYear = +d.format("jYYYY");

    expect(monthElement?.innerHTML).toBe(
      convertFinglishMonthToPersian(monthName.toLowerCase())
    );
    expect(yearElement?.innerHTML).toBe("1401");
    fireEvent.click(next);
    expect(monthElement?.innerHTML).toBe("اردیبهشت");

    for (let i = 0; i < 10; i++) {
      fireEvent.click(next);
    }
    expect(monthElement?.innerHTML).toBe("اسفند");
    fireEvent.click(next);

    expect(yearElement?.innerHTML).toBe(`${currentYear + 1}`);
  });

  it("previous button should change the year and month name", () => {
    const yearElement = query("#year");
    const monthElement = query("#month");
    const d = moment();
    const monthName = d.format("jMMMM");
    const currentYear = +d.format("jYYYY");
    const previous = screen.getByTestId("previous");

    expect(monthElement?.innerHTML).toBe(
      convertFinglishMonthToPersian(monthName.toLowerCase())
    );
    expect(yearElement?.innerHTML).toBe("1401");
    fireEvent.click(previous);
    expect(monthElement?.innerHTML).toBe("اسفند");

    for (let i = 0; i < 11; i++) {
      fireEvent.click(previous);
    }
    expect(monthElement?.innerHTML).toBe("فروردین");
    fireEvent.click(previous);
    expect(monthElement?.innerHTML).toBe("اسفند");
    expect(yearElement?.innerHTML).toBe(`${currentYear - 2}`);
  });

  it("on next element click should change the ui nad numbers base the date", () => {
    const tbody = query("tbody");
    const thirdChildrenOfFirstRow = tbody?.children[0]?.children[2];

    expect(thirdChildrenOfFirstRow?.textContent).toBe("1");

    // after click it should change
    fireEvent.click(next);
    expect(thirdChildrenOfFirstRow?.textContent).toBe("29");
  });
});
