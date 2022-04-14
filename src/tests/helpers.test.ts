/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  addOrSubtractSpecificAmount,
  convertEnglishWeekdaysToPersian,
  convertMonthNumberToName,
  convertPersianNumToEnglish,
  persianMonthsName,
} from "../utils/helpers";

describe("helpers", () => {
  describe("convertPersianNumToEnglish", () => {
    it("should convert persian Numbers to english", () => {
      expect(convertPersianNumToEnglish("۰")).toBe(0);
      expect(convertPersianNumToEnglish("۱")).toBe(1);
      expect(convertPersianNumToEnglish("۲")).toBe(2);
      expect(convertPersianNumToEnglish("۳")).toBe(3);
      expect(convertPersianNumToEnglish("۴")).toBe(4);
      expect(convertPersianNumToEnglish("۵")).toBe(5);
      expect(convertPersianNumToEnglish("۶")).toBe(6);
      expect(convertPersianNumToEnglish("۷")).toBe(7);
      expect(convertPersianNumToEnglish("۸")).toBe(8);
      expect(convertPersianNumToEnglish("۹")).toBe(9);
      expect(convertPersianNumToEnglish("۱۴۰۱")).toBe(1401);
    });
  });

  describe("convertMonthNumberToName", () => {
    it("should convert month number to month name", () => {
      expect(convertMonthNumberToName(12, persianMonthsName)).toBe("اسفند");
      expect(convertMonthNumberToName(11, persianMonthsName)).toBe("بهمن");
      expect(convertMonthNumberToName(10, persianMonthsName)).toBe("دی");
      expect(convertMonthNumberToName(9, persianMonthsName)).toBe("آذر");
      expect(convertMonthNumberToName(8, persianMonthsName)).toBe("آبان");
      expect(convertMonthNumberToName(7, persianMonthsName)).toBe("مهر");
      expect(convertMonthNumberToName(6, persianMonthsName)).toBe("شهریور");
      expect(convertMonthNumberToName(5, persianMonthsName)).toBe("مرداد");
      expect(convertMonthNumberToName(4, persianMonthsName)).toBe("تیر");
      expect(convertMonthNumberToName(3, persianMonthsName)).toBe("خرداد");
      expect(convertMonthNumberToName(2, persianMonthsName)).toBe("اردیبهشت");
      expect(convertMonthNumberToName(1, persianMonthsName)).toBe("فروردین");
    });
  });

  describe("convertEnglishWeekdaysToPersian", () => {
    it("should convert English weekday to persian", () => {
      expect(convertEnglishWeekdaysToPersian("saturday")).toBe("شنبه");
      expect(convertEnglishWeekdaysToPersian("sunday")).toBe("یکشنبه");
      expect(convertEnglishWeekdaysToPersian("monday")).toBe("دوشنبه");
      expect(convertEnglishWeekdaysToPersian("tuesday")).toBe("سه شنبه");
      expect(convertEnglishWeekdaysToPersian("wednesday")).toBe("چهارشنبه");
      expect(convertEnglishWeekdaysToPersian("thursday")).toBe("پنجشنبه");
      expect(convertEnglishWeekdaysToPersian("friday")).toBe("جمعه");
    });
  });

  describe("addOrSubtractSpecificAmount", () => {
    const current = 15;
    it("should add 15 to the current", () => {
      expect(addOrSubtractSpecificAmount(current, 25, 15)).toBe(30);
      expect(addOrSubtractSpecificAmount(current, 23, 15)).toBe(30);
    });

    it.skip("should subtract 15 from current", () => {
      expect(addOrSubtractSpecificAmount(current, 7, 15)).toBe(0);
      expect(addOrSubtractSpecificAmount(current, 10, 15)).toBe(0);
      expect(addOrSubtractSpecificAmount(current, -200, 15)).toBe(0);
    });
  });
});
