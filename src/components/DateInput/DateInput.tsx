import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import useKeyDown from "../../hooks/useKeyDown";
import {
  convertFinglishMonthToPersian,
  persianMonthsName,
  stopPropagation,
} from "../../utils/helpers";
import CalMonth from "../CalMonth/CalMonth";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "./DateInput.module.scss";

interface DateInputProps {
  timeStamp: number;
  onChange: (timeStamp: number) => void;
}

export const dateInputRegex =
  /([0-2][0-9]|3[0-1]|[1-9])\s(فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند)\s1[3-9][0-9]{2}/;

const DateInput: FC<DateInputProps> = ({ timeStamp, onChange }) => {
  const [calDisplay, setCalDisplay] = useState(false);
  const date = useMemo(() => moment(timeStamp), [timeStamp]);
  const [day, setDay] = useState(date.jDate());

  const [monthName, setMonthName] = useState(
    convertFinglishMonthToPersian(date.format("jMMMM"))
  );

  const [year, setYear] = useState(date.jYear());

  const [value, setValue] = useState(`${day} ${monthName} ${year}`);

  const onDateChange = useCallback(
    (newDate: Moment) => onChange(newDate.valueOf()),
    [onChange]
  );

  const changeCalDisplay = useCallback(() => {
    setCalDisplay(current => !current);
  }, []);

  const closeCalDisplay = useCallback(() => {
    setCalDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeCalDisplay);
    return () => document.removeEventListener("click", closeCalDisplay);
  }, [closeCalDisplay]);

  useEffect(() => {
    setYear(date.jYear());
    setDay(date.jDate());
    setMonthName(convertFinglishMonthToPersian(date.format("jMMMM")));
  }, [date, timeStamp]);

  const onInputBlur = useCallback(
    (value: string) => {
      const isInputValid = dateInputRegex.test(value);

      if (isInputValid) {
        const [day, monthName, year] = value.split(" ");

        const month =
          persianMonthsName.findIndex(month => monthName === month) + 1;

        const date = moment(`${year}/${month}/${day}`, "jYYYY/jMM/jDD");
        onChange(date.valueOf());
      } else setValue(`${day} ${monthName} ${year}`);
    },
    [onChange, year, day, monthName]
  );

  const onInputChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  useEffect(() => {
    setValue(`${day} ${monthName} ${year}`);
  }, [day, year, monthName]);

  useKeyDown(e => {
    if (e.key === "Escape") closeCalDisplay();
    if (e.key === "Enter") onInputBlur(value);
  });

  return (
    <div className={styles.DateInput}>
      <Input
        onBlur={() => onInputBlur(value)}
        onChange={e => onInputChange(e.currentTarget.value)}
        onClick={e => {
          stopPropagation(e);
          changeCalDisplay();
        }}
        tag={"تاریخ شروع رویداد"}
        small={true}
        value={value}
        inpWrapperClassName={styles.input}
        inputClassName={styles.input}
      />

      <Modal
        display={calDisplay}
        height="fit-content"
        width="250px"
        position="absolute"
        x={-50}
        y={60}
        className={styles.cal}>
        <CalMonth
          className={styles.calendar}
          onDateChange={onDateChange}
          customDate={moment(timeStamp)}
        />
      </Modal>
    </div>
  );
};

export default DateInput;
