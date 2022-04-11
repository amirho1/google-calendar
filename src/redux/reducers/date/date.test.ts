import { dateIncreaseMonth } from "./actions";
import dateReducer, { defaultValue } from "./date";

describe("dateReducer", () => {
  it("to Increase month", () => {
    const { month } = defaultValue;
    let newState = dateReducer(defaultValue, dateIncreaseMonth);
    expect(newState?.month).toBe(month + 1);
  });
});
