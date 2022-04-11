import calculateDaysOrder from "../calculateDaysOrder";

import moment from "moment-jalaali";

describe("calculateDaysOrder", () => {
  it("should return an array with length of 6 and each array should contain 7 number", () => {
    const result = calculateDaysOrder(moment());
    expect(Array.isArray(calculateDaysOrder(moment()))).toBeTruthy();
    expect(result.length).toBe(6);
    result.forEach(innerArr => {
      expect(innerArr.length).toBe(7);
    });
  });

  it("should return 42 number that contains from esfand 1400 and whole Farvardin 1401 also 9 days of Ordibehesht", () => {
    const [firstWeek, secondWeek, thirdWeek, forthWeek, fifthWeek, sixWeek] =
      calculateDaysOrder(moment());

    const firth = [28, 29, 1, 2, 3, 4, 5];
    const second = [6, 7, 8, 9, 10, 11, 12];
    const third = [13, 14, 15, 16, 17, 18, 19];
    const forth = [20, 21, 22, 23, 24, 25, 26];
    const fifth = [27, 28, 29, 30, 31, 1, 2];
    const six = [3, 4, 5, 6, 7, 8, 9];

    expect(firstWeek).toEqual(firth);
    expect(secondWeek).toEqual(second);
    expect(thirdWeek).toEqual(third);
    expect(forthWeek).toEqual(forth);
    expect(fifthWeek).toEqual(fifth);
    expect(sixWeek).toEqual(six);
    expect(sixWeek).not.toEqual(fifth);
  });

  it("should return month of 1400/8", () => {
    const [firstWeek, secondWeek, thirdWeek, forthWeek, fifthWeek, sixWeek] =
      calculateDaysOrder(moment("1400/8", "jYYYY/jMM/"));

    const firth = [1, 2, 3, 4, 5, 6, 7];
    const second = [8, 9, 10, 11, 12, 13, 14];
    const third = [15, 16, 17, 18, 19, 20, 21];
    const forth = [22, 23, 24, 25, 26, 27, 28];
    const fifth = [29, 30, 1, 2, 3, 4, 5];
    const six = [6, 7, 8, 9, 10, 11, 12];

    expect(firstWeek).toEqual(firth);
    expect(secondWeek).toEqual(second);
    expect(thirdWeek).toEqual(third);
    expect(forthWeek).toEqual(forth);
    expect(fifthWeek).toEqual(fifth);
    expect(sixWeek).toEqual(six);
  });

  it("should return month of 1381/8", () => {
    const [firstWeek, secondWeek, thirdWeek, forthWeek, fifthWeek, sixWeek] =
      calculateDaysOrder(moment("1381/8/1", "jYYYY/jMM/jDD"));

    const firth = [27, 28, 29, 30, 1, 2, 3];
    const second = [4, 5, 6, 7, 8, 9, 10];
    const third = [11, 12, 13, 14, 15, 16, 17];
    const forth = [18, 19, 20, 21, 22, 23, 24];
    const fifth = [25, 26, 27, 28, 29, 30, 1];
    const six = [2, 3, 4, 5, 6, 7, 8];

    expect(firstWeek).toEqual(firth);
    expect(secondWeek).toEqual(second);
    expect(thirdWeek).toEqual(third);
    expect(forthWeek).toEqual(forth);
    expect(fifthWeek).toEqual(fifth);
    expect(sixWeek).toEqual(six);
  });
});
