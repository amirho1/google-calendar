import React, { FC } from "react";
import styles from "./MonthChanger.module.scss";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import HoverCircle from "../HoverCircle/HoverCircle";

export type onCLickT<TagType = HTMLElement> = (
  event: React.MouseEvent<TagType, MouseEvent>
) => void;

export interface MonthChangerPropsI {
  onClickPrevious: onCLickT<HTMLDivElement>;
  onCLickNext: onCLickT<HTMLDivElement>;
  className?: string;
  dataTipNext?: string;
  datTipPrevious?: string;
}

const MonthChanger: FC<MonthChangerPropsI> = ({
  onCLickNext,
  onClickPrevious,
  className,
  datTipPrevious,
  dataTipNext,
}) => {
  return (
    <div
      className={`${styles.MonthChanger} ${className} f-center`}
      data-testid="MonthChanger">
      <HoverCircle width="30px" height="30px" dataTip={datTipPrevious}>
        <div onClick={onClickPrevious} data-testid="next">
          <AiOutlineRight id="btn-next" className="hover-circle" />
        </div>
      </HoverCircle>

      <HoverCircle width="30px" height="30px" dataTip={dataTipNext}>
        <div onClick={onCLickNext} data-testid={"previous"}>
          <AiOutlineLeft id="btn-previous" />
        </div>
      </HoverCircle>
    </div>
  );
};

export default MonthChanger;
