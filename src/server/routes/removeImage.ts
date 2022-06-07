import { Router } from "express";
import { unlinkSync } from "fs";
import { join } from "path";
import User from "../db/user";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = Router();

router.put("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findOneAndUpdate({ _id: userId }, { image: "" });

    unlinkSync(join(__dirname, "..", "uploads", user.image));
    res.end();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
