import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Button from "../../Button/Button";
import styles from "./Cal.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import CalList from "../../CalList/CalList";
import Modal from "../../Modal/Modal";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../../redux";
import { CalendarI } from "../../../redux/sagas/calendars";
import ColorForm from "../../ColorForm/ColorForm";
import Color from "../../Color/Color";
import { EventFormContext, OnColorChangeT } from "../../Day/Day";

interface CalProps {
  calId: string;
  onCalChange: (id: string) => void;
  onColorChange: OnColorChangeT;
}

const Cal: FC<CalProps> = ({ calId, onCalChange, onColorChange }) => {
  const [calListDisplay, setCalListDisplay] = useState(false);
  const [colorFormDisplay, setColorFormDisplay] = useState(false);
  const { eventForm } = useContext(EventFormContext);

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
      return (c._id as any) === calId;
    })
  );

  const changeColorFormDisplay = useCallback(() => {
    setColorFormDisplay(current => !current);
  }, []);

  const closeColorForm = useCallback(() => {
    setColorFormDisplay(false);
  }, []);

  useEffect(() => {
    if (calendar?.color) onColorChange(calendar?.color);
  }, [calendar?.color, onColorChange]);

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
          <Color color={calendar?.color || ""} onColorChange={onColorChange} />
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
            onClick={() => changeColorFormDisplay()}
            className={`${styles.btn} ${colorBtnConditionalClassNames} f-between m-right2`}>
            <>
              <Color color={eventForm.color} onColorChange={onColorChange} />
              <RiArrowDownSLine />
            </>
          </Button>

          <Modal
            display={colorFormDisplay}
            width="120px"
            x={-30}
            y={40}
            height="fit-content">
            <ColorForm
              closeColorForm={closeColorForm}
              onColorChange={onColorChange}
              color={eventForm.color}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cal;
