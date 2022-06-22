import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
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
import { EventI } from "../../redux/reducers/events/events";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendarById } from "../../redux/sagas/calendars/selectors";
import { deleteEvent } from "../../redux/sagas/events";
import useKeyDown from "../../hooks/useKeyDown";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import usePdf from "../../hooks/usePdf";

export interface DetailsProps {
  event: EventI;
  date: Moment;
  timeStamp: number;
  closeDetails: () => void;
}

const Details: FC<DetailsProps> = ({
  event,
  date,
  closeDetails,
  timeStamp,
}) => {
  const { description, endTime, startTime, title, calId, _id } = event;
  const calName = useSelector(selectCalendarById(calId || "0"))?.name || "";
  const dispatch = useDispatch();
  const [toolsDisplay, setToolsDisplay] = useState(false);

  const cb = useCallback<CB>(
    item => (
      <HoverCircle className="pointer" dataTip={item.tag as any}>
        {item.icon as any}
      </HoverCircle>
    ),
    []
  );

  const removeEvent = useCallback(() => {
    if (calName && _id) dispatch(deleteEvent.ac({ calId, timeStamp, id: _id }));
  }, [calName, _id, dispatch, calId, timeStamp]);

  useKeyDown(e => {
    if (e.key === "Escape") closeDetails();
  });

  const changeToolsDisplay = useCallback(e => {
    stopPropagation(e);
    setToolsDisplay(current => !current);
  }, []);

  const closeToolsDisplay = useCallback(() => {
    setToolsDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeToolsDisplay);
    return () => {
      document.removeEventListener("click", closeToolsDisplay);
    };
  }, [closeToolsDisplay]);

  const { createAndSavePdf } = usePdf(event);
  const optionsListOfItems = useMemo<IItem[]>(
    () => [
      {
        tag: "چاپ",
        cb: item => <div onClick={createAndSavePdf}>{item.tag}</div>,
      },
      { tag: "تکثیر" },
    ],
    [createAndSavePdf]
  );

  const tools = useMemo<IItem[]>(
    () => [
      {
        tag: "ویرایش رویداد",
        cb: item => (
          <HoverCircle className="pointer" dataTip={item.tag as any}>
            <Link to={`updateOrCreate/${event._id}`}>{item.icon}</Link>
          </HoverCircle>
        ),
        icon: <BsPencil />,
      },
      {
        tag: "حذف رویداد",
        icon: <BsTrash />,
        cb: item => (
          <HoverCircle className="pointer" dataTip={item.tag as any}>
            <div onClick={removeEvent}>{item.icon as any}</div>
          </HoverCircle>
        ),
      },
      {
        tag: "گزینه ها",
        icon: <BsThreeDotsVertical />,
        cb: item => (
          <HoverCircle className="pointer" dataTip={item.tag as any}>
            <div className={styles.tools} onClick={changeToolsDisplay}>
              {item.icon}

              <Modal
                width="150px"
                height="fit-content"
                right="0"
                y={5}
                display={toolsDisplay}
                onClick={stopPropagation}>
                <ULLinks
                  listOfItems={optionsListOfItems}
                  ulClassName={styles.optionUl}
                  liClassName="list-item"
                />
              </Modal>
            </div>
          </HoverCircle>
        ),
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
    [
      cb,
      changeToolsDisplay,
      closeDetails,
      event._id,
      optionsListOfItems,
      removeEvent,
      toolsDisplay,
    ]
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
      onMouseDown={stopPropagation}>
      <div className={`${styles.header}`}>
        <ULLinks
          listOfItems={tools}
          ulClassName={`f-between ${styles.ulClassName}`}
        />
      </div>
      <div className={`${styles.body} owl-mtop`}>
        <Row icon={<BsSquareFill className={styles.icon} />}>
          <>
            <h1 className={styles.title}>{title || " (بدون عنوان)"}</h1>
            <span>{weekDay}</span> <span>{date.jDate()}</span>{" "}
            <span>{monthName}</span> , <span>{starT}</span> -{" "}
            <span>{endT}</span>
          </>
        </Row>

        {description && description !== "<p></p>" ? (
          <Row icon={<GrTextAlignFull className={styles.icon} />}>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}></p>
          </Row>
        ) : null}
        <Row icon={<FaBell className={styles.icon} />}>
          <>30</>
        </Row>

        <Row icon={<FaCalendar className={styles.icon} />}>
          <p className={`ellipsis ${styles.claName}`}>{calName}</p>
        </Row>
      </div>
    </div>
  );
};

export default Details;
