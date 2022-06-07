import { call, Effect, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  DELETE_IMAGE,
  saveUser,
  SAVE_PROFILE_IMAGE,
  SAVE_UPLOADED_IMAGE,
  UserI,
} from "../reducers/user/user";
import { notificationCaller } from "./events";
import { binaryToDataURL } from "../../utils/helpers";

async function asyncGetUser() {
  const response = await Api({ method: "GET", url: "/whoAmI" });

  return response?.data as UserI;
}

export function* getUser(effect: Effect<string, UserI>) {
  try {
    const user: UserI = yield call(asyncGetUser);

    yield put(saveUser(user));
  } catch (err: any) {
    notificationCaller(err.message);
  }
}

getUser.type = "GET_USER";

getUser.ac = () => {
  return { type: getUser.type };
};

export function* watchGettingUser() {
  yield takeLatest(getUser.type, getUser);
}

async function asyncUploadImage(image: File) {
  const form = new FormData();

  form.append("image", image);
  const response = await Api({
    method: "PUT",
    url: "/uploadImage",
    data: form,
  });

  return response.data;
}

export function* uploadImage(effect: Effect<string, File>) {
  try {
    const imageName: string = yield call(asyncUploadImage, effect.payload);
    yield put(SAVE_UPLOADED_IMAGE(imageName));
    notificationCaller("عکس با موقیت ذخیره شد.");
  } catch (err: any) {
    notificationCaller(err.message);
  }
}

uploadImage.type = "UPLOAD_IMAGE";

uploadImage.ac = (file: File) => ({
  type: uploadImage.type,
  payload: file,
});

export function* watchUploadingImage() {
  yield takeEvery(uploadImage.type, uploadImage);
}

async function asyncGetImage(imageName: string) {
  try {
    const response = await Api({
      method: "GET",
      url: `/images/${imageName}`,
      responseType: "arraybuffer",
    });
    const dataURL = await binaryToDataURL(response.data);

    return dataURL;
  } catch (err) {
    console.error(err);
  }
}

export function* getImage(effect: Effect<string, string>) {
  try {
    const response: string = yield call(asyncGetImage, effect.payload);
    yield put(SAVE_PROFILE_IMAGE(response));
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

getImage.type = "GET_IMAGE";
getImage.ac = (imageName: string) => ({
  type: getImage.type,
  payload: imageName,
});

export function* watchGettingImage() {
  yield takeLatest(getImage.type, getImage);
}

async function asyncDeleteImage() {
  await Api({ method: "put", url: "/removeImage" });
}

export function* deleteImage(effect: Effect<string>) {
  try {
    yield call(asyncDeleteImage);
    yield put(DELETE_IMAGE());
    yield notificationCaller("عکس موفقیت آمیزی حذف شد");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

deleteImage.type = "deleteImage";
deleteImage.ac = () => ({
  type: deleteImage.type,
});

export default function* watchDeletingImage() {
  yield takeLatest(deleteImage.type, deleteImage);
}
