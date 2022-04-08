interface CatchI<T = any> {
  [prop: string]: T;
}

interface ConvertPersianNumToEnglishI {
  cache: CatchI<number>;
  (persianNumber: string): number;
}

export const convertPersianNumToEnglish: ConvertPersianNumToEnglishI =
  function (persianNumber: string) {
    if (convertPersianNumToEnglish.cache[persianNumber]) {
      return convertPersianNumToEnglish.cache[persianNumber];
    }

    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";

    let english: string = "";

    persianNumber.split("").forEach(num => {
      if (persianNumbers.includes(num)) {
        english += persianNumbers.split("").findIndex(perNum => num === perNum);
      } else {
        throw new Error(
          `it does include none persian numbers ${persianNumber}`
        );
      }
    });

    convertPersianNumToEnglish.cache[persianNumber] = +english;

    return +english;
  };

convertPersianNumToEnglish.cache = {};

export function convertMonthNumberToName(num: number, monthsName: string[]) {
  if (!monthsName?.length) return "";
  else if (num > 12) throw new Error("Number should be between 0 till 11");

  return monthsName[num];
}
