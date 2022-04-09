import React, { FC } from "react";
import styles from "./MonthChanger.module.scss";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import HoverCircle from "../HoverCircle/HoverCircle";

export type onCLickT<TagType = HTMLElement> = (
  event: React.MouseEvent<TagType, MouseEvent>
) => void;

interface MonthChangerPropsI {
  onClickPrevious: onCLickT<HTMLDivElement>;
  onCLickNext: onCLickT<HTMLDivElement>;
  className?: string;
}

const MonthChanger: FC<MonthChangerPropsI> = ({
  onCLickNext,
  onClickPrevious,
  className,
}) => {
  return (
    <div
      className={`${styles.MonthChanger} ${className} f-center`}
      data-testid="MonthChanger">
      <HoverCircle style={{ width: "30px", height: "30px" }}>
        <div onClick={onCLickNext} data-tip="ماه بعد">
          <AiOutlineRight id="btn-next" className="hover-circle" />
        </div>
      </HoverCircle>

      <HoverCircle style={{ width: "30px", height: "30px" }} data-tip="ماه قبل">
        <div onClick={onClickPrevious}>
          <AiOutlineLeft id="btn-previous" />
        </div>
      </HoverCircle>
    </div>
  );
};

export default MonthChanger;
