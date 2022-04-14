import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { addOrSubtractSpecificAmount } from "../../utils/helpers";
import { PrimitivesT } from "../Table/Table";

interface ModalProps {
  children: JSX.Element | PrimitivesT;
  display: boolean;
  width: number;
  height: number;
  x?: number;
  y?: number;
}

const Modal: FC<ModalProps> = ({
  children,
  display = false,
  height = 0,
  width = 0,
  x,
  y,
}) => {
  const [isMouseOnBottomBorder, setIsMouseOnBottomBorder] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [Height, setHeight] = useState(height);
  const ref = useRef<HTMLDivElement>(null);

  const styles: React.CSSProperties = useMemo(
    () => ({
      display: display ? "block" : "none",
      height: Height,
      width,
      minHeight: "15px",
      position: "absolute",
      left: x,
      top: y,
      boxShadow: "1px 1px 10px 5px var(--gray)",
      transition: "all linear .04s",
      borderRadius: "5px",
      backgroundColor: "white",
      zIndex: 900,
      cursor: isMouseOnBottomBorder ? "row-resize" : "pointer",
    }),
    [display, Height, isMouseOnBottomBorder, width, x, y]
  );

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      const { height, y: elementY } = e.currentTarget.getBoundingClientRect();
      if (
        e.clientY + 5 >= height + elementY &&
        e.clientY - 5 <= height + elementY
      )
        setIsMouseOnBottomBorder(true);
      else if (!isMouseDown) setIsMouseOnBottomBorder(false);
    },
    [isMouseDown]
  );

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      setIsMouseDown(true);
    },
    []
  );

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = useCallback(e => {
    setIsMouseDown(false);
  }, []);

  const rowResize = useCallback(
    (e: MouseEvent) => {
      let elementY: number | undefined;
      let newHeight: number | undefined;

      if (ref.current) ({ y: elementY } = ref.current?.getBoundingClientRect());
      if (elementY) newHeight = e.clientY - elementY;

      if (isMouseOnBottomBorder && isMouseDown && newHeight)
        setHeight(current =>
          addOrSubtractSpecificAmount(+current, newHeight ? +newHeight : 0, 15)
        );
    },
    [isMouseDown, isMouseOnBottomBorder]
  );

  useEffect(() => {
    window.addEventListener("mousemove", rowResize);
    window.addEventListener("mouseup", onMouseUp as any);

    return () => {
      window.removeEventListener("mousemove", rowResize);
      window.removeEventListener("mousemove", onMouseUp as any);
    };
  });

  return (
    <div
      ref={ref}
      style={styles}
      data-testid="Modal"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}>
      {children}
    </div>
  );
};

export default Modal;
