import React, { FC } from "react";
import styles from "./Line.module.scss";

interface LineProps {
  color?: string;
  width: string;
  height: string;
  className?: string;
  vertical?: boolean;
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  hour?: number;
}

const Line: FC<LineProps> = ({
  vertical,
  color = "var(--gray)",
  width,
  height,
  className,
  left,
  top,
  right,
  bottom,
  hour,
}) => {
  const verticalStyles = vertical ? { left, top, right, bottom } : {};

  return (
    <div
      className={`${styles.Line} ${className} ${
        vertical ? styles.vertical : ""
      }`}
      style={{
        backgroundColor: color,
        width,
        height,
        ...verticalStyles,
      }}>
      <div
        className={styles.hour}
        style={{ display: vertical ? "none" : "block" }}>
        {hour}
      </div>
    </div>
  );
};

export default Line;
