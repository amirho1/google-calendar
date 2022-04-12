/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import HoverCircle from "../../HoverCircle/HoverCircle";
import ULLinks, { IItem } from "../ULLinks";
import styles from "./ListItem.module.scss";

interface Props {
  item: IItem;
  ulClassName?: string;
  liClassName?: string;
  aClassName?: string;
  plusMinesClassName?: string;
  children: JSX.Element;
  parentWrapperClassName?: string;
  anchorTarget?: React.HTMLAttributeAnchorTarget;
  childClassName?: string;
}

function ListItem({
  item,
  childClassName,
  ulClassName,
  liClassName,
  aClassName,
  plusMinesClassName,
  children,
  parentWrapperClassName,
  anchorTarget,
}: Props) {
  const [childDisplay, setChildDisplay] = useState(false);
  const hoverStyles = useMemo<React.CSSProperties>(
    () => ({ width: "30px", height: "30px", color: "#e9e9e9" }),
    []
  );

  const onPlusMinusClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setChildDisplay(current => !current);
  };

  return (
    <li className={liClassName} onClick={item.onClick}>
      <div className={parentWrapperClassName}>
        {children}

        {item.children?.length ? (
          !childDisplay ? (
            <HoverCircle style={hoverStyles}>
              <a onClick={onPlusMinusClick} className="f-center">
                <FaPlus className={`${styles.plus} ${plusMinesClassName}`} />
              </a>
            </HoverCircle>
          ) : (
            <HoverCircle style={hoverStyles} className="f-center">
              <a onClick={onPlusMinusClick} className="f-center">
                <FaMinus className={`${styles.minus} ${plusMinesClassName}`} />
              </a>
            </HoverCircle>
          )
        ) : null}
      </div>

      {/* if target link had child */}
      <div className={`${styles.child} ${childClassName}`}>
        {item.children ? (
          <ULLinks
            listOfItems={item.children}
            childClassName={childClassName}
            anchorTarget={anchorTarget}
            ulClassName={`${styles.heightZero} ${ulClassName} ${
              childDisplay ? styles.heightFitContent : ""
            }`}
            parentWrapperClassName={parentWrapperClassName}
            plusMinesClassName={plusMinesClassName}
            liClassName={liClassName}
            aClassName={aClassName}
          />
        ) : null}
      </div>
    </li>
  );
}

export default ListItem;
