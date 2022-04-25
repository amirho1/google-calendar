import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
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
  zIndex?: number;
  position?: "absolute" | "fixed";
  getRef?: (ref: React.RefObject<HTMLDivElement>) => any;
  onMouseDown?: onEventMouseDown;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}

export type onEventMouseDown = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ref: React.RefObject<HTMLDivElement>
) => void;

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
  zIndex = 900,
  getRef,
  position = "absolute",
  onMouseDown,
  onMouseUp,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getRef) getRef(ref);
  }, [getRef]);

  const styles = useMemo<React.CSSProperties>(
    () => ({
      display: display ? "block" : "none",
      height: height,
      width,
      minHeight: "15px",
      position,
      left: x,
      top: y,
      boxShadow: boxShadow ? "1px 1px 10px 5px var(--box-shadow)" : undefined,
      borderRadius: "5px",
      backgroundColor: backgroundColor,
      zIndex: zIndex,
      transition: "linear .1s height",
    }),
    [display, height, width, position, x, y, boxShadow, backgroundColor, zIndex]
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

  const onBottomBorderMouseDown =
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

  const onBodyMouseDon = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      if (onMouseDown) onMouseDown(e, ref);
    },
    [onMouseDown]
  );

  return (
    <div
      ref={ref}
      style={styles}
      data-testid="Modal"
      onMouseDown={onBodyMouseDon}
      onMouseUp={onMouseUp}>
      {children}
      {resizeAble ? (
        <div style={bottomStyle} onMouseDown={onBottomBorderMouseDown()}></div>
      ) : null}
    </div>
  );
};

export default Modal;
