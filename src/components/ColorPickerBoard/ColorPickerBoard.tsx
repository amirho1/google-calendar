import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./ColorPickerBoard.module.scss";

interface ColorPickerBoardProps {
  color: string;
  onColorChange: (color: string) => void;
}

const ColorPickerBoard: FC<ColorPickerBoardProps> = ({
  color,
  onColorChange,
}) => {
  const colorPickerRef = useRef<HTMLCanvasElement>(null);
  const ctx = useMemo(
    () => colorPickerRef.current?.getContext("2d"),
    [colorPickerRef, colorPickerRef.current]
  );

  const clear = useCallback(() => {
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [ctx]);

  const drawBoard = useCallback(() => {
    clear();

    const gradientH = ctx?.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientH?.addColorStop(0, "#fff");
    gradientH?.addColorStop(1, color);
    if (ctx) {
      ctx.fillStyle = gradientH || "";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    const gradientV = ctx?.createLinearGradient(0, 0, 0, 300);
    gradientV?.addColorStop(0, "rgba(0,0,0,0)");
    gradientV?.addColorStop(1, "#000");
    if (ctx) {
      ctx.fillStyle = gradientV || "";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [clear, ctx, color]);

  // main board
  useEffect(() => {
    drawBoard();
  }, [drawBoard, clear]);

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    e => {
      const { x: elementX, y: elementY } =
        e.currentTarget.getBoundingClientRect();
      const x = e.clientX - elementX;
      const y = e.clientY - elementY;

      const pixel = ctx?.getImageData(x, y, 1, 1)["data"];
      if (pixel) {
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        onColorChange(rgb);
      }
    },
    [ctx, onColorChange]
  );

  return (
    <canvas
      ref={colorPickerRef}
      width={250}
      height={250}
      className={`${styles.ColorPickerBoard}`}
      onClick={onClick}></canvas>
  );
};

export default ColorPickerBoard;
