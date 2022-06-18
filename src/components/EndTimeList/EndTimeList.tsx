import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import {
  convertAMPMtoPersia,
  convertMinutesToHours,
} from "../../utils/helpers";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./EndTimeList.module.scss";

interface EndTimeListProps {
  startTime: number;
  onEndTimeChang: (endTime: number) => void;
  endTime: number;
}

const EndTimeList: FC<EndTimeListProps> = ({
  startTime,
  onEndTimeChang,
  endTime,
}) => {
  const selected = useMemo(() => startTime + endTime, [endTime, startTime]);
  const selectedRef = useRef<HTMLDivElement>(null);

  const cb: CB = useCallback(
    item => (
      <div
        className={`${styles.hour} hoverBGGray ${
          selected === item.tag ? styles.selected : ""
        }`}
        onClick={() =>
          typeof item.tag === "number" ? onEndTimeChang(item.tag) : 0
        }
        ref={selected === item.tag ? selectedRef : undefined}>
        {convertAMPMtoPersia(
          convertMinutesToHours(typeof item.tag === "number" ? item.tag : 0)
        )}
      </div>
    ),
    [onEndTimeChang, selected]
  );

  useEffect(() => {
    selectedRef.current?.scrollIntoView();
  }, []);

  const listItems = useMemo(() => {
    const output: IItem[] = [];
    let quarter = 15;

    while (startTime < 1440) {
      output.push({
        tag: startTime === 1440 ? startTime : startTime + 15,
        cb,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      startTime += quarter;
    }

    return output;
  }, [cb, startTime]);

  return <ULLinks listOfItems={listItems} ulClassName={styles.EndTimeList} />;
};

export default EndTimeList;
