import React, { FC, useCallback, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  tag: string;
  type?: "input" | "textarea";
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const Input: FC<InputProps> = ({
  tag,
  onChange,
  value = "",
  type = "input",
}) => {
  const refInput = useRef<HTMLInputElement>(null);
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const [focus, setFocus] = useState(false);

  const selectInput = useCallback(() => {
    refInput.current?.select();
    refInput.current?.focus();
  }, []);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <div
      className={styles.InputWrapper}
      data-testid="Input"
      onClick={selectInput}>
      <div className={styles.labelWrapper}>
        <label
          htmlFor={tag}
          className={`${styles.label} ${focus ? "colBlue" : ""} ${
            value || focus ? styles.onFocus : ""
          }`}>
          {tag}
        </label>
      </div>

      {type === "input" ? (
        <input
          id={tag}
          value={value}
          onChange={onChange}
          className={styles.input}
          ref={refInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          id={tag}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${styles.textarea}`}
          ref={refTextArea}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}

      <div className={styles.bottomBorder}></div>
    </div>
  );
};

export default Input;
