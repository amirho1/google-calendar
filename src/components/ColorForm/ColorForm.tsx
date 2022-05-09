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
      { color: "blue", dataTip: "آبی" },
      { color: "red", dataTip: "قرمز" },
      { color: "yellow", dataTip: "زرد" },
      { color: "orange", dataTip: "نارنجی" },
      { color: "purple", dataTip: "بنفش" },
      { color: "pink", dataTip: "صورتی" },
      { color: "green", dataTip: "سبز" },
      { color: "lightblue", dataTip: "آبی کم رنگ" },
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
