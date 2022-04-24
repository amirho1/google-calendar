import React, { FC, useCallback, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import HoverCircle from "../HoverCircle/HoverCircle";
import styles from "./EventForm.module.scss";
import { CgMathEqual } from "react-icons/cg";
import Input from "../Input/Input";
import Row from "./Row/Row";
import { MdOutlineWatchLater } from "react-icons/md";
import DateInp from "../DateInp/DateInp";
import { Moment } from "moment-jalaali";
import Button from "../Button/Button";
import { GrTextAlignFull } from "react-icons/gr";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Description from "../Description/Description";

interface EventFormProps {
  onHeaderMouseDown: React.MouseEventHandler<HTMLDivElement>;
  date: Moment;
  setModalDisplay: () => void;
  eventStartTime: number;
  eventEndTime: number;
  onStartTimeChange: (startTime: number) => void;
}

const EventForm: FC<EventFormProps> = ({
  onHeaderMouseDown,
  date,
  setModalDisplay,
  onStartTimeChange,
  eventStartTime,
  eventEndTime,
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [editedDate, setEditedDate] = useState<Moment>(
    date.set({ m: eventStartTime })
  );

  const eventStartT = useMemo(
    () =>
      editedDate
        .startOf("day")
        .add(eventStartTime, "minutes")
        .format("hh:mm A"),
    [editedDate, eventStartTime]
  );

  const eventEndT = useMemo(
    () =>
      date
        .startOf("day")
        .add(eventStartTime + eventEndTime, "minutes")
        .format("hh:mm A"),
    [date, eventEndTime, eventStartTime]
  );

  const onDateChange = useCallback((newDate: Moment) => {
    setEditedDate(newDate);
  }, []);

  const onTitleChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(e => {
    setTitleValue(e.currentTarget.value);
  }, []);

  return (
    <div className={styles.EventForm} data-testid="EventForm">
      <div
        className={`${styles.header} f-between `}
        onMouseDown={onHeaderMouseDown}>
        <HoverCircle>
          <div>
            <FaTimes onClick={() => setModalDisplay()} />
          </div>
        </HoverCircle>
        <HoverCircle>
          <div>
            <CgMathEqual />
          </div>
        </HoverCircle>
      </div>

      <div className={styles.body}>
        <Row>
          <Input
            tag="عنوان"
            onChange={onTitleChange}
            fixedBorder={true}
            value={titleValue}
            backgroundColor="white"
            inpWrapperClassName={styles.titleInputWrapper}
          />
        </Row>
        <Row
          icon={<MdOutlineWatchLater />}
          hover={false}
          bodyClassName="all-pointer">
          <DateInp
            eventEndTime={eventEndT}
            eventStartTime={eventStartT}
            date={editedDate}
            onDateChange={onDateChange}
            onStartTimeChange={onStartTimeChange}
          />
        </Row>
        <Row>
          <Button className="bg-white colBlue hoverBGGray border-none">
            یافتن بازه زمانی
          </Button>
        </Row>

        <Row icon={<GrTextAlignFull />}>
          <Description />
        </Row>

        <div className={`${styles.btnWrapper} owl-mright`}>
          <Button className={`${styles.btnMore} `}>گزینه های بیشتر</Button>
          <Button className={`${styles.btnSave} colWhite`}>ذخیره</Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventForm);
