import React, { FC, useCallback, useMemo, useState } from "react";
import Button from "../../Button/Button";
import styles from "./Cal.module.scss";
import { RiArrowDownSLine,  } from "react-icons/ri";

interface CalProps {
  calName: string;
}

const Cal: FC<CalProps> = ({ calName }) => {
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

  return (
    <div
      className={`${styles.Cal} ${calConditionalClassNames}`}
      data-testid="Cal"
      onClick={onClick}>
      <div className={`f-between owl-mright ${styles.mainRow}`}>
        <h2>{calName}</h2>{" "}
        <Button
          className={`${styles.btn} ${colorBtnConditionalClassNames} f-between`}>
          <>
            <div className={styles.color}></div>
            <RiArrowDownSLine />
          </>
        </Button>
      </div>

      <div className={styles.otherThings}>
        مشغول . نمایان بودن پیش فرض . ۳۰ دقیقه قبل از رویداد اعلان شود
      </div>
    </div>
  );
};

export default Cal;
