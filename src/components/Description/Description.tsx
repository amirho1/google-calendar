import { EditorState } from "draft-js";
import React, { FC, useCallback, useState } from "react";
import Button from "../Button/Button";
import DescriptionEditor from "../DescriptionEditor/DescriptionEditor";
import styles from "./Description.module.scss";

interface DescriptionProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const Description: FC<DescriptionProps> = ({
  editorState,
  onEditorStateChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const onEditModeChange = useCallback(() => {
    setIsEditMode(true);
  }, []);

  return (
    <div className={styles.Description} data-testid="Description">
      <Button
        style={{ display: isEditMode ? "none" : "block" }}
        onClick={onEditModeChange}>
        توضیحات
      </Button>

      <div className={`${styles.edit} ${isEditMode ? styles.openEdit : ""}`}>
        <DescriptionEditor
          editorState={editorState}
          onEditorChange={onEditorStateChange}
        />
      </div>
    </div>
  );
};

export default Description;
