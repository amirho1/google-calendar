import React, { FC, HTMLAttributes, useCallback, useMemo } from "react";
import styles from "./Plus.module.scss";
import { FaPlus } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

interface PlusProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  fullSize: boolean;
  disable: boolean;
}

const Plus: FC<PlusProps> = props => {
  const { fullSize, onClick, text, disable = false, ...rest } = { ...props };

  const display = useMemo(() => (fullSize ? "block" : "none"), [fullSize]);

  const click = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      if (!disable) onClick(e);
    },
    [disable, onClick]
  );

  return (
    <div
      {...rest}
      className={`${styles.Plus} f-between ${props.className} ${
        disable && styles.disable
      }`}
      data-testid="Plus"
      style={{ width: fullSize ? "145px" : "50px" }}
      onClick={click}>
      <FaPlus className={styles.FaPlus} />

      <span style={{ display }}>{text}</span>

      <MdArrowDropDown style={{ display }} />
    </div>
  );
};

export default Plus;
