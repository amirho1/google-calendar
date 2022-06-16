import React, { FC, useCallback, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
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
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const HoverCircle: FC<HoverCircleProps> = ({
  hover = true,
  children,
  background,
  backgroundColor = "var(--hover)",
  className,
  width,
  height,
  dataTip,
  onClick,
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

  if (!dataTip)
    return (
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
          onClick && onClick(e);
        }}>
        {children}
      </div>
    );

  return (
    <Tippy content={dataTip}>
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
          onClick && onClick(e);
        }}>
        {children}
      </div>
    </Tippy>
  );
};

export default HoverCircle;
