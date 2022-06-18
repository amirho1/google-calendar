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
}

const inputRegex = /1?[0-2]:[0-3][0-9]\s(بع|قب)/;

const TimeInput: FC<TimeInputProps> = ({
  onChange,
  time,
  label,
  type,
  startTime,
}) => {
  if (type === "end" && typeof startTime === "undefined")
    throw new Error(
      "while type is equal to end, startTime shouldn't be undefined!!"
    );

  const [timesDisplay, setTimesDisplay] = useState(false);
  const [value, setValue] = useState(convertMinutesToHours(time));

  const changeTimesDisplay = useCallback(e => {
    stopPropagation(e);
    setTimesDisplay(current => !current);
  }, []);

  const closeTimesDisplay = useCallback(() => {
    setTimesDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeTimesDisplay);

    return () => {
      document.removeEventListener("click", closeTimesDisplay);
    };
  });

  useKeyDown(e => {
    if (e.key === "Escape") closeTimesDisplay();
  });

  const onInputChange = useCallback((value: string) => {
    setValue(persianDigits2English(value));
  }, []);

  const onInputBlur = useCallback(() => {
    const isInputValid = inputRegex.test(value);

    if (isInputValid) {
      const minute = convertHoursToMinutes(moment(value, "HH:mm A"));

      onChange(minute);
    } else {
      setValue(convertAMPMtoPersia(convertMinutesToHours(time)));
    }
  }, [onChange, time, value]);

  useEffect(() => {
    setValue(convertMinutesToHours(time));
  }, [startTime, time, type]);

  return (
    <div className={styles.TimeInput} data-testid="TimeInput">
      <Input
        tag={label}
        onClick={changeTimesDisplay}
        onBlur={onInputBlur}
        small={true}
        onChange={e => onInputChange(e.currentTarget.value)}
        inputClassName={styles.input}
        value={convertAMPMtoPersia(
          convertMinutesToHours(
            convertHoursToMinutes(moment(value, "HH:mm A")) + (startTime || 0)
          )
        )}
      />

      <Modal display={timesDisplay} width="180px" height="200px" x={-50} y={60}>
        {type === "start" ? (
          <StartTimeList onStartTimeChange={onChange} selected={time} />
        ) : (
          <EndTimeList
            endTime={time}
            onEndTimeChang={onChange}
            startTime={startTime || 0}
          />
        )}
      </Modal>
    </div>
  );
};

export default TimeInput;
