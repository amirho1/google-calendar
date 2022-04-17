import moment from "moment-jalaali";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  convertEnglishWeekdaysToPersian,
  convertHoursToMinutes,
} from "../../utils/helpers";
import HoverCircle from "../HoverCircle/HoverCircle";
import Line from "../Line/Line";
import Modal from "../Modal/Modal";
import Task from "../Task/Task";
import TimeLine from "../TimeLine/TimeLine";
import styles from "./Day.module.scss";

interface DayProps {}

function drawManyLine(num: number) {
  const lines: JSX.Element[] = [];

  for (let i = 0; i < num; i++) {
    const line = (
      <Line
        key={i}
        color="var(--gray)"
        width="100%"
        height="1px"
        hour={i ? i : undefined}
      />
    );
    lines.push(line);
  }

  return lines;
}

const Day: FC<DayProps> = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [headerBottomBorderDisplay, setHeaderBottomBorderDisplay] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

  const [weekday, date] = useSelector<ReduxStateI, [string, number]>(state => [
    convertEnglishWeekdaysToPersian(state.date.weekday.toLowerCase() as any),
    state.date.day,
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setMinutes(convertHoursToMinutes(moment()));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      e.stopPropagation();
      setIsMouseDown(true);
      const { y } = e.currentTarget.getBoundingClientRect();
      const modal = (
        <Modal
          key={tasks.length}
          children={<Task />}
          boxShadow={false}
          data-testid="Task"
          x={0}
          y={e.clientY - y}
          resizeAble={true}
          width={`${100}%`}
          display={true}
          height="60px"
        />
      );
      setTasks(current => [...current, modal]);
    },
    [tasks.length]
  );

  const onMouseUp = useCallback<React.MouseEventHandler<HTMLDivElement>>(e => {
    setIsMouseDown(true);
  }, []);

  return (
    <div className={styles.Day} data-testid="Day">
      <div
        className={styles.Header}
        style={{
          borderBottom: headerBottomBorderDisplay
            ? "2px solid var(--gray)"
            : undefined,
        }}>
        <div className={styles.Info} data-testid="Info">
          <span className={styles.Weekday}>{weekday}</span>
          <HoverCircle
            hover={false}
            background={true}
            backgroundColor={"var(--blue)"}
            width="50px"
            height="50px"
            className="pointer">
            <div className={styles.date}>{date}</div>
          </HoverCircle>
        </div>
      </div>

      <main
        className={styles.main}
        onScroll={e => {
          setHeaderBottomBorderDisplay(e.currentTarget.scrollTop);
        }}>
        <div className={styles.space}></div>
        <div
          className={styles.CalendarWrapper}
          data-testid="calendarWrapper"
          // onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}>
          <TimeLine y={minutes} color="red" />
          {tasks}
          <Line
            vertical={true}
            height="100%"
            width="1"
            right="20px"
            top="-2%"
          />
          {drawManyLine(24)}
        </div>
      </main>
    </div>
  );
};

export default Day;
