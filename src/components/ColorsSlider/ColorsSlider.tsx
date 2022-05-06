import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./ColorsSlider.module.scss";

interface ColorsSliderProps {
  setColorPickerColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorsSlider: FC<ColorsSliderProps> = ({ setColorPickerColor }) => {
  const colorsRef = useRef<HTMLCanvasElement>(null);

  const colorsCtx = useMemo(
    () => colorsRef.current?.getContext("2d"),
    [colorsRef, colorsRef.current]
  );

  const onColorsClick = useCallback<React.MouseEventHandler<HTMLCanvasElement>>(
    e => {
      const { x: elementX, y: elementY } =
        e.currentTarget.getBoundingClientRect();
      const x = e.clientX - elementX;
      const y = e.clientY - elementY;
      const pixel = colorsCtx?.getImageData(x, y, 1, 1).data;
      if (pixel) {
        const rbg = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        setColorPickerColor(rbg);
      }
    },
    [colorsCtx, setColorPickerColor]
  );

  // different Colors
  useEffect(() => {
    const gradientH = colorsCtx?.createLinearGradient(
      0,
      0,
      colorsCtx.canvas.width,
      0
    );

    const oneDividedByEight = 1 / 8;

    gradientH?.addColorStop(oneDividedByEight, "orange");
    gradientH?.addColorStop(oneDividedByEight * 2, "yellow");
    gradientH?.addColorStop(oneDividedByEight * 3, "#0dff00");
    gradientH?.addColorStop(oneDividedByEight * 4, "#00fff2");
    gradientH?.addColorStop(oneDividedByEight * 5, "#0004ff");
    gradientH?.addColorStop(oneDividedByEight * 6, "#ff00e1");
    gradientH?.addColorStop(oneDividedByEight * 7, "#ff0000");

    if (colorsCtx) {
      colorsCtx.fillStyle = gradientH || "";
      colorsCtx.fillRect(0, 0, colorsCtx.canvas.width, colorsCtx.canvas.height);
    }
  }, [colorsCtx]);

  return (
    <canvas
      ref={colorsRef}
      width={300}
      height={30}
      className={`${styles.ColorsSlider}`}
      onClick={onColorsClick}></canvas>
  );
};

export default ColorsSlider;
