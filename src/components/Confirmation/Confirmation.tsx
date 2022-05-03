import React, { FC } from "react";
import Button from "../Button/Button";
import styles from "./Confirmation.module.scss";

interface ConfirmationProps {
  text: string;
  onDecline: () => void;
  onConfirm: () => void;
}

const Confirmation: FC<ConfirmationProps> = ({
  text,
  onDecline,
  onConfirm,
}) => (
  <div className={styles.Confirmation} data-testid="Confirmation">
    <p>{text}</p>
    <div className={styles.btnWrapper}>
      <Button onClick={onDecline} className={`hoverBGGray ${styles.btn}`}>
        لغو
      </Button>
      <Button onClick={onConfirm} className={`link ${styles.btn} `}>
        برداشتن تقویم
      </Button>
    </div>
  </div>
);

export default Confirmation;
