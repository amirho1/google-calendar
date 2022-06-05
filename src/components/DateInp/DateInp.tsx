import moment, { Moment } from "moment-jalaali";
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
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { setDate } from "../../redux/reducers/date/actions";

interface DateInpProps {
  eventStartTime: string;
  className?: string;
  eventEndTime: string;
  onStartTimeChange: (startTime: number) => void;
  onEndTimeChang: (endTime: number) => void;
}

const DateInp: FC<DateInpProps> = ({
  className,
  eventStartTime,
  eventEndTime,
  onStartTimeChange,
  onEndTimeChang,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [calendarDisplay, setCalendarDisplay] = useState(false);
  const [startTimeListDisplay, setStartTimeListDisplay] = useState(false);
  const [endTimeListDisplay, setEndTimeListDisplay] = useState(false);
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

  // change the to editable
  const onInputsWrapperClick = useCallback(e => {
    setIsEditMode(true);
  }, []);

  const closeModals = useCallback(() => {
    setCalendarDisplay(false);
    setStartTimeListDisplay(false);
    setEndTimeListDisplay(false);
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
          <EndTimeList
            startTime={convertHoursToMinutes(moment(eventStartTime, "HH:mm A"))}
            onEndTimeChang={onEndTimeChang}
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
        <Input
          value={convertAMPMtoPersia(eventStartTime)}
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
        } owl-mtop `}
        style={{ display: !isEditMode ? "none" : "block" }}>
        <input type="checkbox" name="" id="all-day" />
        <label htmlFor="all-day mr-1">تمام روز </label>

        <Button className={`${styles.repeat} ${styles.btn} hoverBGGray`}>
          تکرار نمی شود
        </Button>
      </div>
    </div>
  );
};

export default DateInp;
