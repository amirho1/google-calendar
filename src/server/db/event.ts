import { model, Schema } from "mongoose";
import Joi from "joi";

export const eventSchema = new Schema({
  title: { type: String, default: "" },
  endTime: { type: Number },
  startTime: { type: Number },
  color: { type: String, required: true },
  calId: { type: String, required: true },
  timeStamp: { type: Number, required: true },
  timeStampEnd: { type: Number, default: undefined },
  description: { type: String, default: "" },
});

export const Event = model("Event", eventSchema);

export const eventValidate = Joi.object({
  title: Joi.string().empty().allow(""),
  endTime: Joi.number(),
  startTime: Joi.number(),
  color: Joi.string().required(),
  calId: Joi.string().required(),
  description: Joi.string(),
  timeStamp: Joi.number().required(),
  timeStampEnd: Joi.number(),
});
