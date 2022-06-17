import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import {
  convertAMPMtoPersia,
  convertMinutesToHours,
  stopPropagation,
} from "../../utils/helpers";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./StartTimeList.module.scss";

interface StartTimeListProps {
  onStartTimeChange: (startTime: number) => void;
  selected: number;
}

const minuteInADay = 24 * 60 - 15;

const StartTimeList: FC<StartTimeListProps> = ({
  onStartTimeChange,
  selected,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);

  const cb = useCallback<CB>(
    item => (
      <div
        className={`hoverBGGray ${styles.hour} ${
          selected === item.tag ? styles.selected : ""
        }`}
        onClick={() =>
          typeof item.tag === "number" ? onStartTimeChange(item.tag) : null
        }
        id={`${selected}`}
        ref={selected === item.tag ? selectedRef : undefined}>
        {typeof item.tag === "number"
          ? convertAMPMtoPersia(convertMinutesToHours(item.tag))
          : item.tag}
      </div>
    ),
    [onStartTimeChange, selected]
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
  useEffect(() => {
    if (selectedRef.current) selectedRef.current.scrollIntoView();
  }, []);
  return (
    <>
      <ULLinks
        listOfItems={times}
        ulClassName={`${styles.StartTimeList} owl-mtop`}
      />
    </>
  );
};

export default StartTimeList;
