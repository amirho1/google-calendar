import Joi from "joi";
import { model, Schema } from "mongoose";

export const CalendarSchema = new Schema({
  name: { type: String, require: true },
  color: { type: String, default: "#0080ff" },
  selected: { type: Boolean, default: true },
  description: String,
});

export const Calendar = model("Calendar", CalendarSchema);

export const joiValidation = Joi.object({
  name: Joi.string().required(),
  color: Joi.string(),
  selected: Joi.boolean(),
  description: Joi.string().allow(""),
});
