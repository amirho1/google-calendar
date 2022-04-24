import { EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";
import React, { FC, useCallback, useState } from "react";
import Button from "../Button/Button";
import DescriptionEditor from "../DescriptionEditor/DescriptionEditor";
import styles from "./Description.module.scss";

interface DescriptionProps {}

const Description: FC<DescriptionProps> = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromHTML(""))
  );

  const onEditorChange = useCallback((state: EditorState) => {
    setEditorState(state);
  }, []);

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
          onEditorChange={onEditorChange}
        />
      </div>
    </div>
  );
};

export default Description;
