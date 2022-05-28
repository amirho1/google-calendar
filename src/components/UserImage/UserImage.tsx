import React, { FC, useCallback, useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { UserStateI } from "../../redux/reducers/user/user";
import { getImage, getUser } from "../../redux/sagas/user";
import { stopPropagation } from "../../utils/helpers";
import AcInfo from "../AcInfo/AcInfo";
import ChangeProfilePic from "../ChangeProfilePic/ChangeProfilePic";
import DefaultImg from "../DefaultImg/DefaultImg";
import Modal from "../Modal/Modal";
import styles from "./UserImage.module.scss";

interface UserImageProps {}

const UserImage: FC<UserImageProps> = () => {
  const { user, profileImage: image } = useSelector<ReduxStateI, UserStateI>(
    state => state.user
  );
  const [acInfoDisplay, setAcInfoDisplay] = useState(false);
  const [changePicDisplay, setChangePicDisplay] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.name) dispatch(getUser.ac());
  }, [dispatch, user?.name]);

  const closeOrOpenAcInfoModal = useCallback(() => {
    setAcInfoDisplay(current => !current);
  }, []);

  const closeAcInfo = useCallback(() => {
    setAcInfoDisplay(false);
  }, []);
  const closeChangePic = useCallback(() => {
    setChangePicDisplay(false);
  }, []);

  const closeModals = useCallback(() => {
    closeAcInfo();
    closeChangePic();
  }, [closeAcInfo, closeChangePic]);

  useEffect(() => {
    document.addEventListener("mousedown", closeModals);

    return () => {
      document.removeEventListener("mousedown", closeModals);
    };
  }, [closeModals]);

  const changeChangePicDisplay = useCallback(() => {
    setChangePicDisplay(current => !current);
  }, []);

  useEffect(() => {
    user.image && dispatch(getImage.ac(user.image));
  }, [dispatch, user.image]);

  console.log(image);
  return (
    <div
      className={styles.UserImage}
      data-testid="UserImage"
      onClick={closeOrOpenAcInfoModal}
      tabIndex={1}
      onMouseDown={stopPropagation}>
      {image ? (
        <img src={image} alt="profile" className={styles.image} />
      ) : (
        <DefaultImg name={user?.name} />
      )}

      <Modal
        width="fit-content"
        height="fit-content"
        display={acInfoDisplay}
        boxShadow={true}
        x={0}
        y={100}>
        <AcInfo onIconClick={changeChangePicDisplay} />
      </Modal>

      <Modal
        display={changePicDisplay}
        width="350px"
        height="500px"
        x={0}
        y={0}
        right="0"
        bottom="0"
        className={styles.changeDisplayModal}
        zIndex={200}
        borderRadios="10px"
        position="fixed">
        <ChangeProfilePic close={closeChangePic} />
      </Modal>
    </div>
  );
};

export default UserImage;
