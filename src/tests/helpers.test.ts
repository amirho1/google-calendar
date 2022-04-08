import { monthsName } from "../components/CalMonth/CalMonth";
import {
  convertMonthNumberToName,
  convertPersianNumToEnglish,
} from "../utils/helpers";

describe("helpers", () => {
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

  it("should convert month number to month name", () => {
    expect(convertMonthNumberToName(11, monthsName)).toBe("اسفند");
    expect(convertMonthNumberToName(10, monthsName)).toBe("بهمن");
    expect(convertMonthNumberToName(9, monthsName)).toBe("دی");
    expect(convertMonthNumberToName(8, monthsName)).toBe("آذر");
    expect(convertMonthNumberToName(7, monthsName)).toBe("آبان");
    expect(convertMonthNumberToName(6, monthsName)).toBe("مهر");
    expect(convertMonthNumberToName(5, monthsName)).toBe("شهریور");
    expect(convertMonthNumberToName(4, monthsName)).toBe("مرداد");
    expect(convertMonthNumberToName(3, monthsName)).toBe("تیر");
    expect(convertMonthNumberToName(2, monthsName)).toBe("خرداد");
    expect(convertMonthNumberToName(1, monthsName)).toBe("اردیبهشت");
    expect(convertMonthNumberToName(0, monthsName)).toBe("فروردین");
  });
});
