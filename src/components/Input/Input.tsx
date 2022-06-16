import React, { FC, useCallback, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value?: string;
  tag: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "input" | "textarea";
  small?: boolean;
  backgroundColor?: string;
  fixedBorder?: boolean;
  inpWrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  bottomBorderClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  defaultValue?: string;
}

const Input: FC<InputProps> = ({
  tag,
  onChange,
  value = "",
  type = "input",
  small = false,
  defaultValue,
  backgroundColor = "var(--hover)",
  fixedBorder = false,
  inpWrapperClassName,
  inputClassName,
  labelClassName,
  bottomBorderClassName,
  onClick,
  onBlur,
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

  const onBlurDo = useCallback<
    React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

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
          value={defaultValue ? undefined : value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`${styles.input} ${inputClassName}`}
          ref={refInput}
          onFocus={onFocus}
          onBlur={onBlurDo}
          placeholder={small ? tag : undefined}
        />
      ) : (
        <textarea
          id={tag}
          value={defaultValue ? undefined : value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`${styles.input} ${styles.textarea}  ${inputClassName}`}
          ref={refTextArea}
          placeholder={small ? tag : undefined}
          onFocus={onFocus}
          onBlur={onBlurDo}
        />
      )}

      <div className={`${styles.bottomBorder} ${bottomBorderClassName}`}></div>
    </div>
  );
};

export default Input;
