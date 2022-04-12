import React, { FC } from "react";
import { PrimitivesT } from "../Table/Table";

interface ModalProps {
  children: JSX.Element | PrimitivesT;
  display: boolean;
  width: string;
  height: string;
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
  const styles: React.CSSProperties = {
    display: display ? "block" : "none",
    height,
    width,
    position: "fixed",
    left: x,
    top: y,
    boxShadow: "1px 1px 10px 5px var(--gray)",
    transition: "all linear .3s",
    borderRadius: "5px",
  };

  return (
    <div style={styles} data-testid="Modal">
      {children}
    </div>
  );
};

export default Modal;
