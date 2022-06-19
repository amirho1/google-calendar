import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import { TiTick } from "react-icons/ti";

interface CheckboxProps {
  value?: boolean;
  color: string;
  onChange: (value: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ color, value, onChange, className }) => {
  const [select, setSelect] = useState(!!value);

  const onClick = useCallback(() => {
    setSelect(current => !current);
    onChange(!select);
  }, [onChange, select]);

  useEffect(() => {
    setSelect(!!value);
  }, [value]);

  return (
    <div
      className={`${styles.Checkbox} f-center ${className}`}
      data-testid="Checkbox"
      style={{
        backgroundColor: select ? color : "white",
        border: `2px solid ${color}`,
      }}
      onClick={onClick}>
      {select ? <TiTick className={`colWhite ${styles.tick}`} /> : null}
    </div>
  );
};

export default Checkbox;
