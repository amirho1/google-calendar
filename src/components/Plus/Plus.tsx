import React, { FC, HTMLAttributes, useMemo } from "react";
import styles from "./Plus.module.scss";
import { FaPlus } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

interface PlusProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  fullSize: boolean;
}

const Plus: FC<PlusProps> = props => {
  const { fullSize, onClick, text, ...rest } = { ...props };

  const display = useMemo(() => (fullSize ? "block" : "none"), [fullSize]);

  return (
    <div
      {...rest}
      className={`${styles.Plus} f-between ${props.className}`}
      data-testid="Plus"
      style={{ width: fullSize ? "145px" : "50px" }}
      onClick={onClick}>
      <FaPlus className={styles.FaPlus} />

      <span style={{ display }}>{text}</span>

      <MdArrowDropDown style={{ display }} />
    </div>
  );
};

export default Plus;
