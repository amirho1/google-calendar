import React, { FC, useCallback, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  tag: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "input" | "textarea";
  small?: boolean;
  backgroundColor?: string;
  fixedBorder?: boolean;
  inpWrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Input: FC<InputProps> = ({
  tag,
  onChange,
  value = "",
  type = "input",
  small = false,
  backgroundColor = "var(--gray)",
  fixedBorder = false,
  inpWrapperClassName,
  inputClassName,
  labelClassName,
  onClick,
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
      className={`${styles.InputWrapper} ${
        fixedBorder ? styles.fixedBorder : ""
      } ${inpWrapperClassName} ${small ? styles.small : ""}`}
      data-testid="Input"
      onClick={e => {
        if (onClick) onClick(e);
        selectInput();
      }}
      style={{ backgroundColor }}>
      <div className={`${styles.labelWrapper} ${small && "d-none"}`}>
        <label
          htmlFor={tag}
          className={`${styles.label} ${focus ? "colBlue" : ""} ${
            value || focus ? styles.onFocus : ""
          } ${labelClassName}`}>
          {tag}
        </label>
      </div>

      {type === "input" ? (
        <input
          id={tag}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${inputClassName}`}
          ref={refInput}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={small ? tag : undefined}
        />
      ) : (
        <textarea
          id={tag}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${styles.textarea}  ${inputClassName}`}
          ref={refTextArea}
          placeholder={small ? tag : undefined}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}

      <div className={styles.bottomBorder}></div>
    </div>
  );
};

export default Input;
