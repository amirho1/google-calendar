import { call, Effect, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  saveUser,
  SAVE_PROFILE_IMAGE,
  SAVE_UPLOADED_IMAGE,
  UserI,
} from "../reducers/user/user";
import { notificationCaller } from "./events";
import { Buffer } from "buffer";

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
  const response = await Api({ method: "GET", url: `/images/${imageName}` });
  const base64 = Buffer.from(response.data, "binary").toString("base64");
  console.log(response.data);
  return `data:image/jpeg/png/jpg/svg;base64, ${base64}`;
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
