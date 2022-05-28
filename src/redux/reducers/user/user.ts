import produce from "immer";
import { InitialValueI } from "../..";

export interface UserStateI extends InitialValueI {
  user: UserI;
  profileImage?: string;
}

export interface UserI {
  name: string;
  lastName: string;
  email: string;
  image?: string;
}

export function saveUser(payload: UserI) {
  return {
    type: saveUser.type,
    payload,
  };
}

saveUser.type = "SAVE_USER";

const defaultValue: UserStateI = {
  status: "idle",
  user: {
    name: "",
    lastName: "",
    email: "",
    image: undefined,
  },
};

export const SAVE_UPLOADED_IMAGE = (imageName: string) => ({
  type: SAVE_UPLOADED_IMAGE.type,
  payload: imageName,
});

SAVE_UPLOADED_IMAGE.type = "SAVE_UPLOADED_IMAGE";

export const SAVE_PROFILE_IMAGE = (image: string) => ({
  type: SAVE_PROFILE_IMAGE.type,
  payload: image,
});
SAVE_PROFILE_IMAGE.type = "SAVE_PROFILE_IMAGE";

const userReducer = produce(
  (draft: UserStateI, action: { type: string; payload: UserI | string }) => {
    switch (action.type) {
      case saveUser.type:
        if (typeof action.payload !== "string") draft.user = action.payload;
        break;
      case SAVE_UPLOADED_IMAGE.type: {
        if (typeof action.payload === "string")
          draft.user.image = action.payload;
        break;
      }
      case SAVE_PROFILE_IMAGE.type:
        if (typeof action.payload === "string")
          draft.profileImage = action.payload;
        break;
      default:
        return draft;
    }
  },
  defaultValue
);

export default userReducer;
