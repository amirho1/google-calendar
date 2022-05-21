import { model, Schema } from "mongoose";
import Joi from "joi";

export const eventSchema = new Schema({
  title: { type: String, default: "" },
  endTime: { type: Number, required: true },
  startTime: { type: Number, required: true },
  color: { type: String, required: true },
  calId: { type: String, required: true },
  timeStamp: { type: Number, required: true },
  description: { type: String, default: "" },
});

export const Event = model("Event", eventSchema);

export const eventValidate = Joi.object({
  title: Joi.string().empty(),
  endTime: Joi.number().required(),
  startTime: Joi.number().required(),
  color: Joi.string().required(),
  calId: Joi.string().required(),
  description: Joi.string(),
  timeStamp: Joi.number().required(),
});
