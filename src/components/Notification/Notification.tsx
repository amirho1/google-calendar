import React, { FC } from "react";
import styles from "./Notification.module.scss";
import { FaTimes } from "react-icons/fa";
import { PrimitivesT } from "../Table/Table";
import HoverCircle from "../HoverCircle/HoverCircle";

interface NotificationProps {
  message: PrimitivesT | JSX.Element;
  closeNotification: () => void;
}

const Notification: FC<NotificationProps> = ({
  message,
  closeNotification,
}) => {
  return (
    <div
      className={`${styles.Notification} f-between colWhite`}
      data-testid="Notification">
      {message}

      <HoverCircle className={`pointer ${styles.close}`}>
        <div onClick={closeNotification}>
          <FaTimes />
        </div>
      </HoverCircle>
    </div>
  );
};

export default Notification;
