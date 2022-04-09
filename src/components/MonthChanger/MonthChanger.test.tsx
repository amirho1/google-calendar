import React from "react";
import "@testing-library/jest-dom/extend-expect";
import MonthChanger from "./MonthChanger";
import { before, Query } from "../../utils/testHelper";
import { fireEvent } from "@testing-library/react";

describe("<MonthChanger />", () => {
  const testId = "MonthChanger";
  let element: HTMLElement;
  let query: Query;
  console.log = jest.fn();
  const onCLickNext = () => console.log("next");
  const onClickPrevious = () => console.log("previous");
  let previous: HTMLElement | null;
  let next: HTMLElement | null;

  beforeEach(() => {
    ({ element, query } = before(
      testId,
      <MonthChanger
        onCLickNext={onCLickNext}
        onClickPrevious={onClickPrevious}
      />
    ));

    previous = query("#btn-previous");
    next = query("#btn-next");
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should contain buttons", () => {
    expect(previous).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });

  it("onclick next button  should log the next", () => {
    if (next) fireEvent.click(next);
    expect(console.log).toHaveBeenCalledWith("next");
  });

  it("onclick previous button should log the previous", () => {
    if (previous) fireEvent.click(previous);

    expect(console.log).toHaveBeenCalledWith("previous");
  });
});
