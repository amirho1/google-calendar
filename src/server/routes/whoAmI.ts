import { Router } from "express";
import User from "../db/user";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userId });

    const response = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };

    res.send(response);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
