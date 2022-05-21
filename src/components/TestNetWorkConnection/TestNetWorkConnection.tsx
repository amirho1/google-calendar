import React, { FC, useCallback, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";
import { RiCloudOffLine } from "react-icons/ri";
import styles from "./TestNetWorkConnection.module.scss";

interface TestNetWorkConnectionProps {}

const TestNetWorkConnection: FC<TestNetWorkConnectionProps> = () => {
  const [online, setOnline] = useState(window.navigator.onLine);
  const [initialMessage, setInitialMessage] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const intId = setInterval(() => {
      if (!window.navigator.onLine && online) {
        setOnline(false);
        setInitialMessage(true);

        setTimeout(() => {
          setInitialMessage(false);
          setOffline(true);
        }, 3000);
      } else if (window.navigator.onLine) {
        setOffline(false);
        setOnline(window.navigator.onLine);
      }
    }, 5000);

    return () => {
      clearInterval(intId);
    };
  }, [online]);

  const closeInitialMessage = useCallback(() => {
    setInitialMessage(false);
  }, []);

  const closeOffLine = useCallback(() => setOffline(false), []);

  return (
    <>
      <Modal
        display={initialMessage}
        height="fit-content"
        width="fit-content"
        position="fixed">
        <Notification
          message="به‌نظر می‌رسد آفلاین باشید. شاید برخی از کنش‌ها کار نکنند."
          closeNotification={closeInitialMessage}
        />
      </Modal>

      <Modal
        height="fit-content"
        width="fit-content"
        display={offline}
        position="fixed"
        right="0"
        bottom="0">
        <Notification
          message={
            <div className={`f-between ${styles.offlineMessage}`}>
              <RiCloudOffLine />
              <span>آفلاین</span>
            </div>
          }
          closeNotification={closeOffLine}
        />
      </Modal>
    </>
  );
};

export default TestNetWorkConnection;
