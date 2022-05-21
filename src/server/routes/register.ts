import { Router } from "express";
import User from "../db/user";

const router = Router();

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("bad Request.");
  else if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("bad Request");

  const user = await User.create(req.body);
  res.send("/");
});

export default router;
