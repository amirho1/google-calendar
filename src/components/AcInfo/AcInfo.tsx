import React, { FC, useCallback, useContext } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FadeContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import useKeyDown from "../../hooks/useKeyDown";
import { ReduxStateI } from "../../redux";
import { UserI } from "../../redux/reducers/user/user";
import Button from "../Button/Button";
import DefaultImg from "../DefaultImg/DefaultImg";
import styles from "./AcInfo.module.scss";

interface AcInfoProps {
  onIconClick: () => void;
  closeOrOpenAcInfoModal: () => void;
}

const AcInfo: FC<AcInfoProps> = ({ onIconClick, closeOrOpenAcInfoModal }) => {
  const { name, lastName, email } = useSelector<ReduxStateI, UserI>(
    state => state.user.user
  );
  const { fetch } = useFetch({
    method: "post",
    url: "/logout",
    firstFetch: false,
  });
  const image = useSelector<ReduxStateI, string | undefined>(
    state => state.user.profileImage
  );
  const navigate = useNavigate();

  const logout = useCallback(
    () =>
      fetch()
        .catch(() => {
          navigate("/login");
        })
        .catch(console.error),
    [fetch, navigate]
  );

  const { openFade } = useContext(FadeContext);

  useKeyDown(e => {
    if (e.key === "Escape") closeOrOpenAcInfoModal();
  });

  return (
    <div className={styles.AcInfo} data-testid="AcInfo">
      <div className={`${styles.info} f-center `}>
        <div className={`${styles.imgWrapper} f-center`}>
          {!image ? (
            <DefaultImg name={name} />
          ) : (
            <img className={styles.img} src={image} alt="" />
          )}
          <button
            className={`${styles.iconWrapper} f-center simple-btn`}
            onClick={() => {
              onIconClick();
              openFade();
            }}>
            <AiOutlineCamera className={styles.icon} />
          </button>
        </div>

        <div>{`${name} ${lastName}`}</div>
        <div className={styles.email}>{email}</div>
      </div>

      <div className={styles.exitBtnWrapper}>
        <Button className={`${styles.button} hoverBGGray`} onClick={logout}>
          خروج از سیستم
        </Button>
      </div>
    </div>
  );
};

export default AcInfo;
