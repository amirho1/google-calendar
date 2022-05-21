import { Router } from "express";
import User from "../db/user";

const router = Router();

router.post("/", async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password)
    return res.status(400).send("bad request.");

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send(`email or password is wrong`);

  if (user.password !== req.body.password)
    return res.status(400).send(`email or password is wrong`);

  req.session.userId = user._id;
  req.session.save(err => {
    if (err) return res.status(500).send(err);
    res.send("/");
  });
});

export default router;
