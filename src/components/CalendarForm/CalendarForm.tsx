import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addCalendar } from "../../redux/sagas/calendars";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./CalendarForm.module.scss";

interface CalendarFormProps {}

const CalendarForm: FC<CalendarFormProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const onNameChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      setName(e.currentTarget.value);
    },
    []
  );

  const onDescriptionChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(e => {
    setDescription(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      dispatch(
        addCalendar.ac({ color: "#e8541a", name, description, selected: true })
      );

      setDescription("");
      setName("");
    },
    [description, dispatch, name]
  );

  return (
    <div
      className={`${styles.CalendarForm} f-center`}
      data-testid="CalendarForm">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input tag="اسم" value={name} onChange={onNameChange} />
        <Input
          tag="توضیحات"
          value={description}
          type="textarea"
          onChange={onDescriptionChange}
        />
        <Button children="ساخت تقویم" className="bgBlue colWhite" />
      </form>
    </div>
  );
};

export default CalendarForm;
