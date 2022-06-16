import React, { FC, useMemo } from "react";
import { FaCalendar, FaTimes } from "react-icons/fa";
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
import Cal from "./Cal/Cal";
import { OnColorChangeT } from "../Day/Day";
import useKeyDown from "../../hooks/useKeyDown";

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
  calId: string;
  onCalChange: (id: string) => void;
  onColorChange: OnColorChangeT;
  timestampEnd?: number;
  onTimeStampChange: (timestampEnd: number) => void;
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
  calId,
  onCalChange,
  onColorChange,
  timestampEnd,
  onTimeStampChange,
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

  useKeyDown(e => {
    if (e.key === "Escape") setModalDisplay();
    else if (e.key === "Enter") handleAddingEvent();
  });

  return (
    <div
      className={styles.EventForm}
      data-testid="EventForm"
      onMouseDown={e => e.stopPropagation()}>
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
            timestampEnd={timestampEnd}
            onTimeStampChange={onTimeStampChange}
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

        <Row icon={<FaCalendar />}>
          <Cal
            calId={calId}
            onCalChange={onCalChange}
            onColorChange={onColorChange}
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
