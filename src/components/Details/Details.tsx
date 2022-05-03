import React, { FC, useCallback, useMemo } from "react";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./Details.module.scss";
import {
  BsPencil,
  BsTrash,
  BsThreeDotsVertical,
  BsSquareFill,
} from "react-icons/bs";
import { FaBell, FaCalendar, FaTimes } from "react-icons/fa";
import HoverCircle from "../HoverCircle/HoverCircle";
import { Moment } from "moment-jalaali";
import Row from "../EventForm/Row/Row";
import { GrTextAlignFull } from "react-icons/gr";
import {
  convertAMPMtoPersia,
  convertEnglishWeekdaysToPersian,
  convertFinglishMonthToPersian,
  convertMinutesToHours,
} from "../../utils/helpers";

export interface DetailsProps {
  title: string;
  date: Moment;
  startTime: number;
  endTime: number;
  calendarName: string;
  description: string;
  alarm: number;
  closeDetails: () => void;
}

const Details: FC<DetailsProps> = ({
  title,
  calendarName,
  date,
  description,
  endTime,
  alarm,
  startTime,
  closeDetails,
}) => {
  const cb = useCallback<CB>(
    item => (
      <HoverCircle className="pointer" dataTip={item.tag as any}>
        {item.icon as any}
      </HoverCircle>
    ),
    []
  );

  const tools = useMemo<IItem[]>(
    () => [
      {
        tag: "ویرایش رویداد",
        cb: cb,
        icon: <BsPencil />,
      },
      {
        tag: "حذف رویداد",
        icon: <BsTrash />,
        cb: cb,
      },
      {
        tag: "گزینه ها",
        icon: <BsThreeDotsVertical />,
        cb: cb,
      },

      {
        tag: "بستن",
        icon: (
          <div onClick={closeDetails}>
            <FaTimes />
          </div>
        ),

        cb: cb,
      },
    ],
    [cb, closeDetails]
  );

  const weekDay = useMemo(
    () =>
      convertEnglishWeekdaysToPersian(date.format("dddd").toLowerCase() as any),
    [date]
  );

  const monthName = useMemo(
    () => convertFinglishMonthToPersian(date.format("jMMMM")),
    [date]
  );

  const starT = useMemo(
    () => convertAMPMtoPersia(convertMinutesToHours(startTime)),
    [startTime]
  );

  const endT = useMemo(
    () => convertAMPMtoPersia(convertMinutesToHours(endTime)),
    [endTime]
  );

  const stopPropagation: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
  };

  return (
    <div
      className={styles.Details}
      data-testid="Details"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}>
      <div className={`${styles.header}`}>
        <ULLinks listOfItems={tools} ulClassName="f-between" />
      </div>
      <div className={styles.body}>
        <Row icon={<BsSquareFill className={styles.icon} />}>
          <>
            <h2>{title || " (بدون عنوان)"}</h2>
            <span>{weekDay}</span> <span>{date.jDate()}</span>{" "}
            <span>{monthName}</span> , <span>{starT}</span> -{" "}
            <span>{endT}</span>
          </>
        </Row>
        {description && description !== "<p></p>" ? (
          <Row icon={<GrTextAlignFull className={styles.icon} />}>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </Row>
        ) : null}
        <Row icon={<FaBell className={styles.icon} />}>
          <>{alarm}</>
        </Row>

        <Row icon={<FaCalendar className={styles.icon} />}>
          <>{calendarName}</>
        </Row>
      </div>
    </div>
  );
};

export default Details;