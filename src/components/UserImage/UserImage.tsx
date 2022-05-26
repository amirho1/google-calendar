import React, { FC } from 'react';
import styles from './UserImage.module.scss';

interface UserImageProps {}

const UserImage: FC<UserImageProps> = () => (
  <div className={styles.UserImage} data-testid="UserImage">
    UserImage Component
  </div>
);

export default UserImage;
