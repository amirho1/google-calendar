import { Router } from "express";
import User, { joiValidate } from "../db/user";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = joiValidate.validate(req.body);
    if (!req.body) return res.status(400).send("bad Request.");
    else if (error) return res.status(400).send("bad Request");

    req.body.password = await bcrypt.hash(req.body.password, 12);

    await User.create(req.body);
    res.send("/");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/isEmailUnique/:email", async ({ params: { email } }, res) => {
  try {
    if (!email) return res.status(400).send("Bad request.");
    const user = await User.findOne({ email });
    if (user) res.send(false);
    else res.send(true);
  } catch (err: any) {
    res.status(500).send(err?.message);
  }
});

export default router;
