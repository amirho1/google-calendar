import React, { FC, useCallback, useEffect, useRef } from "react";
import styles from "./ColorsSlider.module.scss";

interface ColorsSliderProps {
  setColorPickerColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorsSlider: FC<ColorsSliderProps> = ({ setColorPickerColor }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const onColorsClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    e => {
      const ctx = ref.current?.getContext("2d");
      const { x: elementX, y: elementY } =
        e.currentTarget.getBoundingClientRect();
      const x = e.clientX - elementX;
      const y = e.clientY - elementY;
      const pixel = ctx?.getImageData(x, y, 1, 1).data;
      if (pixel) {
        const rbg = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        setColorPickerColor(rbg);
      }
    },
    [setColorPickerColor]
  );

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    const gradientH = ctx?.createLinearGradient(0, 0, ctx.canvas.width, 0);

    const oneDividedByEight = 1 / 8;

    gradientH?.addColorStop(oneDividedByEight, "orange");
    gradientH?.addColorStop(oneDividedByEight * 2, "yellow");
    gradientH?.addColorStop(oneDividedByEight * 3, "#0dff00");
    gradientH?.addColorStop(oneDividedByEight * 4, "#00fff2");
    gradientH?.addColorStop(oneDividedByEight * 5, "#0004ff");
    gradientH?.addColorStop(oneDividedByEight * 6, "#ff00e1");
    gradientH?.addColorStop(oneDividedByEight * 7, "#ff0000");

    if (ctx) {
      ctx.fillStyle = gradientH || "";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [ref]);

  return (
    <canvas
      ref={ref}
      width={300}
      height={30}
      className={`${styles.ColorsSlider}`}
      onClick={onColorsClick}></canvas>
  );
};

export default ColorsSlider;
