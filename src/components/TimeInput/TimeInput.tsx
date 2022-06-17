import moment from "moment-jalaali";
import React, { FC, useCallback, useEffect, useState } from "react";
import useKeyDown from "../../hooks/useKeyDown";
import {
  convertAMPMtoPersia,
  convertHoursToMinutes,
  convertMinutesToHours,
  convertPersianAMPMToEnglish,
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
}

const inputRegex = /1?[0-2]:[0-3][0-9]\s(بع|قب)/;

const TimeInput: FC<TimeInputProps> = ({ onChange, time, label, type }) => {
  const [timesDisplay, setTimesDisplay] = useState(false);
  const [value, setValue] = useState(
    convertAMPMtoPersia(convertMinutesToHours(time))
  );
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

  const onInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(e => {
    setValue(persianDigits2English(e.currentTarget.value));
  }, []);

  const onInputBlur = useCallback(() => {
    const isInputValid = inputRegex.test(value);

    if (isInputValid) {
      const minute = convertHoursToMinutes(
        moment(convertPersianAMPMToEnglish(value), "HH:mm A")
      );

      onChange(minute);
    } else {
      setValue(convertAMPMtoPersia(convertMinutesToHours(time)));
    }
  }, [onChange, time, value]);

  useEffect(() => {
    setValue(convertAMPMtoPersia(convertMinutesToHours(time)));
  }, [time]);

  return (
    <div className={styles.TimeInput} data-testid="TimeInput">
      <Input
        tag={label}
        onClick={changeTimesDisplay}
        onBlur={onInputBlur}
        small={true}
        onChange={onInputChange}
        inputClassName={styles.input}
        value={value}
      />

      <Modal display={timesDisplay} width="180px" height="200px" x={-50} y={60}>
        {type === "start" ? (
          <StartTimeList onStartTimeChange={onChange} selected={time} />
        ) : (
          <EndTimeList onEndTimeChang={() => {}} startTime={0} />
        )}
      </Modal>
    </div>
  );
};

export default TimeInput;
