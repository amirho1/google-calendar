import monthDaysCounter from "../monthDaysCounter";

describe("monthDaysNumber", () => {
  it("should return number", () => {
    expect(typeof monthDaysCounter(2022, 4) === "number").toBeTruthy();
  });
  it("should return the number of days of April 2022", () => {
    expect(monthDaysCounter(2022, 3)).toBe(30);
  });

  it("should return the number of days of May 2022", () => {
    expect(monthDaysCounter(2022, 4)).toBe(31);
  });
});
