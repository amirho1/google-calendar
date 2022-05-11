import React, { FC } from "react";
import HoverCircle from "../HoverCircle/HoverCircle";
import styles from "./Color.module.scss";

interface ColorProps {
  color: string;
  onColorChange?: (color: string) => void;
  dataTip?: string;
  className?: string;
}

const Color: FC<ColorProps> = ({
  dataTip,
  color,
  onColorChange,
  className,
}) => {
  return (
    <HoverCircle
      dataTip={dataTip}
      backgroundColor={color}
      background={true}
      hover={false}
      width="18px"
      height="18px"
      className={className}>
      <div
        className={styles.Color}
        onClick={e => {
          onColorChange && onColorChange(color);
          e.stopPropagation();
        }}
        data-testid="Color"></div>
    </HoverCircle>
  );
};

export default Color;
