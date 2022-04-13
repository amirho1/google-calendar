/* eslint-disable testing-library/no-node-access */
// templates/component/Day.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Day from "./Day";
import { before, Query } from "../../utils/testHelper";
import { screen } from "@testing-library/react";
import moment from "moment-jalaali";
import store from "../../redux";
import { Provider } from "react-redux";

describe("<Day />", () => {
  let query: Query;
  let element: HTMLElement;
  let header: Element;
  let info: HTMLElement;

  moment.loadPersian();
  let md = moment();
  let weekday = md.format("dddd");
  let date = md.format("jDD");

  beforeEach(() => {
    ({ element, query } = before(
      "Day",
      <Provider store={store}>
        <Day />
      </Provider>
    ));
    header = element?.children[0];
    info = screen.getByTestId("Info");
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should contain a header", () => {
    expect(header.children.length).toBe(1);
  });

  it("should contain the name of current day", () => {
    expect(info).toBeInTheDocument();
    expect(info.children[0]?.textContent).toBe(weekday);
  });

  it("should contain the date", () => {
    expect(info.children[1]?.textContent).toBe(date);
  });
});
