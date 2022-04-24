import React, { FC, useCallback, useMemo } from "react";
import {
  convertAMPMtoPersia,
  convertMinutesToHours,
} from "../../utils/helpers";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./EndTimeList.module.scss";

interface EndTimeListProps {
  startTime: number;
}

const EndTimeList: FC<EndTimeListProps> = ({ startTime }) => {
  const cb: CB = useCallback(
    item => <div className={`${styles.hour} hoverBGGray`}>{item.tag}</div>,
    []
  );

  const listItems = useMemo(() => {
    const output: IItem[] = [];
    let minuteCopy = startTime;
    let quarter = 15;

    while (minuteCopy <= 1440) {
      output.push({
        tag: convertAMPMtoPersia(convertMinutesToHours(minuteCopy)),
        cb,
      });
      minuteCopy += quarter;
    }

    return output;
  }, [cb]);

  return <ULLinks listOfItems={listItems} ulClassName={styles.EndTimeList} />;
};

export default EndTimeList;
