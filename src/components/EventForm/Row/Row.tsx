import React, { FC } from "react";
import styles from "./Row.module.scss";

interface RowProps {
  icon?: JSX.Element;
  children: JSX.Element;
  className?: string;
  pointer?: boolean;
  hover?: boolean;
  onBodyClick?: React.MouseEventHandler<HTMLDivElement>;
  bodyClassName?: string;
}

const Row: FC<RowProps> = ({
  icon,
  children,
  className,
  pointer = false,
  hover = false,
  onBodyClick,
  bodyClassName,
}) => {
  return (
    <div
      className={`${styles.Row} ${className} ${pointer ? "pointer" : ""} `}
      data-testid="Row">
      <div onClick={onBodyClick} className={styles.iconWrapper}>
        {icon}
      </div>

      <div
        className={`${styles.body} ${
          hover ? "hoverBGGray" : ""
        } ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Row;
