import React, { FC } from "react";
import styles from "./AuthInp.module.scss";

interface AuthInpProps {
  htmlFor: string;
  type: "password" | "text" | "email";
  label: string;
  value: string;
  onChange: (val: string) => void;
  require?: boolean;
}

const AuthInp: FC<AuthInpProps> = ({
  htmlFor,
  type,
  label,
  value,
  onChange,
  require = false,
}) => {
  return (
    <div className={styles.AuthInp} data-testid="AuthInp">
      <input
        className={`${styles.input}`}
        value={value}
        type={type}
        id={htmlFor}
        onChange={e => onChange(e.currentTarget.value)}
        required={require}
      />
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
};

export default AuthInp;
