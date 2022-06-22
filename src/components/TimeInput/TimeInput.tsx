import moment from "moment-jalaali";
import React, { FC, useCallback, useEffect, useState } from "react";
import useKeyDown from "../../hooks/useKeyDown";
import {
  convertAMPMtoPersia,
  convertHoursToMinutes,
  convertMinutesToHours,
  persianDigits2English,
  stopPropagation,
} from "../../utils/helpers";
import EndTimeList from "../EndTimeList/EndTimeList";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import StartTimeList from "../StartTimeList/StartTimeList";
import styles from "./TimeInput.module.scss";

interface TimeInputProps {
  time: number;
  onChange: (newTime: number) => void;
  label: string;
  type: "end" | "start";
  startTime?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  backgroundColor?: string;
  closeModalEvent?: "click" | "mousedown";
}

const inputRegex = /1?[0-2]:[0-3][0-9]\s(بع|قب)/;

const TimeInput: FC<TimeInputProps> = ({
  onChange,
  time,
  label,
  type,
  startTime,
  onClick,
  backgroundColor,
  closeModalEvent = "mousedown",
}) => {
  const [timesDisplay, setTimesDisplay] = useState(false);
  const [value, setValue] = useState(convertMinutesToHours(time));

  const openModal = useCallback(() => setTimesDisplay(true), []);

  const closeTimesDisplay = useCallback(() => {
    setTimesDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener(closeModalEvent, closeTimesDisplay);
    return () =>
      document.removeEventListener(closeModalEvent, closeTimesDisplay);
  }, [closeModalEvent, closeTimesDisplay]);

  useKeyDown(e => {
    if (e.key === "Escape") closeTimesDisplay();
  });

  const onInputChange = useCallback((value: string) => {
    setValue(persianDigits2English(value));
  }, []);

  const onChangeInner = useCallback(
    (minute: number) => {
      onChange(minute);
      closeTimesDisplay();
    },
    [closeTimesDisplay, onChange]
  );

  const onInputBlur = useCallback(() => {
    const isInputValid = inputRegex.test(value);

    if (isInputValid) {
      const minute = convertHoursToMinutes(moment(value, "HH:mm A"));
      onChangeInner(minute);
    } else {
      setValue(convertAMPMtoPersia(convertMinutesToHours(time)));
    }
  }, [onChangeInner, time, value]);

  useEffect(() => {
    setValue(convertMinutesToHours(time));
  }, [startTime, time, type]);

  const change = useCallback(
    (num: number) => {
      onChange(num);
      closeTimesDisplay();
    },
    [closeTimesDisplay, onChange]
  );

  return (
    <div
      className={styles.TimeInput}
      data-testid="TimeInput"
      onClick={e => {
        onClick && onClick(e);
        setTimeout(openModal);
      }}>
      <Input
        tag={label}
        onClick={openModal}
        onBlur={onInputBlur}
        backgroundColor={backgroundColor}
        small={true}
        onChange={e => onInputChange(e.currentTarget.value)}
        inputClassName={styles.input}
        value={convertAMPMtoPersia(
          convertMinutesToHours(
            convertHoursToMinutes(moment(value, "HH:mm A")) + (startTime || 0)
          )
        )}
      />

      <Modal
        display={timesDisplay}
        width="180px"
        height="200px"
        x={-50}
        y={60}
        onMouseDown={stopPropagation}
        onClick={stopPropagation}>
        {type === "start" ? (
          <StartTimeList onStartTimeChange={change} selected={time} />
        ) : (
          <EndTimeList
            endTime={time}
            onEndTimeChang={change}
            startTime={startTime || 0}
          />
        )}
      </Modal>
    </div>
  );
};

export default TimeInput;
