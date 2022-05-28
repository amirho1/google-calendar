import { Router } from "express";
import { unlinkSync } from "fs";
import { join } from "path";
import User from "../db/user";
import isLoggedIn from "../middlewares/isLoggedIn";
import { upload } from "../middlewares/multer";

const router = Router();

router.put(
  "/",
  isLoggedIn,
  upload.single("image"),
  async ({ file, session }, res) => {
    try {
      console.log(file);
      if (!file)
        return res.status(400).send("bad request there isn't any image.");

      const user = await User.findOneAndUpdate(
        { _id: session.userId },
        { image: file?.filename }
      );

      unlinkSync(join(__dirname, "..", "uploads", file.filename));
      (user as any).image = file?.filename;

      console.log("hello world");
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

export default router;
