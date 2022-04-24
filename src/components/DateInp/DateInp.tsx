import { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  convertAMPMtoPersia,
  convertEnglishWeekdaysToPersian,
  convertFinglishMonthToPersian,
  convertHoursToMinutes,
} from "../../utils/helpers";
import Button from "../Button/Button";
import CalMonth from "../CalMonth/CalMonth";
import StartTimeList from "../StartTimeList/StartTimeList";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "./DateInp.module.scss";
import EndTimeList from "../EndTimeList/EndTimeList";
import e from "express";

interface DateInpProps {
  date: Moment;
  onDateChange: (newDate: Moment) => void;
  eventStartTime: string;
  className?: string;
  eventEndTime: string;
  onStartTimeChange: (startTime: number) => void;
}

const DateInp: FC<DateInpProps> = ({
  date,
  onDateChange,
  className,
  eventStartTime,
  eventEndTime,
  onStartTimeChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [calendarDisplay, setCalendarDisplay] = useState(false);
  const [startTimeListDisplay, setStartTimeListDisplay] = useState(false);
  const [endTimeListDisplay, setEndTimeListDisplay] = useState(false);
  const weekday = useMemo(
    () =>
      convertEnglishWeekdaysToPersian(date.format("dddd").toLowerCase() as any),
    [date]
  );

  const day = useMemo(() => date.jDate(), [date]);
  const monthName = useMemo(
    () => convertFinglishMonthToPersian(date.format("jMMMM")),
    [date]
  );

  // change the to editable
  const onInputsWrapperClick = useCallback(e => {
    setIsEditMode(true);
  }, []);

  const closeModals = useCallback(() => {
    setCalendarDisplay(false);
    setStartTimeListDisplay(false);
  }, []);

  useEffect(() => {
    // close calendar on document click
    document.addEventListener("click", closeModals);

    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, [closeModals]);

  const changeCalendarDisplay = useCallback(
    e => {
      if (isEditMode) e.stopPropagation();
      setCalendarDisplay(current => !current);
    },
    [isEditMode]
  );

  const changeStartTimeLIstDisplay = useCallback(
    e => {
      if (isEditMode) e.stopPropagation();
      setStartTimeListDisplay(current => !current);
    },
    [isEditMode]
  );

  // onDateChangeClose calendar
  const onDCange = useCallback(
    (newDate: Moment) => {
      onDateChange(newDate);
      setCalendarDisplay(false);
    },
    [onDateChange]
  );

  const changeEndTimeListDisplay = useCallback(
    e => {
      if (isEditMode) e.stopPropagation();
      setEndTimeListDisplay(current => !current);
    },
    [isEditMode]
  );

  const startTime = date.format("HH:mm A");

  return (
    <div
      style={{ overflow: isEditMode ? "visible" : undefined }}
      className={`${styles.DateInp} ${
        !isEditMode ? "hoverBGGray" : ""
      } ${className} owl-mtop`}
      data-testid="DateInp"
      onClick={onInputsWrapperClick}>
      <div className={`f-right ${styles.inputsWrapper}`}>
        <Modal
          display={calendarDisplay}
          height="270px"
          width="250px"
          position="absolute"
          x={100}
          y={30}>
          <CalMonth className={styles.calendar} onDateChange={onDCange} />
        </Modal>
        <Modal
          display={startTimeListDisplay}
          width="130px"
          height="220px"
          x={120}
          y={40}>
          <StartTimeList date={date} onStartTimeChange={onStartTimeChange} />
        </Modal>
        <Modal
          display={endTimeListDisplay}
          width="130px"
          height="220px"
          x={70}
          y={40}>
          <EndTimeList startTime={convertHoursToMinutes(date)} />
        </Modal>
        <Input
          value={`${weekday}, ${day} ${monthName}`}
          onChange={() => {}}
          onClick={changeCalendarDisplay}
          tag="date"
          small={true}
          inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthBig}`}
          backgroundColor="transparent"
        />
        <Input
          value={convertAMPMtoPersia(startTime)}
          onChange={() => {}}
          tag="eventStartTime"
          small={true}
          onClick={changeStartTimeLIstDisplay}
          inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthSmall}`}
          backgroundColor="transparent"
        />
        -
        <Input
          value={`${convertAMPMtoPersia(eventEndTime)}`}
          onChange={() => {}}
          tag="eventEndTime"
          small={true}
          onClick={changeEndTimeListDisplay}
          inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthSmall}`}
          backgroundColor="transparent"
        />
      </div>

      <div className={`${isEditMode ? "d-none" : ""} text-gray`}>
        <span>منطقه زمانی</span> ,<span>تکرار نمی شود</span>.
      </div>

      <div
        className={`${styles.edits} ${
          isEditMode ? styles.openEdits : ""
        } owl-mtop owl-mright`}>
        <input type="checkbox" name="" id="all-day" />
        <label htmlFor="all-day">تمام روز</label>

        <Button className={`${styles.btn} hoverBGGray`}>منطقه زمانی</Button>
        <Button className={`${styles.repeat} ${styles.btn} hoverBGGray`}>
          تکرار نمی شود
        </Button>
      </div>
    </div>
  );
};

export default DateInp;
