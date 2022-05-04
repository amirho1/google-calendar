import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { CalendarI } from "../../redux/sagas/calendars";
import styles from "./CalList.module.scss";

interface CalListProps {
  onCalChange: (calName: number) => void;
}

const CalList: FC<CalListProps> = ({ onCalChange }) => {
  const calendars = useSelector<ReduxStateI, CalendarI[]>(
    state => state.calendars.calendars
  );

  return (
    <div className={styles.CalList} data-testid="CalList">
      {calendars.map((cal, index) => (
        <div
          key={index}
          onClick={() => onCalChange(cal.id as any)}
          className={`${styles.btn} hoverBGGray`}>
          {cal.name}
        </div>
      ))}
    </div>
  );
};

export default CalList;
