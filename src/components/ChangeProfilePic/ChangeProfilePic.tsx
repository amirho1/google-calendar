import React, { FC, useCallback, useContext, useRef, useState } from "react";
import styles from "./ChangeProfilePic.module.scss";
import { FaTimes, FaTrash } from "react-icons/fa";
import HoverCircle from "../HoverCircle/HoverCircle";
import { FadeContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { UserStateI } from "../../redux/reducers/user/user";
import DefaultImg from "../DefaultImg/DefaultImg";
import Button from "../Button/Button";
import { BsPencil } from "react-icons/bs";
import { MdCameraEnhance } from "react-icons/md";
import useKeyDown from "../../hooks/useKeyDown";
import { uploadImage } from "../../redux/sagas/user";

interface ChangeProfilePicProps {
  close: () => void;
}

const ChangeProfilePic: FC<ChangeProfilePicProps> = ({ close }) => {
  const [newPic, setNewPick] = useState<undefined | File>();
  const dispatch = useDispatch();
  const { closeFade } = useContext(FadeContext);
  const {
    user: { name, lastName },
    profileImage: image,
  } = useSelector<ReduxStateI, UserStateI>(state => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openUploadFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const closeModal = useCallback(() => {
    close();
    closeFade();
  }, [close, closeFade]);

  const onEscKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useKeyDown(onEscKeyDown);

  const onPickingNewPicture = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(e => {
    if (e.currentTarget.files?.length) {
      setNewPick(e.currentTarget.files[0]);
    }
  }, []);

  const handleUploadImage = useCallback(() => {
    if (newPic) {
      dispatch(uploadImage.ac(newPic));
      close();
      closeFade();
    }
  }, [close, closeFade, dispatch, newPic]);

  return (
    <div
      className={`${styles.ChangeProfilePic} owl-mtop`}
      data-testid="ChangeProfilePic">
      <HoverCircle
        className={`${styles.close} simple-btn`}
        width="25px"
        height="25px">
        <div onClick={closeModal}>
          <FaTimes />
        </div>
      </HoverCircle>
      <h2 className={styles.title}>عکس حساب کاربری</h2>
      <hr className={styles.hr} />
      <input
        type="file"
        onChange={onPickingNewPicture}
        name="img"
        id="img"
        className="d-none"
        ref={fileInputRef}
        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image"
      />

      {newPic || image ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={newPic ? URL.createObjectURL(newPic) : image ? image : undefined}
          alt={`profile image of ${name} ${lastName}`}
          onClick={openUploadFile}
          className={styles.img}
        />
      ) : (
        <div className={styles.imageWrapper} onClick={openUploadFile}>
          <DefaultImg name={name} className={styles.defaultImg} />
        </div>
      )}

      <div className={`${styles.btnWrapper} f-between`}>
        {image && !newPic ? (
          <>
            <Button className={styles.btn}>
              <span>
                حذف <FaTrash />
              </span>
            </Button>
            <Button className={styles.btn} onClick={openUploadFile}>
              <span>
                تغییر <BsPencil />
              </span>
            </Button>
          </>
        ) : newPic ? (
          <Button
            className={`${styles.btn} ${styles.full}`}
            onClick={handleUploadImage}>
            ذخیره
          </Button>
        ) : (
          <Button
            className={`${styles.btn} ${styles.full}`}
            onClick={openUploadFile}>
            <>
              <span>اضافه کردن عکس حساب کاربری</span>
              <MdCameraEnhance />
            </>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChangeProfilePic;
