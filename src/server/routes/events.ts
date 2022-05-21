import { Router } from "express";
import { Event, eventValidate } from "../db/event";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = Router();

router.get(
  "/:calId/:date",
  isLoggedIn,
  async ({ params: { calId, date } }, res) => {
    try {
      if (!calId || !date) return res.status(400).send("Bad request.");
      const events = await Event.find({ timeStamp: date, calId });
      res.send(events);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }
);

router.post("/", isLoggedIn, async ({ body }, res) => {
  try {
    const { error } = eventValidate.validate(body);
    if (error) return res.status(400).send(`Bad request ${error.message}.`);

    const event = await Event.create(body);

    res.send(event);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", isLoggedIn, async ({ params: { id } }, res) => {
  try {
    if (!id) return res.status(400).send("Bad Request");

    await Event.deleteOne({ _id: id });

    res.end();
  } catch (err: any) {
    res.status(500).send(err);
  }
});

router.put("/:id", isLoggedIn, async ({ params: { id }, body }, res) => {
  if (!id || !body) return res.status(400).send("Bad Request");

  await Event.findOneAndUpdate({ _id: id }, body);
  res.send(body);
});

export default router;
