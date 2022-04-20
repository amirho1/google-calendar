import React, { FC, useCallback, useMemo, useRef } from "react";
import { addOrSubtractSpecificAmount } from "../../utils/helpers";

import { PrimitivesT } from "../Table/Table";
interface ModalProps {
  children: JSX.Element | PrimitivesT;
  display: boolean;
  width: string;
  height: string;
  x?: number;
  y?: number;
  boxShadow?: boolean;
  resizeAble?: true;
  backgroundColor?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  display = false,
  // initial height
  height = "0",
  width = "0",
  x,
  y,
  boxShadow = true,
  resizeAble = false,
  backgroundColor = "white",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const styles = useMemo<React.CSSProperties>(
    () => ({
      display: display ? "block" : "none",
      height: height,
      width,
      minHeight: "15px",
      position: "absolute",
      left: x,
      top: y,
      boxShadow: boxShadow ? "1px 1px 10px 5px var(--gray)" : undefined,
      borderRadius: "5px",
      backgroundColor: backgroundColor,
      zIndex: 900,
      transition: "linear .1s height",
    }),
    [display, height, width, x, y, boxShadow, backgroundColor]
  );

  const bottomStyle = useMemo<React.CSSProperties>(
    () => ({
      cursor: "row-resize",
      width: "100%",
      position: "absolute",
      bottom: "0",
      left: "0",
      height: "5px",
    }),
    []
  );

  const onMouseDown =
    useCallback((): React.MouseEventHandler<HTMLDivElement> => {
      let y = 0;
      let h = 60;

      const onMouseMove = (e: MouseEvent) => {
        const YDir = e.clientY - y;
        if (ref.current)
          ref.current.style.height = `${addOrSubtractSpecificAmount(
            h,
            h + YDir,
            15
          )}px`;
      };

      const onMouseUp = (e: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMove);
      };

      return e => {
        const bounding = ref.current?.getBoundingClientRect();
        if (bounding?.height) h = bounding?.height;
        y = e.clientY;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
    }, []);

  return (
    <div
      ref={ref}
      style={styles}
      data-testid="Modal"
      onMouseDown={e => e.stopPropagation()}>
      {children}
      {resizeAble ? (
        <div style={bottomStyle} onMouseDown={onMouseDown()}></div>
      ) : null}
    </div>
  );
};

export default Modal;