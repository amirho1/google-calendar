import React, { FC, useCallback, useMemo, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import ULLinks, { CB, IItem, SetState } from "../ULLinks/ULLinks";
import styles from "./SettingSidebar.module.scss";

interface SettingSidebarProps {}

const SettingSidebar: FC<SettingSidebarProps> = props => {
  const [target, setTarget] = useState<undefined | number>(undefined);
  const { pathname } = useLocation();

  const onCLick = useCallback((index, setChildDisplay?: SetState) => {
    setChildDisplay && setChildDisplay(current => !current);
    setTarget(index);
  }, []);

  const Cb: CB = useCallback(
    (item, _, index, setChildDisplay, childDisplay) => {
      return (
        <div
          className={`${styles.listItem} f-between pointer ${
            target === index ? styles.target : ""
          } ${target !== index ? styles.hover : ""} bold`}
          onClick={() => onCLick(index, setChildDisplay)}>
          {item.tag} {childDisplay ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
      );
    },
    [onCLick, target]
  );
  const childCB = useCallback<CB>(
    (item, _, index) => (
      <div
        className={`${styles.childLink} ${styles.listItem} ${styles.hover} pointer`}>
        <Link
          to={item.url as any}
          className={`${styles.box} ${
            pathname === "/settings/create-new-calendar"
              ? styles.nestedTarget
              : ""
          } `}>
          {item.tag}
        </Link>
      </div>
    ),
    [pathname]
  );

  const childrenOfAddCalendar = useMemo<IItem[]>(
    () => [
      {
        tag: "ساخت تقویم جدید",
        cb: childCB,
        url: "/settings/create-new-calendar",
      },
    ],
    [childCB]
  );

  const settings = useMemo<IItem[]>(
    () => [
      { tag: "اضافه کردن تقویم", cb: Cb, children: childrenOfAddCalendar },
      { tag: "عمومی", cb: Cb },
    ],
    [Cb, childrenOfAddCalendar]
  );

  return (
    <div className={styles.SettingSidebar} data-testid="SettingSidebar">
      <ULLinks listOfItems={settings} childClassName={styles.ulChild} />
    </div>
  );
};

export default SettingSidebar;
