import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { addOrSubtractSpecificAmount } from "../../utils/helpers";
import { PrimitivesT } from "../Table/Table";

export type OnResizeT = (resize: number | undefined) => void;

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
  onMouseDown?: onEventMouseDownT;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onBottomBorderMouseDownOuter?: () => void;
  onBottomBorderMouseUpOuter?: () => void;
  onRightClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  borderRadios?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onResize?: OnResizeT;
  onBottomBorderMouseMove?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export type onEventMouseDownT = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ref: React.RefObject<HTMLDivElement>
) => void;

const Modal: FC<ModalProps> = ({
  children,
  display = false,
  height = "0",
  width = "0",
  x,
  y,
  boxShadow = true,
  resizeAble = false,
  backgroundColor = "white",
  zIndex = 90,
  getRef,
  position = "absolute",
  onMouseDown,
  onMouseUp,
  onBottomBorderMouseDownOuter,
  onBottomBorderMouseUpOuter,
  onRightClick,
  className,
  borderRadios = "2px",
  onClick,
  onResize,
  onBottomBorderMouseMove,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getRef) getRef(ref);
  }, [getRef]);

  const styles = useMemo<React.CSSProperties>(
    () => ({
      height: height,
      width,
      minHeight: "15px",
      position,
      left: x,
      top: y,
      boxShadow: boxShadow ? "1px 1px 10px 5px var(--box-shadow)" : undefined,
      borderRadius: borderRadios,
      backgroundColor: backgroundColor,
      zIndex: zIndex,
    }),
    [
      height,
      width,
      position,
      x,
      y,
      boxShadow,
      borderRadios,
      backgroundColor,
      zIndex,
    ]
  );

  const bottomStyle = useMemo<React.CSSProperties>(
    () => ({
      cursor: "row-resize",
      width: "100%",
      position: "absolute",
      bottom: "1px",
      left: "0",
      height: "5px",
    }),
    []
  );

  const onBottomBorderMouseDown =
    useCallback((): React.MouseEventHandler<HTMLDivElement> => {
      let y = 0;
      let h = 60;
      let finalHeight: number | undefined = undefined;
      const onMouseMove = (e: MouseEvent) => {
        onBottomBorderMouseMove && onBottomBorderMouseMove(e as any);

        const YDir = e.clientY - y + 5;
        if (ref.current) {
          ref.current.style.cursor = "row-resize";
          finalHeight = addOrSubtractSpecificAmount(h, h + YDir, 15);
          ref.current.style.position = "none";
          ref.current.style.height = `${finalHeight}px`;
        }
      };

      const onMouseUp = (e: MouseEvent) => {
        e.stopPropagation();
        if (ref.current) ref.current.style.cursor = "initial";
        if (finalHeight && onResize) {
          onResize(finalHeight);
        }
        if (ref.current) ref.current.style.zIndex = "90";

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (onBottomBorderMouseUpOuter) onBottomBorderMouseUpOuter();
      };

      return e => {
        e.stopPropagation();
        if (ref.current) ref.current.style.zIndex = "250";

        if (onBottomBorderMouseDownOuter) onBottomBorderMouseDownOuter();
        const bounding = ref.current?.getBoundingClientRect();
        if (bounding?.height) h = bounding?.height;
        y = e.clientY;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
    }, [onBottomBorderMouseDownOuter, onBottomBorderMouseUpOuter, onResize]);

  const onBodyMouseDon = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      if (onMouseDown) onMouseDown(e, ref);
    },
    [onMouseDown]
  );

  if (!display) return null;

  return (
    <div
      ref={ref}
      style={styles}
      data-testid="Modal"
      onMouseDown={onBodyMouseDon}
      onMouseUp={onMouseUp}
      className={className}
      onContextMenu={e => {
        e.preventDefault();
        onRightClick && onRightClick(e);
      }}
      onClick={e => {
        e.stopPropagation();
        onClick && onClick(e);
      }}>
      {children}
      {resizeAble ? (
        <div
          style={bottomStyle}
          onMouseDown={onBottomBorderMouseDown()}
          onClick={e => e.stopPropagation()}></div>
      ) : null}
    </div>
  );
};

export default Modal;
