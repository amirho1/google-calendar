import React from "react";
import { capitalize } from "../../utils/helpers";
import ListItem from "./ListItem/ListItem";
import styles from "./ULLinks.module.scss";

export type CB = (
  item: IItem,
  aClassName?: string,
  index?: number
) => JSX.Element;

export interface IItem {
  url?: string;
  icon?: JSX.Element | string;
  tag: string;
  cb?: CB;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: IItem[];
}

interface Props {
  ulClassName?: string;
  liClassName?: string;
  aClassName?: string;
  listOfItems: IItem[];
  anchorTarget?: React.HTMLAttributeAnchorTarget;
  plusMinesClassName?: string;
  parentWrapperClassName?: string;
  childClassName?: string;
}

export const testID = "ULLinks";

function ULLinks({
  listOfItems = [],
  plusMinesClassName,
  ulClassName,
  liClassName,
  aClassName,
  anchorTarget,
  parentWrapperClassName,
  childClassName,
}: Props) {
  if (!listOfItems || !listOfItems.length) {
    const error = new Error("Property listOfItems is empty");

    console.warn(`${ULLinks.name} ${error}`);

    return <ul className={ulClassName} data-testid={testID}></ul>;
  }

  return (
    <ul className={ulClassName} data-testid={testID}>
      {listOfItems.map((item, index) => {
        if (item.cb)
          return (
            <ListItem
              item={item}
              anchorTarget={anchorTarget}
              childClassName={childClassName}
              parentWrapperClassName={parentWrapperClassName}
              key={index}
              aClassName={aClassName}
              ulClassName={ulClassName}
              plusMinesClassName={plusMinesClassName}
              liClassName={liClassName}>
              {item.cb(item, aClassName)}
            </ListItem>
          );

        return (
          <ListItem
            parentWrapperClassName={parentWrapperClassName}
            item={item}
            ulClassName={ulClassName}
            plusMinesClassName={plusMinesClassName}
            liClassName={liClassName}
            aClassName={aClassName}
            childClassName={childClassName}
            anchorTarget={anchorTarget}
            key={index}>
            <a
              className={aClassName}
              target={anchorTarget}
              rel={anchorTarget === "_blank" ? "noreferrer" : undefined}
              href={item.url}>
              <span className={styles.Tag}>{capitalize(item.tag)}</span>
              {item.icon}
            </a>
          </ListItem>
        );
      })}
    </ul>
  );
}

export default ULLinks;
