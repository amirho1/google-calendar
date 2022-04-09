/* eslint-disable testing-library/no-node-access */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Table, { Row } from "./Table";
import { before, Query } from "../../utils/testHelper";
import { weekDaysInPersianLetters } from "../../utils/helpers";

describe("<Table />", () => {
  const testId = "Table";
  let thead: HTMLElement | null;
  let element: HTMLElement;
  let query: Query;
  let tbody: HTMLElement | null;
  let rows: Row[] = [
    { ش: 1, ی: 2, د: 3, س: 4, چ: 5, پ: 6, ج: 7 },
    { ش: 1, ی: 2, د: 3, س: 4, چ: 5, پ: 6, ج: 7 },
    { ش: 1, ی: 2, د: 3, س: 4, چ: 5, پ: 6, ج: 7 },
  ];

  const tdClassName = "tdClassName",
    className = "className",
    thClassName = "thClassName",
    tbodyClassName = "tbodyClassName",
    theadClassName = "theadClassName",
    trClassName = "trClassName";

  beforeEach(() => {
    ({ element, query } = before(
      testId,
      <Table
        headers={weekDaysInPersianLetters}
        rows={rows}
        className={className}
        tdClassName={tdClassName}
        thClassName={thClassName}
        tbodyClassName={tbodyClassName}
        theadClassName={theadClassName}
        trClassName={trClassName}
      />
    ));
    thead = query("thead");
    tbody = query("tbody");
  });

  it("should mount and be table tag", () => {
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("TABLE");
  });

  it("should has one row in head", () => {
    expect(thead).toBeInTheDocument();
    expect(thead?.className).toMatch(theadClassName);
  });

  it("should contain a row of headers theades should have thClassName", () => {
    const trInHead = query("#trInHead");
    const trChildren: HTMLElement[] = Array.prototype.slice.call(
      trInHead?.children
    );

    expect(thead?.children?.length).toBe(1);
    expect(trChildren.length).toBe(7);
    trChildren.forEach((th, i) => {
      expect(th.innerHTML).toBe(weekDaysInPersianLetters[i]);
      expect(th.className).toMatch(thClassName);
    });
  });

  it("should contain a tbody", () => {
    expect(tbody).toBeInTheDocument();
    expect(tbody?.className).toMatch(tbodyClassName);
  });

  it("tbody should contain three row of numbers and tData should have the given tdClassName", () => {
    const children: HTMLElement[] = Array.prototype.slice.call(tbody?.children);
    const tHeaders = Array.prototype.slice.call(children[0]);

    expect(children.length).toBe(3);

    tHeaders.forEach(child => {
      expect(child.className).toBe(tdClassName);
    });
  });

  it("should get the className", () => {
    expect(element.className).toMatch(className);
  });
});
