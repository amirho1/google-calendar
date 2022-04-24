import React, { FC } from "react";
import styles from "./DescriptionEditor.module.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

interface DescriptionEditorProps {
  editorState: EditorState;
  onEditorChange: (state: EditorState) => void;
}

const DescriptionEditor: FC<DescriptionEditorProps> = ({
  editorState,
  onEditorChange,
}) => {
  return (
    <div className={styles.DescriptionEditor} data-testid="DescriptionEditor">
      <Editor
        toolbar={{
          options: ["blockType", "list", "link"],
        }}
        editorState={editorState}
        toolbarClassName={styles.toolbarClassName}
        wrapperClassName={styles.wrapperClassName}
        editorClassName={styles.editorClassName}
        onEditorStateChange={onEditorChange}
      />
    </div>
  );
};

export default DescriptionEditor;
