import React, { FC, useMemo } from "react";
import styles from "./DefaultImg.module.scss";

interface DefaultImgProps {
  name: string;
  className?: string;
}

const DefaultImg: FC<DefaultImgProps> = ({ name, className }) => {
  const firstWord = useMemo(() => (name ? name[0].toUpperCase() : ""), [name]);

  return (
    <div
      className={`${styles.DefaultImg} f-center ${className}`}
      data-testid="DefaultImg">
      <span>{firstWord}</span>
    </div>
  );
};

export default DefaultImg;
