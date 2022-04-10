import React, { FC, HTMLAttributes, useEffect, useRef } from "react";
import styles from "./HoverCircle.module.scss";

interface HoverCircleProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}

const HoverCircle: FC<HoverCircleProps> = props => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.children[0].classList.add("d-table", "f-center");
  });

  return (
    <div
      data-testid="HoverCircle"
      ref={ref}
      {...props}
      className={`${styles.HoverCircle} f-center`}
      onClick={e => {
        (e.currentTarget.children[0] as HTMLElement).click();
      }}>
      {props.children}
    </div>
  );
};

export default HoverCircle;
