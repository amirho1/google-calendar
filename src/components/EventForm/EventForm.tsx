import React, { FC, useCallback, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import HoverCircle from "../HoverCircle/HoverCircle";
import styles from "./EventForm.module.scss";
import { CgMathEqual } from "react-icons/cg";
import Input from "../Input/Input";
import Row from "./Row/Row";
import { MdOutlineWatchLater } from "react-icons/md";
import DateInp from "../DateInp/DateInp";
import moment from "moment-jalaali";
import Button from "../Button/Button";
import { GrTextAlignFull } from "react-icons/gr";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Description from "../Description/Description";
import { convertMinutesToHours } from "../../utils/helpers";
import { EditorState } from "draft-js";

interface EventFormProps {
  onHeaderMouseDown: React.MouseEventHandler<HTMLDivElement>;
  setModalDisplay: () => void;
  eventStartTime: number;
  eventEndTime: number;
  onStartTimeChange: (startTime: number) => void;
  onEndTimeChang: (endTime: number) => void;
  title: string;
  description: EditorState;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (editorState: EditorState) => void;
  handleAddingEvent: () => void;
}

const EventForm: FC<EventFormProps> = ({
  onHeaderMouseDown,
  setModalDisplay,
  onStartTimeChange,
  eventStartTime,
  eventEndTime,
  onEndTimeChang,
  title,
  description,
  onDescriptionChange,
  onTitleChange,
  handleAddingEvent,
}) => {
  const eventStartT = useMemo(
    () => convertMinutesToHours(eventStartTime),
    [eventStartTime]
  );

  const eventEndT = useMemo(
    () =>
      moment()
        .startOf("day")
        .add(eventStartTime + eventEndTime, "minutes")
        .format("hh:mm A"),
    [eventEndTime, eventStartTime]
  );

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
            onChange={e => onTitleChange(e.currentTarget.value)}
            fixedBorder={true}
            value={title}
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
            onStartTimeChange={onStartTimeChange}
            onEndTimeChang={onEndTimeChang}
          />
        </Row>
        <Row>
          <Button className="bg-white colBlue hoverBGGray border-none">
            یافتن بازه زمانی
          </Button>
        </Row>

        <Row icon={<GrTextAlignFull />}>
          <Description
            editorState={description}
            onEditorStateChange={onDescriptionChange}
          />
        </Row>

        <div className={`${styles.btnWrapper} owl-mright`}>
          <Button className={`${styles.btnMore} `}>گزینه های بیشتر</Button>
          <Button
            className={`${styles.btnSave} colWhite`}
            onClick={handleAddingEvent}>
            ذخیره
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventForm);
