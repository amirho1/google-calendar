import express from "express";
import { Calendar, joiValidation as calValidation } from "../db/calendarDB";
import { Event } from "../db/event";
import User from "../db/user";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.session.userId;
  const calendarsId = (await User.findOne({ _id: userId })).calendars;

  const calendars = (await Calendar.find({ _id: { $in: calendarsId } })) || [];

  res.send(calendars);
});

router.post("/", isLoggedIn, async ({ body, session: { userId } }, res) => {
  const { error } = calValidation.validate(body);

  if (!body || error) return res.status(400).send("bad request");

  const calendar = await Calendar.create(body);

  const user = await User.findOne({ _id: userId });

  await User.updateOne(
    { _id: user._id },
    { calendars: [...user.calendars, calendar._id] }
  );

  res.send(calendar);
});

router.put("/:id", isLoggedIn, async ({ params: { id }, body }, res) => {
  if (!id) return res.status(400).send("bad request");

  const update = await Calendar.findOneAndUpdate({ _id: id }, body);
  if (!update) return res.status(404).send("not found");
  res.send(update);
});

router.delete("/:id", isLoggedIn, ({ params: { id } }, res) => {
  if (!id) return res.status(400).send("bad request");
  Calendar.deleteOne({ _id: id })
    .then(() => {
      Event.deleteMany({ calId: id })
        .then(() => {
          res.end();
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
