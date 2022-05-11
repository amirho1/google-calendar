import "@testing-library/jest-dom/extend-expect";
import { before, Query } from "../../utils/testHelper";
import DateD from "./DateD";

describe("<DateD />", () => {
  console.log = jest.fn();
  let element: HTMLElement;
  let query: Query;
  const monthName = "فروردین";
  const year = 1401;

  beforeEach(() => {
    ({ element, query } = before(
      "DateD",
      <DateD
        monthName={monthName}
        year={year}
        onCLickNext={() => {}}
        onClickPrevious={() => {}}
        nextBtnDataTip={""}
        previousBtnDataTip={""}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should show year and month correctly", () => {
    const yearElement = query("#year");
    const monthElement = query("#month");

    expect(yearElement?.innerHTML).toBe(`${year}`);
    expect(monthElement?.innerHTML).toBe(monthName);
  });
});
