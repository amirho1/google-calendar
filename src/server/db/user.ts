import Joi from "joi";
import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  calendars: { type: [String], default: [] },
});

const User = model("User", userSchema);

export const joiValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  calendars: Joi.array().items(Joi.string()),
});

export default User;
