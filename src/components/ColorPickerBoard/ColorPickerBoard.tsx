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
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
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
  }, [color, ref, ref.current, ref]);

  const onClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    e => {
      const ctx = ref.current?.getContext("2d");

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
    [onColorChange]
  );

  return (
    <canvas
      ref={ref}
      width={250}
      height={250}
      className={`${styles.ColorPickerBoard}`}
      onClick={onClick}></canvas>
  );
};

export default ColorPickerBoard;
