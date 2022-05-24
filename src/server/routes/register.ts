import { Router } from "express";
import User from "../db/user";

const router = Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("bad Request.");
    else if (!req.body.name || !req.body.email || !req.body.password)
      return res.status(400).send("bad Request");

    await User.create(req.body);
    res.send("/");
  } catch (err: any) {
    res.status(500).end();
  }
});

router.get("/isEmailUnique/:email", async ({ params: { email } }, res) => {
  try {
    if (!email) return res.status(400).send("Bad request.");

    const user = await User.findOne({ email });
    if (user) res.send(false);
    else res.send(true);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
