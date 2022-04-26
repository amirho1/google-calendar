import React, { FC, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {}

const ContextMenu: FC<ContextMenuProps> = () => {
  const colors = useMemo<{ name: string; color: string }[]>(
    () => [
      { name: "قرمز", color: "red" },
      { name: "آبی", color: "blue" },
      { name: "زرد", color: "yellow" },
      { name: "سبز", color: "green" },
      { name: "بنفش", color: "purple" },
      { name: "نارنجی", color: "orange" },
      { name: "صورتی", color: "pink" },
    ],
    []
  );

  return (
    <div className={`${styles.ContextMenu} d-flex`} data-testid="ContextMenu">
      <Button className={`${styles.delete} owl-mright hoverBGGray`}>
        <>
          <FaTrash />
          <span>حذف</span>
        </>
      </Button>

      <div className={`${styles.colorWrapper} f-between`}>
        {colors.map(color => (
          <div
            className={styles.color}
            style={{ backgroundColor: color.color }}
            data-tip={color.name}></div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
