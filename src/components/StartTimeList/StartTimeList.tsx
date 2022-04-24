import { Moment } from "moment-jalaali";
import React, { FC, useCallback, useMemo } from "react";
import {
  convertAMPMtoPersia,
  convertMinutesToHours,
} from "../../utils/helpers";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./StartTimeList.module.scss";

interface StartTimeListProps {
  onStartTimeChange: (startTime: number) => void;
  date: Moment;
}

const minuteInADay = 24 * 60 - 15;

const StartTimeList: FC<StartTimeListProps> = ({ onStartTimeChange, date }) => {
  const cb = useCallback<CB>(
    item => (
      <div
        className={`hoverBGGray ${styles.hour}`}
        onClick={() => {
          if (typeof item.tag === "number") onStartTimeChange(item.tag);
        }}>
        {typeof item.tag === "number"
          ? convertAMPMtoPersia(convertMinutesToHours(item.tag))
          : item.tag}
      </div>
    ),
    [onStartTimeChange]
  );

  const times = useMemo<IItem[]>(() => {
    const listItem: IItem[] = [];
    let hour = 0;
    let quarterOFHour = 15;
    while (hour <= minuteInADay) {
      listItem.push({
        tag: hour,
        cb,
      });

      hour += quarterOFHour;
    }
    return listItem;
  }, [cb]);

  return (
    <ULLinks
      listOfItems={times}
      ulClassName={`${styles.StartTimeList} owl-mtop`}
    />
  );
};

export default StartTimeList;
