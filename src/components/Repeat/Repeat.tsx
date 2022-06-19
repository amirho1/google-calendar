import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useKeyDown from "../../hooks/useKeyDown";
import { stopPropagation } from "../../utils/helpers";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./Repeat.module.scss";

interface RepeatProps {}

const Repeat: FC<RepeatProps> = () => {
  const [display, setDisplay] = useState(false);

  const cb = useCallback<CB>(item => <div>{item.tag}</div>, []);

  const listOfItems = useMemo<IItem[]>(
    () => [
      {
        tag: "تکرار نمی شود",
        cb,
      },
      {
        tag: "روزانه",
        cb,
      },
    ],
    [cb]
  );

  const changeModalDisplay = useCallback(() => {
    setDisplay(current => !current);
  }, []);

  const closeDisplay = useCallback(() => {
    setDisplay(false);
  }, []);

  useKeyDown(({ key }) => {
    if (key === "Escape") closeDisplay();
  });

  useEffect(() => {
    document.addEventListener("mousedown", closeDisplay);

    return () => {
      document.removeEventListener("mousedown", closeDisplay);
    };
  }, [closeDisplay]);

  return (
    <div className={styles.Repeat}>
      <Button className="f-between" onClick={changeModalDisplay}>
        <>
          تکرار نمی شود
          <FaChevronDown />
        </>
      </Button>

      <Modal
        display={display}
        y={0}
        right="0"
        width="fit-content"
        height="fit-content"
        onMouseDown={stopPropagation}>
        <ULLinks
          listOfItems={listOfItems}
          ulClassName={styles.list}
          liClassName={styles.li}
        />
      </Modal>
    </div>
  );
};

export default Repeat;
