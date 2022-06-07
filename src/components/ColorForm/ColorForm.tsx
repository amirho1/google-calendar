import React, { FC, useCallback, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Color from "../Color/Color";
import ColorPicker from "../ColorPicker/ColorPicker";
import { centerOFScreen } from "../Day/Day";
import HoverCircle from "../HoverCircle/HoverCircle";
import Modal from "../Modal/Modal";
import styles from "./ColorForm.module.scss";

interface ColorFormProps {
  onColorChange: (color: string) => void;
  color: string;
  closeColorForm: () => void;
}

interface ColorI {
  color: string;
  dataTip: string;
}

const ColorForm: FC<ColorFormProps> = ({
  onColorChange,
  color,
  closeColorForm,
}) => {
  const [colorInpDisplay, setColorInpDisplay] = useState(false);

  const colors = useMemo<ColorI[]>(
    () => [
      { color: "#0000ff", dataTip: "آبی" },
      { color: "#ff0000", dataTip: "قرمز" },
      { color: "#ffff00", dataTip: "زرد" },
      { color: "#ffa500", dataTip: "نارنجی" },
      { color: "#800080", dataTip: "بنفش" },
      { color: "#ffc0cb", dataTip: "صورتی" },
      { color: "#008000", dataTip: "سبز" },
      { color: "#add8e6", dataTip: "آبی کم رنگ" },
      { color: "#616161", dataTip: "سرب" },
    ],
    []
  );

  const { x, y } = useMemo(centerOFScreen, []);

  const openAndCloseColorInp = useCallback(e => {
    e.stopPropagation();

    setColorInpDisplay(current => !current);
  }, []);

  const closeColorIn = useCallback(() => {
    setColorInpDisplay(false);
  }, []);

  return (
    <div data-testid="ColorForm" className={`${styles.ColorForm}`}>
      <Modal
        display={colorInpDisplay}
        x={x}
        y={y}
        width="150"
        position="fixed"
        height="fit-content">
        <ColorPicker
          color={color}
          onColorChange={onColorChange}
          close={closeColorIn}
        />
      </Modal>

      <div className={styles.colorsWrapper}>
        {colors.map((color, index) => (
          <Color
            key={index}
            color={color.color}
            className="pointer"
            dataTip={color.dataTip}
            onColorChange={color => {
              onColorChange(color);
              closeColorForm();
            }}
          />
        ))}

        <HoverCircle
          dataTip="افزودن رنگ سفارشی"
          width="20px"
          height="20px"
          className={`pointer`}
          background={true}
          backgroundColor="var(--gray)"
          hover={false}>
          <div onClick={openAndCloseColorInp}>
            <FaPlus />
          </div>
        </HoverCircle>
      </div>
    </div>
  );
};

export default ColorForm;
