/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useState } from "react";
import { FadeContext } from "../../App";
import Button from "../Button/Button";
import ColorPickerBoard from "../ColorPickerBoard/ColorPickerBoard";
import ColorsSlider from "../ColorsSlider/ColorsSlider";
import styles from "./ColorPicker.module.scss";

export type OnColorChangeT = (color: string) => void;

interface ColorPickerProps {
  color: string;
  onColorChange: OnColorChangeT;
  close: () => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color, onColorChange, close }) => {
  const [colorPickerColor, setColorPickerColor] = useState(color);
  const { closeFade } = useContext(FadeContext);
  return (
    <div className={`${styles.ColorPicker} owl-mtop`} data-testid="ColorPicker">
      <h2>انتخاب رنگ سفارشی</h2>
      <p>
        رنگ پس‌زمینه‌ای برای این تقویم انتخاب کنید، رنگ نوشتار به‌طور خودکار
        تنظیم خواهد شد.
      </p>

      <ColorPickerBoard
        color={colorPickerColor}
        onColorChange={onColorChange}
      />

      <ColorsSlider setColorPickerColor={setColorPickerColor} />

      <div className={styles.btns}>
        <Button
          className="hoverBGGray"
          onClick={() => {
            close();
            closeFade();
          }}>
          لغو
        </Button>
        <Button className="link" onClick={close}>
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default ColorPicker;
