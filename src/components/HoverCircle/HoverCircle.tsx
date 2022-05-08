import React, { FC, useCallback, useEffect, useRef } from "react";
import { Tooltip } from "react-tippy";
import { PrimitivesT } from "../Table/Table";
import styles from "./HoverCircle.module.scss";

interface HoverCircleProps {
  children: JSX.Element | PrimitivesT;
  width?: string;
  height?: string;
  hover?: boolean;
  background?: boolean;
  backgroundColor?: string;
  className?: string;
  dataTip?: string;
}

const HoverCircle: FC<HoverCircleProps> = ({
  hover = true,
  children,
  background,
  backgroundColor = "var(--gray)",
  className,
  width,
  height,
  dataTip,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.children[0].classList.add("f-center");
  });

  const onMouseOver = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      e.currentTarget.style.backgroundColor = backgroundColor || "";
    },
    [backgroundColor]
  );

  const onMouseOut = useCallback<React.MouseEventHandler<HTMLDivElement>>(e => {
    e.currentTarget.style.backgroundColor = "";
  }, []);

  return (
    <Tooltip title={dataTip}>
      <div
        data-testid="HoverCircle"
        ref={ref}
        onMouseOver={hover ? onMouseOver : undefined}
        onMouseOut={hover ? onMouseOut : undefined}
        style={{
          backgroundColor: background ? backgroundColor : "",
          width,
          height,
        }}
        className={`${styles.HoverCircle} f-center ${className}`}
        onClick={e => {
          (e.currentTarget.children[0] as HTMLElement).click();
        }}>
        {children}
      </div>
    </Tooltip>
  );
};

export default HoverCircle;
