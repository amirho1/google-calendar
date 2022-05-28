import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = Router();

router.post("/", isLoggedIn, (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) return res.status(500).send(err);
      res.end();
    });
  } catch (err: any) {
    res.status(500).send(err);
  }
});

export default router;
