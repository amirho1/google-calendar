import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  convertAMPMtoPersia,
  convertEnglishWeekdaysToPersian,
  convertFinglishMonthToPersian,
  convertHoursToMinutes,
  stopPropagation,
} from "../../utils/helpers";
import Button from "../Button/Button";
import CalMonth from "../CalMonth/CalMonth";
import StartTimeList from "../StartTimeList/StartTimeList";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "./DateInp.module.scss";
import EndTimeList from "../EndTimeList/EndTimeList";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { setDate } from "../../redux/reducers/date/actions";
import Checkbox from "../Checkbox/Checkbox";

interface DateInpProps {
  eventStartTime: string;
  className?: string;
  eventEndTime: string;
  onStartTimeChange: (startTime: number) => void;
  onEndTimeChang: (endTime: number) => void;
  onTimeStampChange: (timeStampEnd: number) => void;
  timestampEnd?: number;
}

const DateInp: FC<DateInpProps> = ({
  className,
  eventStartTime,
  eventEndTime,
  onStartTimeChange,
  onEndTimeChang,
  onTimeStampChange,
  timestampEnd,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [calendarDisplay, setCalendarDisplay] = useState(false);
  const [startTimeListDisplay, setStartTimeListDisplay] = useState(false);
  const [endTimeListDisplay, setEndTimeListDisplay] = useState(false);
  const [timeStampEndDisplay, setTimeStampEndDisplay] = useState(false);
  const [wholeDay, setWholeDay] = useState(false);

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

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

  const monthNameEnd = useMemo(
    () => convertFinglishMonthToPersian(moment(timestampEnd).format("jMMMM")),
    [timestampEnd]
  );

  const dayEnd = useMemo(() => moment(timestampEnd).jDate(), [timestampEnd]);

  const weekdayEnd = useMemo(
    () =>
      convertEnglishWeekdaysToPersian(
        moment(timestampEnd).format("dddd").toLowerCase() as any
      ),
    [timestampEnd]
  );

  // change the to editable
  const onInputsWrapperClick = useCallback(e => {
    setIsEditMode(true);
  }, []);

  const closeModals = useCallback(() => {
    setCalendarDisplay(false);
    setStartTimeListDisplay(false);
    setEndTimeListDisplay(false);
    setTimeStampEndDisplay(false);
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
      setStartTimeListDisplay(false);
      setEndTimeListDisplay(false);
      setTimeStampEndDisplay(false);
    },
    [isEditMode]
  );

  const changeStartTimeLIstDisplay = useCallback(
    e => {
      if (isEditMode) e.stopPropagation();
      setStartTimeListDisplay(current => !current);
      setEndTimeListDisplay(false);
      setCalendarDisplay(false);
    },
    [isEditMode]
  );

  const dispatch = useDispatch();

  // onDateChangeClose calendar
  const onDCange = useCallback(
    (newDate: Moment) => {
      setCalendarDisplay(false);
      dispatch(setDate(newDate));
    },
    [dispatch]
  );

  const changeEndTimeListDisplay = useCallback(
    e => {
      if (isEditMode) e.stopPropagation();
      setEndTimeListDisplay(current => !current);
      setStartTimeListDisplay(false);
      setCalendarDisplay(false);
    },
    [isEditMode]
  );

  const changeTimeStampEndDisplay = useCallback(e => {
    stopPropagation(e);
    setTimeStampEndDisplay(current => !current);
    setCalendarDisplay(false);
  }, []);

  const onTimeStampEndDateChange = useCallback(
    (date: Moment) => {
      onTimeStampChange(date.valueOf());
    },
    [onTimeStampChange]
  );

  useEffect(() => {
    document.addEventListener("click", closeModals);
    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, [closeModals]);

  useEffect(() => {
    if (!wholeDay) onTimeStampChange(0);
    else onTimeStampChange(date.valueOf());
  }, [date, onTimeStampChange, wholeDay]);

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
          <StartTimeList
            onStartTimeChange={onStartTimeChange}
            selected={convertHoursToMinutes(moment(eventStartTime, "HH:mm A"))}
          />
        </Modal>
        <Modal
          display={endTimeListDisplay}
          width="130px"
          height="220px"
          x={70}
          y={40}>
          <EndTimeList
            endTime={convertHoursToMinutes(moment(eventEndTime, "HH:mm A"))}
            startTime={convertHoursToMinutes(moment(eventStartTime, "HH:mm A"))}
            onEndTimeChang={onEndTimeChang}
          />
        </Modal>

        <Modal
          display={timeStampEndDisplay}
          height="270px"
          width="250px"
          position="absolute"
          x={30}
          y={30}>
          <CalMonth
            className={styles.calendar}
            onDateChange={onTimeStampEndDateChange}
            customDate={moment(timestampEnd)}
          />
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
        {!wholeDay && (
          <>
            <Input
              value={convertAMPMtoPersia(eventStartTime)}
              onChange={() => {}}
              tag="eventStartTime"
              small={true}
              onClick={changeStartTimeLIstDisplay}
              inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthSmall}`}
              backgroundColor="transparent"
            />{" "}
            -{" "}
            <Input
              value={`${convertAMPMtoPersia(eventEndTime)}`}
              onChange={() => {}}
              tag="eventEndTime"
              small={true}
              onClick={changeEndTimeListDisplay}
              inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthSmall}`}
              backgroundColor="transparent"
            />
          </>
        )}
        {wholeDay && (
          <>
            -
            <Input
              value={`${weekdayEnd}, ${dayEnd} ${monthNameEnd}`}
              onChange={() => {}}
              tag="timeStampEnd"
              small={true}
              onClick={changeTimeStampEndDisplay}
              backgroundColor="transparent"
              inpWrapperClassName={`hoverBGGray ${styles.inputs} ${styles.widthBig}`}
            />
          </>
        )}
      </div>

      <div className={`${isEditMode ? "d-none" : ""} text-gray`}>
        <span>منطقه زمانی</span> ,<span>تکرار نمی شود</span>.
      </div>

      <div
        className={`${styles.edits} ${
          isEditMode ? styles.openEdits : ""
        } owl-mtop `}
        style={{ display: !isEditMode ? "none" : "block" }}>
        <div className="f-right">
          <Checkbox color="var(--blue)" onChange={setWholeDay} />
          <label htmlFor="all-day mr-1" className={styles.checkboxLabel}>
            تمام روز{" "}
          </label>
        </div>

        <Button className={`${styles.repeat} ${styles.btn} hoverBGGray`}>
          تکرار نمی شود
        </Button>
      </div>
    </div>
  );
};

export default DateInp;
