import { Router } from "express";
import User from "../db/user";
import { upload } from "../middlewares/multer";

const router = Router();

router.put(
  "/:userId",
  upload.single("image"),
  ({ params: { userId }, file }, res) => {
    try {
      if (!userId)
        return res.status(400).send("bad Request user id is require.");
      if (!file)
        return res.status(400).send("bad request there isn't any image.");

      const user = User.findOneAndUpdate(
        { _id: userId },
        { image: file?.originalname }
      );

      (user as any).image = file?.originalname;

      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

export default router;
