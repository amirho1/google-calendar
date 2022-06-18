import moment from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { EventI } from "../../redux/reducers/events/events";
import { convertMinutesToHours } from "../../utils/helpers";
import DateInput from "../DateInput/DateInput";
import Row from "../EventForm/Row/Row";
import HoverCircle from "../HoverCircle/HoverCircle";
import Input from "../Input/Input";
import TimeInput from "../TimeInput/TimeInput";
import styles from "./UpdateOrCreate.module.scss";

interface UpdateOrCreateProps {
  timeStamp: number;
}

const defaultEvent: EventI = {
  title: "",
  color: "#333",
  calId: "",
  endTime: 0,
  startTime: 0,
  description: "",
  timeStamp: Date.now(),
};

interface TitleChildrenI {
  event: EventI | undefined;
  onTitleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  timeStamp: number;
}

const UpdateOrCreate: FC<UpdateOrCreateProps> = ({ timeStamp }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventI>(defaultEvent);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const TitleIcon = useCallback(
    () => (
      <HoverCircle
        onClick={goBack}
        className={`pointer ${styles.close}`}
        width="50px"
        height="50px">
        <div>
          <FaTimes className={styles.faTimes} />
        </div>
      </HoverCircle>
    ),
    [goBack]
  );

  const { data, fetch } = useFetch({
    url: `/events/${eventId}`,
    firstFetch: false,
  });

  useEffect(() => {
    if (data) setEvent(data?.data);
  }, [data]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const eventCb = useCallback(() => {}, []);

  const eventEndT = useMemo(
    () =>
      event
        ? moment()
            .startOf("day")
            .add(event?.startTime + event?.endTime, "minutes")
            .format("hh:mm A")
        : "",
    [event]
  );

  const eventStartT = useMemo(
    () => (event ? convertMinutesToHours(event?.startTime) : ""),
    [event]
  );

  const onEndTimeChange = useCallback(
    (endTime: number) => {
      setEvent(current => ({ ...current, endTime: endTime - event.startTime }));
    },
    [event.startTime]
  );

  const onStartTimeChange = useCallback((startTime: number) => {
    setEvent(current => ({ ...current, startTime }));
  }, []);

  const onTimeStampChange = useCallback(() => {}, []);

  const onTitleChange = useCallback((title: string) => {
    setEvent(current => ({ ...current, title: title }));
  }, []);

  const onStartDateChange = useCallback((timeStamp: number) => {
    setEvent(current => ({ ...current, timeStamp }));
  }, []);

  return (
    <form className={styles.UpdateOrCreate} data-testid="UpdateOrCreate">
      <div className={styles.details}>
        <Row
          icon={<TitleIcon />}
          children={
            <>
              <Input
                value={event.title}
                tag="عنوان"
                inpWrapperClassName={styles.inpWrapper}
                labelClassName={styles.inpLabel}
                fixedBorder={true}
                inputClassName={styles.input}
                onChange={e => onTitleChange(e.currentTarget.value)}
                key="1"
              />
              <div className={`${styles.dates} owl-mright`}>
                <DateInput
                  timeStamp={event.timeStamp}
                  label="تاریخ شروع"
                  onChange={onStartDateChange}
                />
                <TimeInput
                  time={event.startTime}
                  type="start"
                  label="زمان شروع"
                  onChange={onStartTimeChange}
                />
                <span>تا</span>
                <TimeInput
                  time={event.endTime}
                  type="end"
                  label="زمان پایان"
                  startTime={event.startTime}
                  onChange={onEndTimeChange}
                />
              </div>
            </>
          }
        />
      </div>
      <div className={styles.actions}></div>
    </form>
  );
};

export default React.memo(UpdateOrCreate);
