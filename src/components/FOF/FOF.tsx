import React, { FC } from "react";
import styles from "./FOF.module.scss";
import robotImg from "./robot.png";

interface FOFProps {}

// 404

const FOF: FC<FOFProps> = () => {
  return (
    <div className={`${styles.FOF} f-center`} data-testid="FOF">
      <div className={`${styles.errorBox} f-between`}>
        <img
          src={robotImg}
          alt="four o four png"
          width="150px"
          height="200px"
        />
        <div className={styles.text}>
          <a href="http://google.com" target="_blank" rel="noreferrer">
            <h1 className={styles.logo}>
              <span className={styles.blue}>G</span>
              <span className={styles.red}>o</span>
              <span className={styles.yellow}>o</span>
              <span className={styles.blue}>g</span>
              <span className={styles.green}>l</span>
              <span className={styles.red}>e</span>
            </h1>
          </a>
          <p>این یک خطای ۴۰۴ است نشانی اینترنت درخواست شده در این سرور نیست</p>
        </div>
      </div>
    </div>
  );
};

export default FOF;
