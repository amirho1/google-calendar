import React, { FC, useCallback, useState } from "react";
import styles from "./AuthInp.module.scss";

interface AuthInpProps {
  htmlFor: string;
  type: "password" | "text" | "email";
  label: string;
  value: string;
  onChange: (val: string) => void;
  require?: boolean;
  error?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const AuthInp: FC<AuthInpProps> = ({
  htmlFor,
  type,
  label,
  value,
  onChange,
  onBlur,
  require = false,
  error,
}) => {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onInputBlur = useCallback(
    e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  return (
    <div className={styles.AuthInp} data-testid="AuthInp">
      <input
        className={`${styles.input} ${error ? styles.errorBorder : ""}`}
        value={value}
        type={type}
        id={htmlFor}
        onChange={e => onChange(e.currentTarget.value)}
        required={require}
        onFocus={onFocus}
        onBlur={onInputBlur}
      />
      <label
        className={`${styles.label} ${error ? styles.errorColor : ""} ${
          focus || value ? styles.labelTop : ""
        }`}
        htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
};

export default AuthInp;
