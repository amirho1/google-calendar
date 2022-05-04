import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../Button/Button";
import styles from "./Cal.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import CalList from "../../CalList/CalList";
import Modal from "../../Modal/Modal";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../../redux";
import { CalendarI } from "../../../redux/sagas/calendars";

interface CalProps {
  calId: number;
  onCalChange: (id: number) => void;
}

const Cal: FC<CalProps> = ({ calId, onCalChange }) => {
  const [calListDisplay, setCalListDisplay] = useState(false);

  const [isEditorMode, setIsEditorMode] = useState(false);

  const calConditionalClassNames = useMemo(
    () => (!isEditorMode ? "hoverBGGray pointer" : ""),
    [isEditorMode]
  );

  const colorBtnConditionalClassNames = useMemo(
    () => (isEditorMode ? "hoverBGGray" : ""),
    [isEditorMode]
  );

  const onClick = useCallback(() => {
    setIsEditorMode(true);
  }, []);

  const closeModals = useCallback(() => {
    console.log("Hello world");
    setCalListDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeModals);

    return () => {
      document.removeEventListener("mousedown", closeModals);
    };
  }, [closeModals]);

  const onCalNameClick = useCallback(() => {
    setCalListDisplay(current => !current);
  }, []);

  const calendar = useSelector<ReduxStateI, CalendarI | undefined>(state =>
    state.calendars.calendars.find(c => {
      return (c.id as any) === calId;
    })
  );
  console.log(calendar?.color);
  return (
    <div
      className={`${styles.Cal} ${calConditionalClassNames}`}
      data-testid="Cal"
      onClick={onClick}>
      <div
        className={styles.mainRow}
        style={{ display: !isEditorMode ? "block" : "none" }}>
        <div className={`f-between ${styles.mainRow} `}>
          <h2>{calendar?.name}</h2>{" "}
          <div
            className={`${styles.color} m-right2`}
            style={{ backgroundColor: calendar?.color }}></div>
        </div>

        <div className={styles.otherThings}>
          مشغول . نمایان بودن پیش فرض . ۳۰ دقیقه قبل از رویداد اعلان شود
        </div>
      </div>

      <div
        className={`${styles.editor} `}
        style={{ display: isEditorMode ? "block" : "none" }}>
        <div className={`${styles.editorRow} f-between p-relative`}>
          <Button
            className="pointer"
            onMouseDown={e => e.stopPropagation()}
            onClick={onCalNameClick}>
            {calendar ? calendar?.name : null}
          </Button>

          <Modal
            display={calListDisplay}
            width="150px"
            height="fit-content"
            y={50}
            x={30}>
            <CalList onCalChange={onCalChange} />
          </Modal>

          <Button
            className={`${styles.btn} ${colorBtnConditionalClassNames} f-between m-right2`}>
            <>
              <div
                className={styles.color}
                style={{ backgroundColor: calendar?.color }}></div>
              <RiArrowDownSLine />
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cal;
