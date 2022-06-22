import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  convertHoursToMinutes,
  convertPersianAMPMToEnglish,
} from "../../utils/helpers";
import Button from "../Button/Button";
import styles from "./DateInp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { setDate } from "../../redux/reducers/date/actions";
import Checkbox from "../Checkbox/Checkbox";
import DateInput from "../DateInput/DateInput";
import TimeInput from "../TimeInput/TimeInput";

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

  const [wholeDay, setWholeDay] = useState(false);

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

  // change the to editable
  const onInputsWrapperClick = useCallback(() => setIsEditMode(true), []);

  const closeModals = useCallback(() => {}, []);

  useEffect(() => {
    // close calendar on document click
    document.addEventListener("click", closeModals);

    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, [closeModals]);

  const dispatch = useDispatch();

  // onDateChangeClose calendar
  const onDCange = useCallback(
    (timestamp: number) => dispatch(setDate(moment(timestamp))),
    [dispatch]
  );

  const onTimeStampEndDateChange = useCallback(
    (timestamp: number) => onTimeStampChange(timestamp),
    [onTimeStampChange]
  );

  useEffect(() => {
    document.addEventListener("click", closeModals);
    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, [closeModals]);

  useEffect(() => {
    if (!wholeDay && !timestampEnd) onTimeStampChange(0);
    else onTimeStampChange(date.valueOf());
  }, [date, onTimeStampChange, timestampEnd, wholeDay]);

  return (
    <div
      style={{ overflow: isEditMode ? "visible" : undefined }}
      className={`${styles.DateInp} ${
        !isEditMode ? "hoverBGGray" : ""
      } ${className} owl-mtop`}
      data-testid="DateInp"
      onClick={onInputsWrapperClick}>
      <div className={`f-right ${styles.inputsWrapper}`}>
        {/* <Modal
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
        </Modal> */}

        <DateInput
          onChange={onDCange}
          label="date"
          timeStamp={date.valueOf()}
          inputBackgroundColor="transparent"
          closeModalEvent="click"
        />

        {!wholeDay && eventEndTime && (
          <>
            <TimeInput
              label="زمان شروع"
              onChange={onStartTimeChange}
              time={convertHoursToMinutes(
                moment(convertPersianAMPMToEnglish(eventStartTime), "HH:mm A")
              )}
              type="start"
              closeModalEvent="click"
              backgroundColor="transparent"
            />
            -{" "}
            <TimeInput
              closeModalEvent="click"
              label="زمان پایان"
              backgroundColor="transparent"
              onChange={onEndTimeChang}
              time={
                convertHoursToMinutes(
                  moment(convertPersianAMPMToEnglish(eventEndTime), "HH:mm A")
                ) -
                convertHoursToMinutes(
                  moment(convertPersianAMPMToEnglish(eventStartTime), "HH:mm A")
                )
              }
              startTime={convertHoursToMinutes(
                moment(convertPersianAMPMToEnglish(eventStartTime), "HH:mm A")
              )}
              type="end"
            />
          </>
        )}

        {wholeDay && timestampEnd && (
          <>
            -
            <DateInput
              label="timeStampEnd"
              onChange={onTimeStampEndDateChange}
              timeStamp={timestampEnd}
              closeModalEvent="click"
              inputBackgroundColor="transparent"
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
          <Checkbox
            value={wholeDay}
            color="var(--blue)"
            onChange={value => {
              if (!value) onTimeStampChange(0);
              setWholeDay(value);
            }}
          />
          <label
            htmlFor="all-day"
            className={`${styles.checkboxLabel} mr-1`}
            onClick={() =>
              setWholeDay(current => {
                if (!current) onTimeStampChange(0);
                return !current;
              })
            }>
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
